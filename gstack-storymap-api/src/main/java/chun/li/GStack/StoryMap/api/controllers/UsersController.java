package chun.li.GStack.StoryMap.api.controllers;

import chun.li.GStack.StoryMap.api.domain.User;
import chun.li.GStack.StoryMap.api.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("users")
public class UsersController {
    private final UserService userService;

    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("me")
    public User user(Principal principal, @CookieValue("XSRF-TOKEN") String token) {
        User me = userService.findByName(principal.getName());
        if (me != null) {
            me.setToken(token);
        }
        return me;
    }

    @GetMapping("mytoken")
    @ResponseBody
    public String getToken(@CookieValue("XSRF-TOKEN") String token) {
        return token;
    }
}
