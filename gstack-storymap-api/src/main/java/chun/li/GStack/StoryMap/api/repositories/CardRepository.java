package chun.li.GStack.StoryMap.api.repositories;

import chun.li.GStack.StoryMap.api.domain.Card;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface CardRepository extends Neo4jRepository<Card, Long> {
    @Query("MATCH (g:Card)" +
            " WHERE id(g)=$id" +
            " OPTIONAL MATCH (g)-[r1:PLAN]->(plan:Card)-[r2:PLANNED_IN]->(r:Release)" +
            " WHERE id(r)=$release" +
            " RETURN plan, r2, r, r1, g")
    Collection<Card> findAllByIdAndRelease(@Param("id") Long id, @Param("release") Long release);

    @Query("MATCH (g:Card), (rel:Release)" +
            " WHERE id(g)=$id AND id(rel)=$release" +
            " MATCH (new:Card)" +
            " WHERE id(new)=$planId" +
            " OPTIONAL MATCH (g)-[r:PLAN]->(old:Card)-[planin:PLANNED_IN]->(rel)" +
            " CREATE (g)-[:PLAN]->(new)-[:PLANNED_IN]->(rel)" +
            " DELETE r, planin" +
            " RETURN old")
    Card plan(@Param("id") Long id, @Param("release") Long release, @Param("planId") Long planId);
}
