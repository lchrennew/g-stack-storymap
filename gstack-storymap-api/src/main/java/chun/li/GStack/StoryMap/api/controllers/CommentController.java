package chun.li.GStack.StoryMap.api.controllers;

import chun.li.GStack.StoryMap.api.domain.Comment;
import chun.li.GStack.StoryMap.api.services.CommentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Controller
@RequestMapping("comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("target/{target}")
    @ResponseBody
    public Iterable<Comment> findCommentsByTarget(@PathVariable Long target) {
        return commentService.findCommentsByTarget(target);
    }

    @PostMapping("target/{target}")
    @ResponseBody
    public Comment appendToTarget(@RequestBody Comment comment, @PathVariable Long target, Principal user) {
        return commentService.post(comment, target, user.getName());
    }
}
