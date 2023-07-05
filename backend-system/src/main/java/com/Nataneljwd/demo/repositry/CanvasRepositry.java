package com.Nataneljwd.demo.repositry;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.Nataneljwd.demo.Models.Canvas;

@Repository
public interface CanvasRepositry extends MongoRepository<Canvas, String> {

    public Canvas getCanvasById(String id);

    /**
     * @param owner
     * @param pageable
     * @return list of {@link Canvas} id's by owner name
     */
    @Query(value = "{'owner': ?0}", fields = "{'_id': 0}")
    public Page<String> getCanvasesByOwner(String owner, Pageable pageable);

    public void deleteCanvasById(String id);

    // @Query(fields = "{'_id': 0}", value = "{'owner': ?0}")
    // public Page<String> getCanvasesByOwnerId(Integer ownerId);
}
