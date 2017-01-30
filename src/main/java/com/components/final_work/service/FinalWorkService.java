package com.components.final_work.service;

import com.components.academic.model.Academic;
import com.components.academic.repository.AcademicRepository;
import com.components.academic.repository.model.AcademicDb;
import com.components.defence.model.Defence;
import com.components.defence.repository.DefenceRepository;
import com.components.defence.repository.model.DefenceDb;
import com.components.defence.service.DefenceService;
import com.components.final_work.model.FinalWork;
import com.components.final_work.model.FinalWorkStatus;
import com.components.final_work.repository.FinalWorkRepository;
import com.components.final_work.repository.model.FinalWorkDb;
import com.components.student.repository.StudentRepository;
import com.components.utils.exception.BusinessException;
import com.components.utils.exception.ValidationException;

import org.apache.commons.lang3.EnumUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Service
public class FinalWorkService {

    @Autowired
    FinalWorkRepository repository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    AcademicRepository academicRepository;

    @Autowired
    DefenceService defenceService;

    @Autowired
    DefenceRepository defenceRepository;




    @Transactional
    public FinalWork updateFinalWorkStatusByStudent(Long studentId, FinalWork finalWork) {
        FinalWorkDb finalWorkDb = new FinalWorkDb();
        if (EnumUtils.isValidEnum(FinalWorkStatus.StudentTrigeredStatuses.class, finalWork.getStatus())) {
            repository.updateFinalWorkStatus(finalWork.getId(), finalWork.getStatus().toString());
            if(FinalWorkStatus.StudentTrigeredStatuses.RESERVED.toString().equals(finalWork.getStatus())){
                studentRepository.updateStudentFinalWorkID(studentId, finalWork.getId());
            }else{
                studentRepository.updateStudentFinalWorkID(studentId, null);
            }
            finalWorkDb = repository.findOne(finalWork.getId());
        } else {
            throw new BusinessException("Incorrect status of final work");
        }
        return mapToFinalWork(finalWorkDb);
    }

    @Transactional(readOnly = true)
    public String getFinalWorksAndDefencesOfAcademic(Long id) {
        List<Defence> defences = defenceRepository.getDefencesByPromotorId(id).stream().map(DefenceService::mapToDefence).collect(Collectors.toList());
        List<JSONObject> defenceRelatedFinalWorks = new ArrayList<>();
        for (Defence defence: defences) {
            defenceRelatedFinalWorks.add(mapToJSONObject(defence));
        }
        List<JSONObject> finalWorks = repository.getFinalWorksRelatedToAcademic(id).stream().map(FinalWorkService::mapFinalWorkDbToJSONObject).collect(Collectors.toList());
        defenceRelatedFinalWorks.addAll(finalWorks);

        return defenceRelatedFinalWorks.toString();
    }


    private static JSONObject mapFinalWorkDbToJSONObject(FinalWorkDb db){
        return new JSONObject(db);
    }


    @Transactional(readOnly = true)
    private  JSONObject mapToJSONObject (Defence defence){
        FinalWork finalWorkDb = mapToFinalWork(repository.findOne(defence.getFinalWorkId()));
        JSONObject jsonObject = new JSONObject(finalWorkDb);
        jsonObject.put("defence",defence);
        return jsonObject;
    }


    @Transactional(readOnly = true)
    public String getFinalWorkOfStudent(Long finalworkId) {
        FinalWorkDb finalWork = repository.findOne(finalworkId);
        AcademicDb promotor = academicRepository.findOne(finalWork.getPromotorId());
        AcademicDb reviewer = academicRepository.findOne(finalWork.getReviewerId());
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("finalWork", new JSONObject(finalWork));
        jsonObject.put("promotor",new JSONObject(promotor));
        jsonObject.put("reviewer",new JSONObject(reviewer));
        return jsonObject.toString();
    }

    @Transactional(readOnly = true)
    public List<FinalWork> getPromotorFinalWorks(Long promotorId) {
        return repository.getPromotorFinalWorks(promotorId).stream().map(FinalWorkService::mapToFinalWork).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FinalWork> getFinalWorksToReview(Long reviewerId) {
        return repository.getFinalWorksForReview(reviewerId).stream().map(FinalWorkService::mapToFinalWork).collect(Collectors.toList());
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
