package chun.li.GStack.StoryMap.api.repositories;

import chun.li.GStack.StoryMap.api.domain.Project;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

public interface ProjectRepository extends Neo4jRepository<Project, Long> {

    @Query("MATCH (p:Project)" +
            " WHERE id(p)=$project" +
            " OPTIONAL MATCH (p)-[r1:DETAIL|:NEXT|:PLAN*]->(c:Card)" +
            " OPTIONAL MATCH (c)-[r2:PLANNED_IN]->(r:Release)" +
            " RETURN p, r1, c, r2, r")
    Project findAllCards(@Param("project") Long project);

    @Query("MATCH (p:Project) WHERE id(p) = $project" +
            " OPTIONAL MATCH (p)-[r:PLAN|:NEXT*]->(n:Release)" +
            " RETURN p, r, n")
    Project findAllReleases(@Param("project") Long project);
}
