package chun.li.GStack.StoryMap.api.controllers;

import chun.li.GStack.StoryMap.api.MoveOptions;
import chun.li.GStack.StoryMap.api.domain.Card;
import chun.li.GStack.StoryMap.api.domain.Project;
import chun.li.GStack.StoryMap.api.domain.Release;
import chun.li.GStack.StoryMap.api.services.CardService;
import chun.li.GStack.StoryMap.api.services.ProjectService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import static org.springframework.http.HttpStatus.NO_CONTENT;

@Controller
@RequestMapping("cards")
public class CardController {
    private final CardService cardService;
    private final ProjectService projectService;

    public CardController(CardService cardService, ProjectService projectService) {
        this.cardService = cardService;
        this.projectService = projectService;
    }



    @PutMapping("{id}")
    @ResponseBody
    public Card update(@PathVariable Long id, @RequestBody Card card) {
        card.setId(id);
        return cardService.save(card);
    }

    @PostMapping("{id}/detail")
    @ResponseBody
    public Card setDetail(@PathVariable Long id, @RequestBody Card detail) {
        cardService.findById(id).ifPresent(general -> {
            general.setDetail(detail);
            cardService.save(detail);
        });
        return detail;
    }

    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    public void delete(@PathVariable Long id) {
        cardService.delete(id);
    }


    @GetMapping("sandbox")
    @ResponseStatus(NO_CONTENT)
    public void sandbox() {
        Project project = new Project("DEMO");
        Card a1 = new Card("A1"),
                t1 = new Card("T1"),
                f1 = new Card("F1"),
                a2 = new Card("A2"),
                t2 = new Card("T2"),
                t3 = new Card("T3"),
                f2 = new Card("F2"),
                f3 = new Card("F3");
        project.setDetail(a1);
        a1.setNext(a2);
        a1.setDetail(t1);
        t1.setNext(t2);
        a2.setDetail(t3);
        t1.setDetail(f1);
        f1.setNext(f2);
        f2.setNext(f3);

        Release r1 = new Release("r1"),
                r2 = new Release("r2"),
                r3 = new Release("r3");
        project.addRelease(r1);
        project.addRelease(r2);
        project.addRelease(r3);
        projectService.save(project);
    }

    @PostMapping("{id}/next")
    @ResponseBody
    public Card next(@PathVariable Long id, @RequestBody Card next) {
        Optional<Card> prev = cardService.findById(id);
        prev.ifPresent(card -> {
            next.setNext(card.getNext());
            card.setNext(next);
            cardService.save(next);
        });
        return next;
    }

    @PostMapping("{id}/move")
    @ResponseStatus(NO_CONTENT)
    public void move(@PathVariable Long id, @RequestBody MoveOptions options) {
        cardService.move(id, options);
    }

    @GetMapping("{id}")
    @ResponseBody
    Card get(@PathVariable Long id) {
        return cardService.findById(id).orElse(null);
    }

}
