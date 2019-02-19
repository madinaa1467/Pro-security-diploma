package kz.diploma.prosecurity.register.util;

import kz.diploma.prosecurity.register.util.my_batis.CustomBooleanTypeHandler;
import kz.diploma.prosecurity.register.util.my_batis.CustomEnumTypeHandler;
import kz.greetgo.db.DbProxyFactory;
import kz.greetgo.db.GreetgoTransactionManager;
import kz.greetgo.db.TransactionManager;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.HasAfterInject;
import kz.greetgo.depinject.core.replace.BeanReplacer;
import kz.diploma.prosecurity.controller.model.UserCan;
import org.apache.ibatis.logging.log4j.Log4jImpl;
import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.ibatis.transaction.TransactionFactory;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandlerRegistry;
import org.apache.log4j.Logger;

import javax.sql.DataSource;

public abstract class LocalSessionFactory implements BeanReplacer, HasAfterInject, DataSourceGetter {
  private final TransactionManager transactionManager = new GreetgoTransactionManager();
  private final TransactionFactory transactionFactory = new LocalTransactionFactory(transactionManager);
  private final DbProxyFactory dbProxyFactory = new DbProxyFactory(transactionManager);

  @Override
  public Object replaceBean(Object originalBean, Class<?> returnClass) {

    if (!returnClass.isInterface()) return originalBean;

    return dbProxyFactory.createProxyFor(originalBean, returnClass);
  }

  @Bean
  public JdbcProSecurity getJdbcProSecurity() {
    return jdbcProSecurity;
  }

  private JdbcProSecurity jdbcProSecurity = null;

  private SqlSessionFactory sqlSessionFactory = null;

  protected abstract DataSource createDataSource() throws Exception;

  protected abstract String databaseEnvironmentId();

  private DataSource dataSource;

  @Override
  public DataSource getDataSource() {
    return dataSource;
  }

  @Override
  public void afterInject() throws Exception {
    dataSource = createDataSource();

    dataSource = DbLoggingProxyFactory.create(dataSource, new DbLoggingProxyFactory.AbstractSqlViewer() {
      final Logger logger = Logger.getLogger("DIRECT_SQL");

      @Override
      protected void logTrace(String message) {
        if (logger.isTraceEnabled()) logger.trace(message);
      }
    });

    jdbcProSecurity = new JdbcProSecurity(dataSource, transactionManager);

    Environment environment = new Environment(databaseEnvironmentId(), transactionFactory, dataSource);

    Configuration configuration = new Configuration(environment);
    configuration.setJdbcTypeForNull(JdbcType.NULL);
    configuration.setLogImpl(Log4jImpl.class);

    configuration.setMapUnderscoreToCamelCase(true);

    TypeHandlerRegistry typeHandlerRegistry = configuration.getTypeHandlerRegistry();

    typeHandlerRegistry.register(Boolean.class, new CustomBooleanTypeHandler());
    typeHandlerRegistry.register(boolean.class, new CustomBooleanTypeHandler());
    typeHandlerRegistry.register(JdbcType.BOOLEAN, new CustomBooleanTypeHandler());
    typeHandlerRegistry.register(UserCan.class, new CustomEnumTypeHandler<>(UserCan.class));

    SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();

    sqlSessionFactory = sqlSessionFactoryBuilder.build(configuration);
  }


  public Configuration getConfiguration() {
    return sqlSessionFactory.getConfiguration();
  }

  public SqlSession sqlSession() {
    return sqlSessionFactory.openSession(true);
  }
}
