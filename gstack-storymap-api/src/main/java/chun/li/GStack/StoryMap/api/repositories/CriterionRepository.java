package chun.li.GStack.StoryMap.api.repositories;

import chun.li.GStack.StoryMap.api.domain.Criterion;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

public interface CriterionRepository
        extends Neo4jRepository<Criterion, Long> {

    @Query("MATCH (card)<-[:FOR]-(ac:Criterion)" +
            " WHERE id(card)=$card" +
            " RETURN ac")
    Iterable<Criterion> findAllByCard(@Param("card") Long card);

    @Query("MATCH (card:Card), (ac:Criterion)" +
            " WHERE id(card)=$card AND id(ac)=$id" +
            " CREATE (ac)-[:FOR]->(card)")
    void attachToCard(@Param("id") Long id, @Param("card") Long card);
}
