package chun.li.GStack.StoryMap.api.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;
import static org.apache.calcite.linq4j.Linq4j.asEnumerable;
import static org.neo4j.ogm.annotation.Relationship.INCOMING;

@NodeEntity
@JsonInclude(NON_NULL)
public class Card {
    public Card() {
    }

    @Id
    @GeneratedValue
    Long id;

    @JsonProperty
    private
    String title;

    @Relationship(type = "NEXT", direction = INCOMING)
    @JsonIgnore
    private Card prev;

    @Relationship(type = "NEXT")
    @JsonIgnore
    private Card next;

    @Relationship(type = "DETAIL", direction = INCOMING)
    @JsonIgnore
    private Card general;


    @Relationship(type = "DETAIL")
    @JsonIgnore
    private Card detail;

    @Relationship(type = "PLAN")
    @JsonIgnore
    private Set<Card> plans;

    @Relationship(type = "DETAIL", direction = INCOMING)
    @JsonIgnore
    private Project project;

    @Relationship(type = "PLANNED_IN")
    @JsonIgnore
    private Release release;

    @JsonProperty
    private String description;

    // MUST/SHOULD/COULD/WOULD_NOT
    @JsonProperty
    private String necessity = "";

    @JsonProperty
    private String color;

    public Card getNext() {
        return next;
    }

    public void setNext(Card next) {
        if (next != null) {
            next.prev = this;
            next.general = null;
            next.release = null;
        } else if (this.next != null) {
            this.next.prev = null;
        }
        this.next = next;
    }

    // -------------------- TITLE
    public String getTitle() {
        return title;
    }

    // -------------------- ID
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }


    @JsonProperty("details")
    public Iterable<Card> getDetails() {
        if (this.detail != null) {
            return this.detail.toList();
        } else return null;
    }

    Iterable<Card> toList() {
        List<Card> list = new ArrayList<>();
        Card item = this;
        list.add(item);
        while (item.next != null) {
            list.add(item = item.next);
        }
        return list;
    }

    // -------------------- PROJECT
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
        if (project != null) {
            project.getDetail().project = null;
            project.setDetail(this);
        }
    }


    // -------------------- RELEASE
    public Release getRelease() {
        return release;
    }


    @JsonProperty("plans")
    public Map<Long, Iterable<Card>> getPlans() {
        if (this.plans != null) {
            return asEnumerable(this.plans)
                    .where(plan -> plan.release != null)
                    .toMap(plan -> plan.release.getId(), Card::toList);
        } else return null;
    }

    @JsonProperty("ac")
    private String acceptanceCriteria;

    @JsonIgnore
    public Card getGeneral() {
        return general;
    }

    @JsonIgnore
    public Card getPrev() {
        return prev;
    }

    @JsonIgnore
    public Card getPlannedDetail(Long release) {
        if (plans == null)
            return null;
        else
            return asEnumerable(plans)
                    .firstOrDefault(
                            c -> c.getRelease().getId().equals(release)
                    );
    }

}
