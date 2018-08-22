package chun.li.GStack.StoryMap.api.repositories;

import chun.li.GStack.StoryMap.api.domain.Comment;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends Neo4jRepository<Comment, Long> {

    @Query("MATCH (target) WHERE id(target)=$target\n" +
            " OPTIONAL MATCH (target)-[:REPLY]->(c0:Comment)-[r1:BY]->(u0:User)\n" +
            " OPTIONAL MATCH (c0)-[r2:NEXT|:REPLY*]->(c:Comment)-[r3:BY]->(u:User)\n" +
            " RETURN c0, c, u0, u, r1, r2, r3")
    Iterable<Comment> findAllByTarget(@Param("target") Long target);

    @Query("MATCH (target), (comment:Comment)\n" +
            " WHERE id(target)=$target AND id(comment)=$id\n" +
            " OPTIONAL MATCH (target)-[:REPLY]->(c0:Comment)\n" +
            " OPTIONAL MATCH (c0)-[:NEXT*]->(last:Comment)\n" +
            " WHERE size((last)-[:NEXT]->(:Comment))=0\n" +
            " FOREACH(o IN CASE WHEN c0 IS NULL THEN [1] ELSE [] END|\n" +
            " CREATE (target)-[:REPLY]->(comment)\n" +
            " )" +
            " FOREACH(o IN CASE WHEN c0 IS NOT NULL AND last IS NULL THEN [1] ELSE [] END|" +
            " CREATE (c0)-[:NEXT]->(comment)" +
            " )" +
            " FOREACH(o IN CASE WHEN last IS NOT NULL THEN [1] ELSE [] END|" +
            " CREATE (last)-[:NEXT]->(comment)" +
            " )")
    void appendToTarget(@Param("id") Long id, @Param("target") Long target);


    @Query("MATCH (comment:Comment), (author:User {name:$name})" +
            " WHERE id(comment) = $id" +
            " CREATE (comment)-[r:BY]->(author)" +
            " RETURN comment, author, r")
    Comment setAuthor(@Param("id") Long id, @Param("name") String name);
}
