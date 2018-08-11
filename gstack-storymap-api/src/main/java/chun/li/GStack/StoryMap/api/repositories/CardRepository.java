package chun.li.GStack.StoryMap.api.repositories;

import chun.li.GStack.StoryMap.api.domain.Card;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

import static chun.li.GStack.StoryMap.api.CypherUtils.CREATE_NEW_NEXT_RELATIONSHIPS;
import static chun.li.GStack.StoryMap.api.CypherUtils.OPTIONAL_MATCH_CS_RELATIONSHIPS;

public interface CardRepository extends Neo4jRepository<Card, Long> {

//    @Query("MATCH (g:Card), (rel:Release)\n" +
//            " WHERE id(g)=$id AND id(rel)=$release\n" +
//            " MATCH (new:Card)\n" +
//            " WHERE id(new)=$planId\n" +
//            " OPTIONAL MATCH (g)-[r:PLAN]->(old:Card)-[planin:PLANNED_IN]->(rel)\n" +
//            " CREATE (g)-[:PLAN]->(new)-[:PLANNED_IN]->(rel)\n" +
//            " DELETE r, planin\n" +
//            " RETURN old")
//    Card plan(@Param("id") Long id, @Param("release") Long release, @Param("planId") Long planId);

    @Query(
            // 1. cs & to
            "MATCH (c:Card), (to:Card)\n" +
                    " WHERE id(c)=$id AND id(to)=$to\n" +
                    // 2. c's relationships
                    OPTIONAL_MATCH_CS_RELATIONSHIPS +
                    // 3. to's relationships [NOTICE: according to which relationship to be replaced]
                    " OPTIONAL MATCH (to)-[r_to:NEXT]->(to_next:Card)\n" + // to's next
                    // 4. DELETE c's relationships
                    " DELETE r_prev, r_next, r_general, r_root, r_for, r_rel\n" +
                    // 5. DELETE to's relationships
                    " DELETE r_to\n" +
                    // 6. CREATE c's next's new relationships
                    CREATE_NEW_NEXT_RELATIONSHIPS +
                    // 7. CREATE c's new relationships  [NOTICE: according to which relationship to be replaced]
                    " CREATE (to)-[:NEXT]->(c)\n" +
                    " FOREACH (o IN CASE WHEN to_next IS NOT NULL THEN [to_next] ELSE [] END |" +
                    " CREATE (c)-[:NEXT]->(to_next)" +
                    " )"
    )
    void next(@Param("id") Long id, @Param("to") Long to);


    // DONE
    @Query(
            // 1. cs & to
            "MATCH (c:Card), (to:Project)\n" +
                    " WHERE id(c)=$id AND id(to)=$to\n" +
                    // 2. c's relationships
                    OPTIONAL_MATCH_CS_RELATIONSHIPS +
                    // 3. to's relationships [NOTICE: according to which relationship to be replaced]
                    " OPTIONAL MATCH (to:Project)-[r_to:DETAIL]->(to_root:Card)\n" + // to's root
                    // 4. DELETE c's relationships
                    " DELETE r_prev, r_next, r_general, r_root, r_for, r_rel\n" +
                    // 5. DELETE to's relationships
                    " DELETE r_to\n" +
                    // 6. CREATE c's next's new relationships
                    CREATE_NEW_NEXT_RELATIONSHIPS +


                    // 7. CREATE c's new relationships  [NOTICE: according to which relationship to be replaced]
                    " CREATE (to)-[:DETAIL]->(c)\n" +
                    (
                            " FOREACH (o1 IN CASE WHEN to_root IS NOT NULL THEN [1] ELSE [] END|\n" +
                                    " CREATE (c)-[:NEXT]->(to_root)\n" +
                                    " )\n"
                    )

    )
    void root(@Param("id") Long id, @Param("to") Long to);


    @Query(
            // 1. cs & to
            "MATCH (c:Card), (to:Card)\n" +
                    " WHERE id(c)=$id AND id(to)=$to\n" +
                    // 2. c's relationships
                    OPTIONAL_MATCH_CS_RELATIONSHIPS +
                    // 3. to's relationships [NOTICE: according to which relationship to be replaced]
                    " OPTIONAL MATCH (to)-[r_to:DETAIL]->(to_detail:Card)\n" + // to's detail
                    // 4. DELETE c's relationships
                    " DELETE r_prev, r_next, r_general, r_root, r_for, r_rel\n" +
                    // 5. DELETE to's relationships
                    " DELETE r_to\n" +
                    // 6. CREATE c's next's new relationships
                    CREATE_NEW_NEXT_RELATIONSHIPS +
                    // 7. CREATE c's new relationships  [NOTICE: according to which relationship to be replaced]
                    " FOREACH (o IN CASE WHEN to_detail IS NOT NULL THEN [1] ELSE [] END |\n" +
                    " CREATE (c)-[:NEXT]->(to_detail)\n" +
                    ")\n" +
                    " CREATE (to)-[:DETAIL]->(c)")
    void detail(@Param("id") Long id, @Param("to") Long to);


    @Query(
            // 1. cs & to & rel
            "MATCH (c:Card), (to:Card), (rel:Release)\n" +
                    " WHERE id(c)=$id AND id(to)=$to AND id(rel)=$release\n" +
                    // 2. c's relationships
                    OPTIONAL_MATCH_CS_RELATIONSHIPS +
                    // 3. to's relationships [NOTICE: according to which relationship to be replaced]
                    " OPTIONAL MATCH (to)-[r_to:PLAN]->(to_plan:Card)-[r_to_rel:PLANNED_IN]->(rel)\n" + // to's plan
                    // 4. DELETE c's relationships
                    " DELETE r_prev, r_next, r_general, r_root, r_for, r_rel\n" +
                    // 5. DELETE to's relationships
                    " DELETE r_to, r_to_rel\n" +
                    // 6. CREATE c's next's new relationships
                    CREATE_NEW_NEXT_RELATIONSHIPS +
                    // 7. CREATE c's new relationships  [NOTICE: according to which relationship to be replaced]
                    " CREATE (to)-[:PLAN]->(c)\n" +
                    " CREATE (c)-[:PLANNED_IN]->(rel)\n" +
                    " FOREACH (o IN CASE WHEN to_plan IS NOT NULL THEN [1] ELSE [] END |\n" +
                    " CREATE (c)-[:NEXT]->(to_plan)\n" +
                    " )")
    void plan(@Param("id") Long id, @Param("to") Long to, @Param("release") Long release);

    @Query("MATCH (c:Card) WHERE id(c)=$id SET c.title=$title")
    void updateTitle(@Param("id") Long id,@Param("title") String title);

    @Query("MATCH (c:Card)\n" +
            " WHERE id(c)=$id\n" +
            OPTIONAL_MATCH_CS_RELATIONSHIPS +
            " DETACH DELETE c\n" +
            CREATE_NEW_NEXT_RELATIONSHIPS)
    void delete(@Param("id") Long id);
}
