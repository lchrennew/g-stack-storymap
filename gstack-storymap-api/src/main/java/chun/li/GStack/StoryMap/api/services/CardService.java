package chun.li.GStack.StoryMap.api.services;

import chun.li.GStack.StoryMap.api.MoveOptions;
import chun.li.GStack.StoryMap.api.domain.Card;
import chun.li.GStack.StoryMap.api.domain.Release;
import chun.li.GStack.StoryMap.api.repositories.CardRepository;
import chun.li.GStack.StoryMap.api.repositories.ReleaseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;

import static java.util.Arrays.asList;
import static org.apache.calcite.linq4j.Linq4j.asEnumerable;

@Service
public class CardService {

    private final CardRepository repository;
    private final ReleaseRepository releaseRepository;

    public CardService(CardRepository repository, ReleaseRepository releaseRepository) {
        this.repository = repository;
        this.releaseRepository = releaseRepository;
    }

    public Card save(Card card) {
        return repository.save(card);
    }

    public Iterable<Card> save(Iterable<Card> cards, int depth) {
        return repository.save(cards, depth);
    }

    public Optional<Card> findById(Long id) {
        return repository.findById(id);
    }

    public Collection<Card> findAllByIdAndRelease(Long id, Long release) {
        return repository.findAllByIdAndRelease(id, release);
    }

    @Transactional
    public void move(Long id, MoveOptions options) {
        Map<Long, Card> cards =
                asEnumerable(
                        repository.findAllById(
                                asList(id, options.getId()), 2)
                ).toMap(Card::getId);
        Card card = cards.get(id),
                target = cards.get(options.getId());
        if (card != null && target != null) {
            Card original;
            if (card.hasPrev()) { // 不是第一个
                original = card.getPrev();
                original.setNext(card.getNext());
            } else if (card.hasGeneral()) { // 不是root
                original = card.getGeneral();
                original.setDetail(card.getNext());
            } else if (card.hasProject() && card.hasNext()) { // project root with next
                original = card.getNext();
                original.setProject(card.getProject());
            } else if (card.planned()) { // release without next
                original = card.getPlanFor();
                original.setPlan(card.getRelease(), card.getNext());
            } else return;

            switch (options.getDirection()) {
                case Next:
                    card.setNext(target.getNext());
                    target.setNext(card);
                    break;
                case Detail:
                    card.setNext(target.getDetail());
                    target.setDetail(card);
                    break;
                case Root: // target->root
                    card.setProject(target.getProject());
                    card.setNext(target);
                    break;
                case Plan:
                    if (card.hasDetail() || !target.withDepth(2))
                        return;
                    Card oldPlan = target.getPlan(options.getRelease());
                    Release release = oldPlan == null
                            ? releaseRepository.findById(options.getRelease()).orElse(null)
                            : oldPlan.getRelease();
                    target.setPlan(release, card);
                    card.setNext(oldPlan);
                    break;
            }
            save(target);
            save(original);
        }
    }

    @Transactional
    public Card plan(Long id, Long release, Card plan) {
        plan = repository.save(plan);
        Card oldPlan = repository.plan(id, release, plan.getId());
        if (oldPlan != null) {
            plan.setNext(oldPlan);
            repository.save(oldPlan);
        }
        return plan;
    }

    @Transactional
    public void delete(Long id) {
        repository.findById(id).ifPresent(card -> {
            Card next = card.getNext();
            if (next != null) {
                if (card.hasProject())
                    card.getProject().setDetail(next);
                else if (card.planned())
                    card.getPlanFor().setPlan(card.getRelease(), next);
                else if (card.hasPrev())
                    card.getPrev().setNext(next);

                repository.save(next);
            }
            repository.deleteById(id);
        });
    }
}
