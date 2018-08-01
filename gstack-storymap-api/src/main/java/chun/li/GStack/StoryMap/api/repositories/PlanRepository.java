package chun.li.GStack.StoryMap.api.repositories;

import chun.li.GStack.StoryMap.api.domain.Plan;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface PlanRepository extends Neo4jRepository<Plan, Long> {

}
