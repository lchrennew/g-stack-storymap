package chun.li.GStack.StoryMap.api;

public class CypherUtils {
    public final static String CREATE_NEW_NEXT_RELATIONSHIPS = (
            " FOREACH (o1 IN CASE WHEN c_next IS NOT NULL THEN [1] ELSE [] END|\n" +
                    (
                            " FOREACH (o2 IN CASE WHEN c_prev IS NOT NULL THEN [1] ELSE [] END|\n" +
                                    " CREATE (c_prev)-[:NEXT]->(c_next)\n" +
                                    " )\n" +

                                    " FOREACH (o2 IN CASE WHEN c_general IS NOT NULL THEN [1] ELSE [] END|\n" +
                                    " CREATE (c_general)-[:DETAIL]->(c_next)\n" +
                                    " )\n" +

                                    " FOREACH (o2 IN CASE WHEN c_root IS NOT NULL THEN [1] ELSE [] END|\n" +
                                    " CREATE (c_root)-[:DETAIL]->(c_next)\n" +
                                    " )\n" +

                                    " FOREACH (o2 IN CASE WHEN c_for IS NOT NULL THEN [1] ELSE [] END|\n" +
                                    " CREATE (c_for)-[:PLAN]->(c_next)\n" +
                                    " )\n" +

                                    " FOREACH (o2 IN CASE WHEN c_rel IS NOT NULL THEN [1] ELSE [] END|\n" +
                                    " CREATE (c_next)-[:PLANNED_IN]->(c_rel)\n" +
                                    " )\n"
                    ) +

                    " )\n"
    );

    public final static String OPTIONAL_MATCH_CS_RELATIONSHIPS = (
            " OPTIONAL MATCH (c_prev:Card)-[r_prev:NEXT]->(c)\n" + // prev to c
                    " OPTIONAL MATCH (c)-[r_next:NEXT]->(c_next:Card)\n" + // next to c
                    " OPTIONAL MATCH (c_general:Card)-[r_general:DETAIL]->(c)\n" + // general to c
                    " OPTIONAL MATCH (c_root:Project)-[r_root:DETAIL]->(c)\n" + // root to c
                    " OPTIONAL MATCH (c_for:Card)-[r_for:PLAN]->(c)\n" + // c's plan for
                    " OPTIONAL MATCH (c)-[r_rel:PLANNED_IN]->(c_rel:Release)\n" // c's planned in
    );
}
