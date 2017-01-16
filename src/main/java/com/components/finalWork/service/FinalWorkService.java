package com.components.finalWork.service;

import com.components.academic.model.Academic;
import com.components.academic.repository.model.AcademicDb;
import com.components.finalWork.model.FinalWork;
import com.components.finalWork.repository.FinalWorkRepository;
import com.components.finalWork.repository.model.FinalWorkDb;
import com.components.utils.exception.ValidationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FinalWorkService {

    FinalWorkRepository repository;

    @Transactional
    public FinalWork createFinalWork (FinalWork finalWork) throws ValidationException {
        FinalWorkDb db = repository.create(mapToFinalWorkDb(finalWork));
        return mapToFinalWork(db);
    }







    private static FinalWork mapToFinalWork(FinalWorkDb db) {
        FinalWork api = new FinalWork();
        api.setId(db.getId());
        api.setTitle(db.getTitle());
        api.setAnnotation(db.getAnnotation());
        api.setPromotorReviewId(db.getPromotorReviewId());
        api.setReviewerReviewId(db.getReviewerReviewId());
        api.setReviewerId(db.getReviewerId());
        api.setPromotorId(db.getPromotorId());

        return api;
    }

    private static FinalWorkDb mapToFinalWorkDb(Long id, FinalWork api) {
        FinalWorkDb db = new FinalWorkDb();
        db.setId(id);
        db.setTitle(api.getTitle());
        db.setAnnotation(api.getAnnotation());
        db.setPromotorReviewId(api.getPromotorReviewId());
        db.setPromotorReviewId(api.getPromotorReviewId());
        db.setReviewerId(api.getReviewerId());
        db.setPromotorId(api.getPromotorId());
        return db;
    }

    private static FinalWorkDb mapToFinalWorkDb(FinalWork api) {
        return mapToFinalWorkDb(api.getId(), api);
    }
}
