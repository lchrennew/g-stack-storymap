package chun.li.GStack.StoryMap.api.services;

import chun.li.GStack.StoryMap.api.domain.Criterion;
import chun.li.GStack.StoryMap.api.repositories.CriterionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CriterionService {
    private final CriterionRepository repository;

    public CriterionService(CriterionRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public Iterable<Criterion> findAllByCard(Long card) {
        return repository.findAllByCard(card);
    }

    @Transactional
    public Criterion addToCard(Long card, Criterion criterion) {
        criterion = repository.save(criterion);
        repository.attachToCard(criterion.getId(), card);
        return criterion;
    }

    @Transactional
    public Criterion save(Criterion criterion) {
        return repository.save(criterion, 0);
    }
}
