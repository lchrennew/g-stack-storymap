package chun.li.GStack.StoryMap.api.repositories;

import chun.li.GStack.StoryMap.api.domain.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface UserRepository extends Neo4jRepository<User, Long> {

    User findUserByName(String name);
}
