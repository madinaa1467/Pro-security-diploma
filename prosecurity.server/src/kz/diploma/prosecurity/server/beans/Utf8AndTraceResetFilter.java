package kz.diploma.prosecurity.server.beans;

import kz.diploma.prosecurity.controller.logging.LogIdentity;
import kz.greetgo.depinject.core.Bean;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.EnumSet;

@Bean
public class Utf8AndTraceResetFilter implements Filter {
  public void register(ServletContext ctx) {
    FilterRegistration.Dynamic dynamic = ctx.addFilter(getClass().getName(), this);
    dynamic.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");
  }

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
    throws IOException, ServletException {

    if (!(servletRequest instanceof HttpServletRequest) || !(servletResponse instanceof HttpServletResponse)) {
      throw new ServletException(getClass().getSimpleName() + " can work only with HTTP protocol");
    }

    LogIdentity.resetThread();

    HttpServletRequest request = (HttpServletRequest) servletRequest;
    HttpServletResponse response = (HttpServletResponse) servletResponse;

    request.setCharacterEncoding("UTF-8");
    response.setCharacterEncoding("UTF-8");

    response.addHeader("Access-Control-Allow-Credentials", "true");
    response.addHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));

    response.addHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    response.addHeader("Access-Control-Allow-Headers", "origin,x-requested-with,access-control-request-headers," +
      "content-type,access-control-request-method,accept,token,set-cookie");
    response.addHeader("Access-Control-Max-Age", "1800");
    response.addHeader("Access-Control-Expose-Headers", "Content-Disposition");

    chain.doFilter(request, response);
  }

  @Override
  public void init(FilterConfig filterConfig) throws ServletException {}

  @Override
  public void destroy() {}
}
