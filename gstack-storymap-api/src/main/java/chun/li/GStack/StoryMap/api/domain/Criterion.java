package chun.li.GStack.StoryMap.api.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

@NodeEntity(label = "Criterion")
public class Criterion {
    @Id
    @GeneratedValue
    private
    Long id;

    @Relationship(type = "FOR")
    private Card card;

    @JsonProperty
    private String title;

    @JsonProperty
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
