package com.components.final_work.service;

import com.components.final_work.model.FinalWork;
import com.components.final_work.model.FinalWorkStatus;
import com.components.final_work.repository.FinalWorkRepository;
import com.components.final_work.repository.model.FinalWorkDb;
import com.components.utils.exception.BusinessException;
import com.components.utils.exception.ValidationException;

import org.apache.commons.lang3.EnumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FinalWorkService {

    @Autowired
    FinalWorkRepository repository;

    @Transactional
    public FinalWork getStudentFinalWork(Long id) {
        return mapToFinalWork(repository.findOne(id));
    }

    @Transactional
    public FinalWork updateFinalWorkStatusByStudent(Long id, FinalWork finalWork) {
        FinalWorkDb finalWorkDb = new FinalWorkDb();
        if (EnumUtils.isValidEnum(FinalWorkStatus.StudentTrigeredStatuses.class, finalWork.getStatus())) {
            repository.updateFinalWorkStatus(id, finalWork.getStatus().toString());
            finalWorkDb = repository.findOne(id);
        } else {
            throw new BusinessException("Incorrect status of final work");
        }
        return mapToFinalWork(finalWorkDb);
    }

    @Transactional
    public List<FinalWork> getAllConfirmedFinalWorks() {
        return repository.getAllConfirmedFinalWorks().stream().map(FinalWorkService::mapToFinalWork).collect(Collectors.toList());
    }

    @Transactional
    public FinalWork updateFinalWorkStatus(Long id, FinalWork finalWork) {
        FinalWorkDb finalWorkDb = new FinalWorkDb();
        if (EnumUtils.isValidEnum(FinalWorkStatus.Statuses.class, finalWork.getStatus())) {
            repository.updateFinalWorkStatus(id, finalWork.getStatus().toString());
            finalWorkDb = repository.findOne(id);
        } else {
            throw new BusinessException("Incorrect status of final work");
        }
        return mapToFinalWork(finalWorkDb);
    }

    @Transactional
    public List<FinalWork> getAllFinalWorks() {
        return repository.findAll().stream().map(FinalWorkService::mapToFinalWork).collect(Collectors.toList());
    }

    @Transactional
    public FinalWork createFinalWork(FinalWork finalWork) throws ValidationException {
        finalWork.setStatus(FinalWorkStatus.Statuses.REGISTERED.toString());
        FinalWorkDb db = repository.create(mapToFinalWorkDb(finalWork));
        return mapToFinalWork(db);
    }

    private static FinalWork mapToFinalWork(FinalWorkDb db) {
        FinalWork api = new FinalWork();
        api.setId(db.getId());
        api.setTitle(db.getTitle());
        api.setAnnotation(db.getAnnotation());
        api.setStatus(db.getStatus());
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
        db.setStatus(api.getStatus());
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
