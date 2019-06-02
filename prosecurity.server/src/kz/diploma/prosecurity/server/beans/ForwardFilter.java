package kz.diploma.prosecurity.server.beans;

import kz.greetgo.depinject.core.Bean;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.EnumSet;

@Bean
public class ForwardFilter implements Filter {

  public void register(ServletContext ctx) {
    FilterRegistration.Dynamic dynamic = ctx.addFilter(getClass().getName(), this);
    dynamic.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");
  }

  @Override
  public void init(FilterConfig filterConfig) throws ServletException {}

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
    throws IOException, ServletException {
    HttpServletRequest req = (HttpServletRequest) request;

    String target = req.getRequestURI();

    if (isContinueChain(target)) {
      chain.doFilter(request, response);
      return;
    }

    RequestDispatcher dispatcher = req.getRequestDispatcher("/index.html");
    dispatcher.forward(request, response);
  }

  @Override
  public void destroy() {}


  private boolean isContinueChain(String target) {
    //if (target.startsWith("/prosecurity/api/")) {
    if (target.startsWith("/api/")) {
      return true;

    }

    int slashLastIndex = target.lastIndexOf('/');
    if (slashLastIndex < 0) {
      return false;
    }

    int pointIndex = target.indexOf('.', slashLastIndex + 1);
    return pointIndex >= 0;
  }

}
