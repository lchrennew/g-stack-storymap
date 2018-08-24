package chun.li.GStack.StoryMap.api.controllers;

import chun.li.GStack.StoryMap.api.domain.Criterion;
import chun.li.GStack.StoryMap.api.services.CriterionService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("criteria")
public class CriterionController {

    private final CriterionService criterionService;

    public CriterionController(CriterionService criterionService) {
        this.criterionService = criterionService;
    }

    @GetMapping("of/card/{card}")
    @ResponseBody
    public Iterable<Criterion> findAllByCard(@PathVariable Long card) {
        return criterionService.findAllByCard(card);
    }


    @PostMapping("of/card/{card}")
    @ResponseBody
    public Criterion add(@PathVariable Long card,
                         @RequestBody Criterion criterion) {
        return criterionService.addToCard(card, criterion);
    }

    @PutMapping("{id}")
    @ResponseBody
    public Criterion update(@PathVariable Long id,
                            @RequestBody Criterion criterion) {
        criterion.setId(id);
        return criterionService.save(criterion);
    }

}
