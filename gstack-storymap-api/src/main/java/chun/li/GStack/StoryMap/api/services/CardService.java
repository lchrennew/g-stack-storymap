package chun.li.GStack.StoryMap.api.services;

import chun.li.GStack.StoryMap.api.CardMoveOptions;
import chun.li.GStack.StoryMap.api.domain.Card;
import chun.li.GStack.StoryMap.api.repositories.CardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CardService {

    private final CardRepository repository;

    public CardService(CardRepository repository) {
        this.repository = repository;
    }

    public Card save(Card card) {
        return repository.save(card, 0);
    }

    public Optional<Card> findById(Long id) {
        return repository.findById(id, 0);
    }

    @Transactional
    public void move(Long id, CardMoveOptions options) {
        switch (options.getDirection()) {
            case Next:
                repository.next(id, options.getId());
                break;
            case Detail:
                repository.detail(id, options.getId());
                break;
            case Root:
                repository.root(id, options.getId());
                break;
            case Plan:
                repository.plan(id, options.getId(), options.getRelease());
                break;
        }
    }


    /**
     * @param id card to be inserted's id
     * @param to card after which to insert's id
     */
    @Transactional
    public void next(Long id, Long to) {
        repository.next(id, to);
    }

    @Transactional
    public Card createNext(Card next, Long to) {
        next = repository.save(next);
        repository.next(next.getId(), to);
        return next;
    }

    @Transactional
    public Card createRoot(Card root, Long to) {
        root = repository.save(root);
        repository.root(root.getId(), to);
        return root;
    }

    @Transactional
    public Card createDetail(Card detail, Long to) {
        detail = repository.save(detail);
        repository.detail(detail.getId(), to);
        return detail;
    }

    /**
     * @param id      card's id
     * @param to      card to be planned for's id
     * @param release release to be planned in's id
     */
    @Transactional
    public void plan(Long id, Long to, Long release) {
        repository.plan(id, to, release);
    }

    /**
     * @param plan    card to be planned
     * @param to      card to be planned for's id
     * @param release release to be planned in's id
     * @return card planned
     */
    @Transactional
    public Card createPlan(Card plan, Long to, Long release) {
        plan = repository.save(plan);
        Long id = plan.getId();
        plan(id, to, release);
        return plan;
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteSubs(id);
        repository.delete(id);
    }


    @Transactional
    public void updateTitle(Long id, String title) {
        repository.updateTitle(id, title);
    }
}
