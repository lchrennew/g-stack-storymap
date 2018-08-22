package chun.li.GStack.StoryMap.api.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import java.util.Date;

@NodeEntity
public class Comment {

    public Comment() {
    }

    public Long getId() {
        return id;
    }

    @Id
    @GeneratedValue
    Long id;

    @Relationship(type = "BY")
    @JsonProperty
    private User author;

    @JsonProperty
    private String content;

    @JsonProperty
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Date createdAt = new Date();

    @Relationship(type = "REPLY")
    private Comment reply;

    @Relationship(type = "NEXT")
    private Comment next;
}
