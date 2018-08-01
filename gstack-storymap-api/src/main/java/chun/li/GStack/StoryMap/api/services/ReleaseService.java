package chun.li.GStack.StoryMap.api.services;

import chun.li.GStack.StoryMap.api.MoveOptions;
import chun.li.GStack.StoryMap.api.domain.Release;
import chun.li.GStack.StoryMap.api.repositories.ReleaseRepository;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

import static java.util.Arrays.asList;
import static org.apache.calcite.linq4j.Linq4j.asEnumerable;

@Service
public class ReleaseService {
    private final ReleaseRepository repository;

    public ReleaseService(ReleaseRepository repository) {
        this.repository = repository;
    }

    public Release save(Release release) {
        return repository.save(release);
    }

    public Optional<Release> findById(Long id) {
        return repository.findById(id);
    }

    public void move(Long id, MoveOptions options) {
        Map<Long, Release> releases =
                asEnumerable(
                        repository.findAllById(asList(id, options.getId()))
                ).toMap(Release::getId);
        Release release = releases.get(id),
                target = releases.get(options.getId());
        if (release != null && target != null) {
            Release original;
            if (release.hasPrev()) {
                original = release.getPrev();
                original.setNext(release.getNext());
            } else if (release.hasNext()) {
                original = release.getNext();
                original.setProject(release.getProject());
            } else return;

            switch (options.getDirection()) {
                case Next:
                    release.setNext(target.getNext());
                    target.setNext(release);
                    break;
                case Root:
                    release.setProject(target.getProject());
                    release.setNext(target);
                    break;
                default:
                    return;
            }
            repository.save(target);
            repository.save(original);
        }
    }
}
