package chun.li.GStack.StoryMap.api.repositories;

import chun.li.GStack.StoryMap.api.domain.Release;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

public interface ReleaseRepository extends Neo4jRepository<Release, Long> {

    @Override
    @Query("MATCH (r:Release)\n" +
            " WHERE id(r)=$id\n" +
            " OPTIONAL MATCH (p:Project)-[r_root:PLAN]->(r)\n" +
            " OPTIONAL MATCH (r)-[r_next:NEXT]->(rel_next:Release)\n" +
            " OPTIONAL MATCH (rel_prev:Release)-[r_prev:NEXT]->(r)\n" +
            " DELETE r_root, r_next, r_prev\n" +
            " DETACH DELETE r" +
            " FOREACH(o IN CASE WHEN rel_next IS NOT NULL THEN [1] ELSE [] END|\n" +
            "   FOREACH(m IN CASE WHEN p IS NOT NULL THEN [1] ELSE [] END|\n" +
            "   CREATE (p)-[:PLAN]->(rel_next)\n" +
            "   )\n" +
            "   FOREACH(m IN CASE WHEN rel_prev IS NOT NULL THEN [1] ELSE [] END|\n" +
            "   CREATE (rel_prev)-[:NEXT]->(rel_next)\n" +
            "   )\n" +
            " )")
    void deleteById(@Param("id") Long id);

    @Query("MATCH (r:Release)<-[:PLANNED_IN]-(c:Card)\n" +
            " WHERE id(r)=$id AND c IS NOT NULL\n" +
            " RETURN r")
    Release findByIdWithoutCard(@Param("id") Long id);

    @Query("MATCH (r:Release)\n" +
            " WHERE id(r)=$id\n" +
            " OPTIONAL MATCH (p:Project)-[r_p:PLAN]->(r)\n" +
            " OPTIONAL MATCH (prev:Release)-[r_prev:NEXT]->(r)\n" +
            " OPTIONAL MATCH (r)-[r_next:NEXT]->(next:Release)\n" +
            " OPTIONAL MATCH (next)-[r_next2:NEXT]->(next2:Release)\n" +
            " FOREACH(o IN CASE WHEN next IS NOT NULL THEN [1] ELSE [] END|\n" +
            "     DELETE r_p, r_prev, r_next, r_next2\n" +
            "     FOREACH(m IN CASE WHEN p IS NOT NULL THEN [1] ELSE [] END|\n" +
            "       CREATE (p)-[:PLAN]->(next)\n" +
            "     )\n" +
            "     FOREACH(m IN CASE WHEN prev IS NOT NULL THEN [1] ELSE [] END|\n" +
            "       CREATE (prev)-[:NEXT]->(next)\n" +
            "     )\n" +
            "     FOREACH(m IN CASE WHEN next2 IS NOT NULL THEN [1] ELSE [] END|\n" +
            "       CREATE (r)-[:NEXT]->(next2)\n" +
            "     )\n" +
            "     CREATE (next)-[:NEXT]->(r)\n" +
            " )")
    void moveNext(@Param("id") Long id);

    @Query("MATCH (r:Release)\n" +
            " WHERE id(r)=$id\n" +
            " OPTIONAL MATCH (prev:Release)-[r_prev:NEXT]->(r)\n" +
            " OPTIONAL MATCH (r)-[r_next:NEXT]->(next:Release)\n\n" +
            " OPTIONAL MATCH (prev2)-[r_prev2:NEXT]->(prev)\n\n" +
            " OPTIONAL MATCH (p:Project)-[r_p:PLAN]->(prev)\n\n" +
            " FOREACH(o IN CASE WHEN prev IS NOT NULL THEN [1] ELSE [] END|\n" +
            "   DELETE r_prev, r_next, r_prev2, r_p\n" +
            "   FOREACH(m IN CASE WHEN next IS NOT NULL THEN [1] ELSE [] END|\n" +
            "     CREATE (prev)-[:NEXT]->(next)\n" +
            "   )\n" +
            "   FOREACH(m IN CASE WHEN prev2 IS NOT NULL THEN [1] ELSE [] END|\n" +
            "     CREATE (prev2)-[:NEXT]->(r)\n" +
            "   )\n" +
            "   FOREACH(m IN CASE WHEN p IS NOT NULL THEN [1] ELSE [] END|\n" +
            "     CREATE (p)-[:PLAN]->(r)\n" +
            "   )\n" +
            "   CREATE (r)-[:NEXT]->(prev)" +
            " )")
    void movePrevious(@Param("id") Long id);


    @Query("MATCH (p:Project), (r:Release)\n" +
            " WHERE id(p) = $project AND id(r) = $id\n" +
            " OPTIONAL MATCH (p)-[:PLAN|:NEXT*]->(last:Release)\n" +
            " WHERE size((last)-[:NEXT]->(:Release)) = 0\n" +
            " FOREACH(o IN CASE WHEN last IS NOT NULL THEN [1] ELSE [] END|\n" +
            " CREATE (last)-[:NEXT]->(r)\n" +
            " )\n" +
            " FOREACH(o IN CAsE WHEN last IS NULL THEN [1] ELSE [] END|\n" +
            " CREATE (p)-[:PLAN]->(r)\n" +
            " )")
    void appendTo(@Param("id") Long id, @Param("project") Long project);
}
