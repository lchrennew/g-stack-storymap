package chun.li.GStack.StoryMap.api.services;

import chun.li.GStack.StoryMap.api.domain.Comment;
import chun.li.GStack.StoryMap.api.repositories.CommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

import static org.apache.calcite.linq4j.Linq4j.asEnumerable;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Transactional(readOnly = true)
    public Iterable<Comment> findCommentsByTarget(Long target) {
        Comment comment = asEnumerable(
                commentRepository.findAllByTarget(target)
        ).firstOrDefault();
        return comment == null
                ? new ArrayList<>()
                : comment.toList();
    }

    @Transactional
    public Comment post(Comment comment, Long target, String author) {
        comment = commentRepository.save(comment);
        comment = commentRepository.setAuthor(comment.getId(), author);
        commentRepository.appendToTarget(comment.getId(), target);
        return comment;
    }
}
