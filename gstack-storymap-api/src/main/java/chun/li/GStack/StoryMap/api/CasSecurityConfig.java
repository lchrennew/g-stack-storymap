package chun.li.GStack.StoryMap.api;

import chun.li.GStack.StoryMap.api.domain.User;
import chun.li.GStack.StoryMap.api.services.UserService;
import com.kakawait.spring.boot.security.cas.autoconfigure.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
public class CasSecurityConfig extends CasSecurityConfigurerAdapter {
    @Override
    public void init(HttpSecurity http) throws Exception {
        super.init(http);
    }

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
            String returnUrl = request.getParameter("return_uri");
        });


    }

    @Value("security.cas.server.base-url")
    private String casServer;

    @Override
    public void configure(CasSingleSignOutFilterConfigurer filter) {
        super.configure(filter);

    }

    @Override
    public void configure(CasAuthenticationProviderSecurityBuilder provider) {
        super.configure(provider);

    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        super.configure(http);
        http.exceptionHandling().authenticationEntryPoint((request, response, authentication) -> {
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Allow-Methods", "*");
            response.setHeader("Access-Control-Max-Age", "3600");
            response.sendError(403, authentication.getMessage());
        });
    }

    @Override
    public void configure(CasTicketValidatorBuilder ticketValidator) {
        super.configure(ticketValidator);
    }
}
