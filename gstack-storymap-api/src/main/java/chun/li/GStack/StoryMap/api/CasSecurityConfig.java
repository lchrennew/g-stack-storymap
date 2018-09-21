package chun.li.GStack.StoryMap.api;

import chun.li.GStack.StoryMap.api.domain.User;
import chun.li.GStack.StoryMap.api.services.UserService;
import com.kakawait.spring.boot.security.cas.autoconfigure.CasAuthenticationFilterConfigurer;
import com.kakawait.spring.boot.security.cas.autoconfigure.CasSecurityConfigurerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import java.net.URLEncoder;

@Configuration
public class CasSecurityConfig extends CasSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;

    @Override
    public void configure(CasAuthenticationFilterConfigurer filter) {
        // Here you can configure CasAuthenticationFilter
        filter.authenticationSuccessHandler((request, response, authentication) -> {
            String returnUrl = request.getParameter("return_uri");
            User user = new User(
                    authentication.getName(),
                    "//i.pravatar.cc/300?u=" + authentication.getName(),
                    "cas");
            userService.save(user);
            response.sendRedirect(returnUrl);
        });
        filter.authenticationFailureHandler((request, response, authentication) -> {
            response.sendRedirect(
                    server
                            + login
                            + "?service="
                            + URLEncoder.encode(
                            request.getRequestURL() + "?" + request.getQueryString(), "utf-8"));
        });
    }

    @Value("${security.cas.server.base-url}")
    private String server;

    @Value("${security.cas.server.paths.login}")
    private String login;


    @Override
    public void configure(HttpSecurity http) throws Exception {
        super.configure(http);

        http
                .requestMatcher(
                        request -> {
                            String uri = request.getRequestURI();
                            return !uri.startsWith("/login") && !uri.startsWith("/favicon.ico");
                        })
                .exceptionHandling()
                .authenticationEntryPoint((request, response, authentication) -> {
                    if (!request.getRequestURI().startsWith("/login")) {

                        String origin = request.getHeader("Origin");
                        response.setHeader("Access-Control-Allow-Origin", origin);
                        response.setHeader("Access-Control-Allow-Credentials", "true");
                        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                        response.setHeader("Access-Control-Allow-Headers", "x-xsrf-token, Content-Type");
                        response.setHeader("Access-Control-Max-Age", "3600");
                        if (request.getMethod().equalsIgnoreCase("OPTIONS"))
                            response.sendError(200);
                        else
                            response.sendError(403, authentication.getMessage());
                    }
        });
    }
}
