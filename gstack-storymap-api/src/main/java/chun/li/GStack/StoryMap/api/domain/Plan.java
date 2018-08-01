package chun.li.GStack.StoryMap.api.domain;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import java.util.ArrayList;

import static org.neo4j.ogm.annotation.Relationship.INCOMING;

@NodeEntity
public class Plan {
    @Id
    @GeneratedValue
    Long id;

    @Relationship(type = "PLANNED_FOR")
    Release release;

    @Relationship(type = "GENERAL", direction = INCOMING)
    Card general;

    @Relationship(type = "DETAIL")
    Card detail;

    public Release getRelease() {
        return release;
    }

    public Iterable<Card> getCards() {
        if (detail != null)
            return detail.toList();
        else
            return new ArrayList<>();
    }
}
