package chun.li.GStack.StoryMap.api.controllers;

import chun.li.GStack.StoryMap.api.MoveOptions;
import chun.li.GStack.StoryMap.api.domain.Release;
import chun.li.GStack.StoryMap.api.services.ProjectService;
import chun.li.GStack.StoryMap.api.services.ReleaseService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("")
public class ReleaseController {
    private final ReleaseService releaseService;
    private final ProjectService projectService;

    public ReleaseController(ReleaseService releaseService,
                             ProjectService projectService) {
        this.releaseService = releaseService;
        this.projectService = projectService;
    }

//    @PostMapping("projects/{project}/releases")
//    @ResponseBody
//    public Release addRelease(@PathVariable("project") Long projectId, Release release) {
//        projectService.findById(projectId).ifPresent(project -> {
//            project.addRelease(release);
//            releaseService.save(release);
//        });
//        return release;
//    }

    @PostMapping("releases/{id}/next")
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

    @PostMapping("releases/{id}/move")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void move(@PathVariable Long id, @RequestBody MoveOptions options) {
        releaseService.move(id, options);
    }
}
