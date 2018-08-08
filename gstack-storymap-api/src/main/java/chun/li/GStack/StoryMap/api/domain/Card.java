package chun.li.GStack.StoryMap.api.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import java.util.*;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;
import static org.apache.calcite.linq4j.Linq4j.asEnumerable;
import static org.neo4j.ogm.annotation.Relationship.INCOMING;

@NodeEntity
@JsonInclude(NON_NULL)
public class Card {
    public Card() {
    }

    public Card(String title) {
        this.title = title;
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
    private Collection<Card> plans;

    @Relationship(type = "PLAN", direction = INCOMING)
    @JsonIgnore
    private Card planFor;

    @Relationship(type = "DETAIL", direction = INCOMING)
    @JsonIgnore
    private Project project;

    @Relationship(type = "PLANNED_IN")
    @JsonIgnore
    private Release release;

    // ------------------ GENERAL
    public boolean hasGeneral() {
        return general != null;
    }

    public Card getGeneral() {
        return general;
    }

    // ------------------ DETAIL
    public boolean hasDetail() {
        return detail != null;
    }

    public Card getDetail() {
        return detail;
    }

    public void setDetail(Card detail) {
        if (detail != null) {
            detail.general = this;
            detail.prev = null;
            detail.release = null;
        } else if (this.detail != null) {
            this.detail.general = null;
        }
        this.detail = detail;

    }

    // ------------------ PREVIOUS
    public boolean hasPrev() {
        return prev != null;
    }

    public Card getPrev() {
        return prev;
    }


    // ------------------- NEXT
    public boolean hasNext() {
        return next != null;
    }

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

    public void setTitle(String title) {
        this.title = title;
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

    public Iterable<Card> toList() {
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

    public boolean hasProject() {
        return project != null;
    }


    public void setPlan(Release release, Card plan) {
        if (hasPlan(release)) {
            Card oldPlan = this.getPlan(release.getId());
            oldPlan.planFor = null;
            plans.remove(oldPlan);
        }
        if (plan != null) {
            plan.release = release;
            plan.planFor = this;
            plan.general = null;
            plan.prev = null;
            addPlan(plan);
        }
    }

    private void addPlan(Card plan) {
        if (this.plans == null)
            this.plans = new ArrayList<>();
        this.plans.add(plan);
    }

    private boolean hasPlan(Release release) {
        return this.plans != null
                && asEnumerable(this.plans).any(
                plan -> plan.release == null
                        || Objects.equals(plan.release.getId(), release.getId()));
    }

    public Card getPlan(Long release) {
        return this.plans != null ?
                asEnumerable(this.plans)
                        .firstOrDefault(plan ->
                                plan.release == null
                                        || Objects.equals(plan.release.getId(), release)) :
                null;
    }

    public Card getPlanFor() {
        return planFor;
    }

    public boolean withDepth(int depth) {
        Card card = this.first();
        int i = 1;
        while (card.hasGeneral()) {
            card = card.general.first();
            i++;
        }
        return depth == i;
    }

    private Card first() {
        Card first = this;
        while (first.hasPrev()) {
            first = first.prev;
        }
        return first;
    }

    public boolean planned() {
        return planFor != null && release != null;
    }

    @JsonProperty("plans")
    public Map<Long, Iterable<Card>> getPlans() {
        if (this.plans != null) {
            return asEnumerable(this.plans).toMap(plan -> plan.release.getId(), Card::toList);
        } else return null;
    }
}
