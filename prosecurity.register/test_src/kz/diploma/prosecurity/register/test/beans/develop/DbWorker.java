package kz.diploma.prosecurity.register.test.beans.develop;

import kz.diploma.prosecurity.register.beans.all.AllConfigFactory;
import kz.diploma.prosecurity.register.beans.all.FileStorageFactory;
import kz.diploma.prosecurity.register.configs.DbConfig;
import kz.diploma.prosecurity.register.configs.DbConnector;
import kz.diploma.prosecurity.register.configs.FileStorageConfig;
import kz.greetgo.conf.hot.ConfigStorage;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.diploma.prosecurity.register.test.util.DbUrlUtils;
import kz.diploma.prosecurity.register.util.App;
import kz.diploma.prosecurity.register.util.LiquibaseManager;
import kz.greetgo.util.ServerUtil;
import org.apache.log4j.Logger;
import org.postgresql.util.PSQLException;
import org.postgresql.util.ServerErrorMessage;

import java.io.File;
import java.io.PrintStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashSet;

import static kz.greetgo.conf.sys_params.SysParams.pgAdminPassword;
import static kz.greetgo.conf.sys_params.SysParams.pgAdminUrl;
import static kz.greetgo.conf.sys_params.SysParams.pgAdminUserid;
import static kz.diploma.prosecurity.register.test.util.DbUrlUtils.changeUrlDbName;

@Bean
public class DbWorker {
  final Logger logger = Logger.getLogger(getClass());

  public BeanGetter<DbConfig> postgresDbConfig;
  public BeanGetter<FileStorageConfig> fileStorageConfig;
  public BeanGetter<AllConfigFactory> allPostgresConfigFactory;
  public BeanGetter<LiquibaseManager> liquibaseManager;

  public void recreateAll() throws Exception {
    logger.info("Пересоздание MAIN DB");
    dropCreateMainDb();

    logger.info("Пересоздание File Storage DB");
    dropCreateFileStorageDb();

    liquibaseManager.get().apply();
    App.do_not_run_liquibase_on_deploy_war().createNewFile();
  }

  private final java.util.Set<String> alreadyRecreatedUsers = new HashSet<>();

  private void dropCreateMainDb() throws Exception {
    prepareDbConfig();
    recreateDb(postgresDbConfig.get().url(), postgresDbConfig.get().username(),postgresDbConfig.get().password() );
  }


  private void recreateDb(final String url, final String username, final String password) throws Exception {
    final String dbName = url.substring(url.lastIndexOf("/") + 1, url.length());

    try (Connection con = getPostgresAdminConnection()) {

      try (Statement stt = con.createStatement()) {
        logger.info("drop database " + dbName);
        stt.execute("drop database " + dbName);
      } catch (PSQLException e) {
        System.err.println(e.getServerErrorMessage());
      }

      if (!alreadyRecreatedUsers.contains(username)) {
        alreadyRecreatedUsers.add(username);

        try (Statement stt = con.createStatement()) {
          logger.info("drop user " + username);
          stt.execute("drop user " + username);
        } catch (SQLException e) {
          System.out.println(e.getMessage());
          //ignore
        }

        try (Statement stt = con.createStatement()) {
          logger.info("create user " + username + " encrypted password '" + password + "'");
          stt.execute("create user " + username + " encrypted password '" + password + "'");
        } catch (PSQLException e) {
          ServerErrorMessage sem = e.getServerErrorMessage();
          if ("CreateRole".equals(sem.getRoutine())) {
            throw new RuntimeException("Невозможно создать пользователя " + username + ". Возможно кто-то" +
              " приконектился к базе данных под этим пользователем и поэтому он не удаляется." +
              " Попробуйте разорвать коннект с БД или перезапустить БД. После повторите операцию снова", e);
          }

          throw e;
        }
      }

      try (Statement stt = con.createStatement()) {
        logger.info("create database " + dbName);
        stt.execute("create database " + dbName);
      }
      try (Statement stt = con.createStatement()) {
        logger.info("grant all on database " + dbName + " to " + username);
        stt.execute("grant all on database " + dbName + " to " + username);
      }
    }
  }


  public void cleanConfigsForTeamcity() {
    if (System.getProperty("user.name").startsWith("teamcity")) {
      ServerUtil.deleteRecursively(App.appDir());
    }
  }

  private void prepareDbConfig() throws Exception {
    File file = allPostgresConfigFactory.get().storageFileFor(DbConfig.class);

    if (!file.exists()) {
      file.getParentFile().mkdirs();
      writeDbConfigFile();
    } else if ("null".equals(postgresDbConfig.get().url())) {
      writeDbConfigFile();
      allPostgresConfigFactory.get().reset();
    }
  }

  private void writeDbConfigFile() throws Exception {
    File file = allPostgresConfigFactory.get().storageFileFor(DbConfig.class);
    try (PrintStream out = new PrintStream(file, "UTF-8")) {

      String name = "prosecurity";

      out.println("url=" + changeUrlDbName(pgAdminUrl(), System.getProperty("user.name") + "_" + name));
      out.println("username=" + System.getProperty("user.name") + "_" + name);
      out.println("password=111");

    }
  }

  private void dropCreateFileStorageDb() throws Exception{
    prepareFileStorageConfig();
    DbConnector db = fileStorageConfig.get().db().get(0);
    recreateDb(db.url, db.username, db.password);
  }

  private void prepareFileStorageConfig() throws Exception {
    ConfigStorage configStorage = allPostgresConfigFactory.get().getConfigStorage();

    String configLocation = allPostgresConfigFactory.get().configLocationFor(FileStorageConfig.class);

    if (!configStorage.isConfigContentExists(configLocation)) {
      writeFileStorageConfigFile();
    } else if (urlIsNotJdbc(fileStorageConfig.get().db().get(0).url)) {
      writeFileStorageConfigFile();
      allPostgresConfigFactory.get().reset();
    }
  }

  private void writeFileStorageConfigFile() throws Exception {
    StringBuilder sb = new StringBuilder();

    String userName = System.getProperty("user.name") + "_prosecurity_fs";
    String url = changeUrlDbName(pgAdminUrl(), userName);

    sb.append("db.listElementsCount=").append(FileStorageFactory.DB_COUNT).append("\n");
    for (int i = 0; i < FileStorageFactory.DB_COUNT; i++) {
      sb.append("db.").append(i).append(".url=").append(url).append("\n");
      sb.append("db.").append(i).append(".username=").append(userName).append("\n");
      sb.append("db.").append(i).append(".password=111").append("\n");
    }

    saveConfigContent(sb.toString(), FileStorageConfig.class);
  }

  public static Connection getPostgresAdminConnection() throws Exception {
    Class.forName("org.postgresql.Driver");
    return DriverManager.getConnection(pgAdminUrl(), pgAdminUserid(), pgAdminPassword());
  }

  private static boolean urlIsNotJdbc(String url) {
    return url == null || !url.startsWith("jdbc:");
  }

  private void saveConfigContent(String content, Class<?> configClass) throws Exception {
    ConfigStorage configStorage = allPostgresConfigFactory.get().getConfigStorage();
    String configLocation = allPostgresConfigFactory.get().configLocationFor(configClass);
    configStorage.saveConfigContent(configLocation, content);
  }
}
