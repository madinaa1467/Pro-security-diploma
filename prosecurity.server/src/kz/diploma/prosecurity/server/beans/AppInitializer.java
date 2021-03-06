package kz.diploma.prosecurity.server.beans;

import kz.diploma.prosecurity.register.util.App;
import kz.diploma.prosecurity.register.util.LiquibaseManager;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;

import javax.servlet.ServletContext;

@Bean
public class AppInitializer {

  public BeanGetter<LiquibaseManager> liquibaseManager;

  public BeanGetter<ControllerServlet> controllerServlet;

  public BeanGetter<Utf8AndTraceResetFilter> utf8AndTraceResetFilter;

  public BeanGetter<ForwardFilter> forwardFilter;


  public void initialize(ServletContext ctx) throws Exception {
    if (!App.do_not_run_liquibase_on_deploy_war().exists()) {
      liquibaseManager.get().apply();
    }

    utf8AndTraceResetFilter.get().register(ctx);

    forwardFilter.get().register(ctx);

    controllerServlet.get().register(ctx);
  }
}
