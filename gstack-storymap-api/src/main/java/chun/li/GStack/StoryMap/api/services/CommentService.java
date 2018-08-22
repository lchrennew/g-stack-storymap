package chun.li.GStack.StoryMap.api.services;

import chun.li.GStack.StoryMap.api.domain.Comment;
import chun.li.GStack.StoryMap.api.repositories.CommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Transactional(readOnly = true)
    public Iterable<Comment> findCommentsByTarget(Long target) {
        return commentRepository.findAllByTarget(target);
    }

    @Transactional
    public Comment post(Comment comment, Long target, String author) {
        comment = commentRepository.save(comment);
        comment = commentRepository.setAuthor(comment.getId(), author);
        commentRepository.appendToTarget(comment.getId(), target);
        return comment;
    }
}
