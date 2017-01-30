package com.components.defence.service;

import com.components.defence.model.Defence;
import com.components.defence.repository.model.DefenceDb;
import com.components.final_work.model.FinalWork;
import org.springframework.stereotype.Service;

import java.awt.*;

@Service
public class DefenceService {




    public Defence createDefence(Defence defence) {

        return null;
    }

    private  static Defence mapToDefence(DefenceDb db){
        Defence api = new Defence();
        api.setId(db.getId());
        api.setDate(db.getDate());
        api.setFinalWorkId(db.getFinalWorkId());
        api.setEvaluation(db.getEvaluation());
        api.setPromotorId(db.getPromotorId());
        return api;
    }
    private static DefenceDb mapToDefenceDb(Long id, Defence api){
        DefenceDb db = new DefenceDb();
        db.setId(id);
        db.setDate(api.getDate());
        db.setFinalWorkId(api.getFinalWorkId());
        db.setEvaluation(api.getEvaluation());
        db.setEvaluation(api.getEvaluation());
        db.setPromotorId(api.getPromotorId());
        return db;
    }

    private static DefenceDb mapToDefenceDb(Defence api){return mapToDefenceDb(api.getId(),api);}

}
