package chun.li.GStack.StoryMap.api;

import chun.li.GStack.StoryMap.api.domain.User;
import chun.li.GStack.StoryMap.api.services.UserService;
import com.kakawait.spring.boot.security.cas.autoconfigure.CasAuthenticationFilterConfigurer;
import com.kakawait.spring.boot.security.cas.autoconfigure.CasSecurityConfigurerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

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
                    "",
                    "cas");
            userService.save(user);
            response.sendRedirect(returnUrl);
        });
    }
}
