package chun.li.GStack.StoryMap.api.repositories;

import chun.li.GStack.StoryMap.api.domain.Card;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface CardRepository extends Neo4jRepository<Card, Long> {
    
}
