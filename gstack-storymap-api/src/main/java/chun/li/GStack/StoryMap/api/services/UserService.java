package chun.li.GStack.StoryMap.api.services;

import chun.li.GStack.StoryMap.api.domain.User;
import chun.li.GStack.StoryMap.api.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public void save(User user) {
        User existed = userRepository.findUserByName(user.getName());
        if (existed != null) {
            existed.setAvatar(user.getAvatar());
            user = existed;
        }
        userRepository.save(user, 0);
    }

    public User findByName(String name) {

        return userRepository.findUserByName(name);
    }
}
