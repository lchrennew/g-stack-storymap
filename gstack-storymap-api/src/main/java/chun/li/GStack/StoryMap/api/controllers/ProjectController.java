package chun.li.GStack.StoryMap.api.controllers;

import chun.li.GStack.StoryMap.api.domain.Card;
import chun.li.GStack.StoryMap.api.domain.Project;
import chun.li.GStack.StoryMap.api.domain.Release;
import chun.li.GStack.StoryMap.api.services.ProjectService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("")
    @ResponseBody
    public Iterable<Project> getAll() {
        return projectService.getAll();
    }

    @GetMapping("{id}")
    @ResponseBody
    public Optional<Project> get(@PathVariable Long id) {
        return projectService.findById(id);
    }

    @PostMapping("")
    @ResponseBody
    public Project create(@RequestBody Project project) {
        return projectService.save(project);
    }

    @GetMapping("{id}/cards")
    @ResponseBody
    public Iterable<Card> findAllCards(@PathVariable Long id) {
        return projectService.findAllCards(id);
    }

    @GetMapping("{id}/releases")
    @ResponseBody
    public Iterable<Release> findAllReleases(@PathVariable Long id) {
        return projectService.findAllReleases(id);
    }
}
