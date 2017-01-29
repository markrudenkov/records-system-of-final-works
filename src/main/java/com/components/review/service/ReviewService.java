package com.components.review.service;


import com.components.final_work.model.FinalWork;
import com.components.final_work.repository.FinalWorkRepository;
import com.components.final_work.repository.model.FinalWorkDb;
import com.components.review.model.Review;
import com.components.review.repository.ReviewRepository;
import com.components.review.repository.model.ReviewDB;
import com.components.utils.exception.BusinessException;
import com.components.utils.exception.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository repository;

    @Autowired
    FinalWorkRepository finalWorkRepository;



    @Transactional
    public Review createReview(Review review) throws ValidationException {
        ReviewDB reviewDB = repository.create(mapToReviewDb(review));
        FinalWorkDb finalWorkDb = finalWorkRepository.findOne(review.getFinalWorkId());
        if(finalWorkDb.getPromotorId() == review.getReviewerId()){
                finalWorkRepository.updatePromotorReviewID(reviewDB.getId(),finalWorkDb.getId());
        }else if(finalWorkDb.getReviewerId() == review.getReviewerId()){
                finalWorkRepository.updateReviewerReviewID(reviewDB.getId(),finalWorkDb.getId());
        }else{
            throw new BusinessException("Reviev alredy exists or revier id is incorrect");
        }

        return mapToReview(reviewDB);
    }

    private static Review mapToReview(ReviewDB db) {
        Review api = new Review();
        api.setId(db.getId());
        api.setEvaluation(db.getEvaluation());
        api.setDescription(db.getDescription());
        api.setFinalWorkId(db.getFinalWorkId());
        api.setReviewerId(db.getReviewerId());
        return api;
    }

    private static ReviewDB mapToReviewDb(Long id, Review api) {
        ReviewDB db = new ReviewDB();
        db.setId(id);
        db.setReviewerId(api.getReviewerId());
        db.setFinalWorkId(api.getFinalWorkId());
        db.setDescription(api.getDescription());
        db.setEvaluation(api.getEvaluation());
        return db;
    }

    private static ReviewDB mapToReviewDb(Review api) {
        return mapToReviewDb(api.getId(), api);
    }


}
