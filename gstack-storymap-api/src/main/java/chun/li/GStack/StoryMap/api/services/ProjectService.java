package chun.li.GStack.StoryMap.api.services;

import chun.li.GStack.StoryMap.api.domain.Card;
import chun.li.GStack.StoryMap.api.domain.Project;
import chun.li.GStack.StoryMap.api.domain.Release;
import chun.li.GStack.StoryMap.api.repositories.ProjectRepository;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Project save(Project project) {
        return repository.save(project);
    }

    public Iterable<Project> getAll() {
        return repository.findAll();
    }

    public Optional<Project> findById(Long id) {
        return repository.findById(id, 1);
    }

    @JsonIgnoreProperties("description")
    public Iterable<Card> findAllCards(Long project) {
        return repository.findAllCards(project).getDetails();
    }

    public Iterable<Release> findAllReleases(Long project) {
        return repository.findAllReleases(project).getReleases();
    }
}
