package chun.li.GStack.StoryMap.api.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import java.util.ArrayList;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@NodeEntity(label = "Project")
@JsonInclude(NON_NULL)
public class Project {

    public Project() {
    }

    public Project(String title) {
        this.title = title;
    }

    @Id
    @GeneratedValue
    @JsonProperty
    Long id;

    @JsonProperty
    String title;

    @Relationship(type = "PLAN")

    @JsonIgnore
    private Release release;

    @Relationship(type = "DETAIL")
    @JsonIgnore
    private Card detail;

    public void setDetail(Card detail) {
        this.detail = detail;
    }

    public Card getDetail() {
        return detail;
    }

    public void addRelease(Release release) {
        if (this.release != null) {
            this.release.last().setNext(release);
        } else {
            this.release = release;
            release.setProject(this);
        }
    }

    public Release getRelease() {
        return release;
    }

    public void setRelease(Release release) {
        this.release = release;
    }

    public Iterable<Card> getDetails() {
        return detail != null ? detail.toList() : new ArrayList<>();
    }

    public Iterable<Release> getReleases() {
        return release != null ? release.toList() : new ArrayList<>();
    }
}
