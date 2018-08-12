package chun.li.GStack.StoryMap.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ReleaseMoveOptions {
    public MoveDirection getDirection() {
        return direction;
    }

    public enum MoveDirection {
        Next, Previous
    }

    @JsonProperty
    private MoveDirection direction;
}
