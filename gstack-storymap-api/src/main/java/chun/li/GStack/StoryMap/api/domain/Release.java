package chun.li.GStack.StoryMap.api.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.neo4j.ogm.annotation.Relationship.INCOMING;

@NodeEntity
public class Release {
    @Id
    @GeneratedValue
    private Long id;

    @JsonProperty
    private String title;

    @Relationship(type = "NEXT")
    @JsonIgnore
    private
    Release next;

    @Relationship(type = "NEXT", direction = INCOMING)
    @JsonIgnore
    private
    Release prev;

    @Relationship(type = "PLAN", direction = INCOMING)
    @JsonIgnore
    private Project project;

    public Release() {
    }

    public Release(String title) {
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Release getNext() {
        return next;
    }

    public void setNext(Release next) {
        if (next != null) {
            next.prev = this;
            next.project = null;
        } else if (this.next != null) {
            this.next.prev = null;
        }
        this.next = next;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
        this.prev = null;
        if (project != null) {
            project.getRelease().project = null;
            project.setRelease(this);
        }
    }

    public Release last() {
        Release last = this;
        while (last.next != null)
            last = last.next;
        return last;
    }

    public boolean hasNext() {
        return next != null;
    }

    public Iterable<Release> toList() {
        List<Release> list = new ArrayList<>();
        Release item = this;
        while (item != null) {
            list.add(item);
            item = item.next;
        }
        return list;
    }

    @JsonProperty
    private String objective;

    @JsonProperty
    private Date start;

    @JsonProperty
    private Date end;


    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public String getObjective() {
        return objective;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }
}
