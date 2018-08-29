package chun.li.GStack.StoryMap.api.domain;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;

public class User {

    public User() {
    }

    public User(String name, String avatar) {
        this.name = name;
        this.avatar = avatar;
    }


    @Id
    @GeneratedValue
    Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    private String name;

    private String avatar;

    public void setToken(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    private String token;

}
