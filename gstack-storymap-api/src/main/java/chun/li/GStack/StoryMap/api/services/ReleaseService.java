package chun.li.GStack.StoryMap.api.services;

import chun.li.GStack.StoryMap.api.ReleaseMoveOptions;
import chun.li.GStack.StoryMap.api.domain.Release;
import chun.li.GStack.StoryMap.api.repositories.ReleaseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ReleaseService {
    private final ReleaseRepository repository;

    public ReleaseService(ReleaseRepository repository) {
        this.repository = repository;
    }

    public Release save(Release release) {
        return repository.save(release, 0);
    }

    public Optional<Release> findById(Long id) {
        return repository.findById(id, 0);
    }

    @Transactional
    public void move(Long id, ReleaseMoveOptions options) {
        switch (options.getDirection()) {
            case Next:
                repository.moveNext(id);
                break;
            case Previous:
                repository.movePrevious(id);
                break;
        }
    }

    @Transactional
    public boolean deleteById(Long id) {
        if (repository.findByIdWithoutCard(id) != null)
            return false;
        else {
            repository.deleteById(id);
            return true;
        }
    }

    @Transactional
    public Release append(Long project, Release release) {
        release = repository.save(release);
        repository.appendTo(release.getId(), project);
        return release;
    }
}
