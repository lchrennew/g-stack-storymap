package chun.li.GStack.StoryMap.api.controllers;

import chun.li.GStack.StoryMap.api.ReleaseMoveOptions;
import chun.li.GStack.StoryMap.api.domain.Release;
import chun.li.GStack.StoryMap.api.services.ProjectService;
import chun.li.GStack.StoryMap.api.services.ReleaseService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.NO_CONTENT;

@Controller
@RequestMapping("releases")
public class ReleaseController {
    private final ReleaseService releaseService;
    private final ProjectService projectService;

    public ReleaseController(ReleaseService releaseService,
                             ProjectService projectService) {
        this.releaseService = releaseService;
        this.projectService = projectService;
    }

    @GetMapping("{id}")
    @ResponseBody
    public Release getById(@PathVariable Long id) {
        return releaseService.findById(id).orElse(null);
    }

    @PutMapping("{id}")
    @ResponseBody
    public Release update(@PathVariable Long id, @RequestBody Release release) {
        release.setId(id);
        return releaseService.save(release);
    }

    @PostMapping("{id}/next")
    @ResponseBody
    public Release addNext(@PathVariable Long id, Release next) {
        releaseService.findById(id).ifPresent(release -> {
            if (release.hasNext()) {
                next.setNext(release.getNext());
            }
            release.setNext(release);
        });
        return releaseService.save(next);
    }

    @PostMapping("project/{project}")
    @ResponseBody
    public Release create(@PathVariable Long project, @RequestBody Release release) {
        release.setId(null);
        release = releaseService.append(project, release);
        return release;
    }

    @PostMapping("{id}/move")
    @ResponseStatus(code = NO_CONTENT)
    public void move(@PathVariable Long id, @RequestBody ReleaseMoveOptions options) {
        releaseService.move(id, options);
    }

    @DeleteMapping("{id}")
    @ResponseBody
    public boolean delete(@PathVariable Long id) {
        return releaseService.deleteById(id);
    }
}
