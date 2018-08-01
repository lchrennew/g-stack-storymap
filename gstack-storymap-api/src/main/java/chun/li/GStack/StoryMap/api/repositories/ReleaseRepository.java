package chun.li.GStack.StoryMap.api.repositories;

import chun.li.GStack.StoryMap.api.domain.Release;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface ReleaseRepository extends Neo4jRepository<Release, Long> {
}
