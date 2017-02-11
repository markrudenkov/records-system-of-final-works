package com.components.defence.service;

import com.components.defence.model.Defence;
import com.components.defence.repository.DefenceRepository;
import com.components.defence.repository.model.DefenceDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;

@Service
public class DefenceService {

    @Autowired
    DefenceRepository defenceRepository;

    public Defence createDefence(Defence defence) {
        DefenceDb defenceDb = defenceRepository.create(mapToDefenceDb(defence));
        return mapToDefence(defenceDb);
    }

    public static Defence mapToDefence(DefenceDb db) {
        Defence api = new Defence();
        api.setId(db.getId());
        api.setDate(db.getDate());
        api.setFinalWorkId(db.getFinalWorkId());
        api.setEvaluation(db.getEvaluation());
        api.setChairmanId(db.getChairmanId());
        return api;
    }

    public static DefenceDb mapToDefenceDb(Long id, Defence api) {
        DefenceDb db = new DefenceDb();
        db.setId(id);
        db.setDate(api.getDate());
        db.setFinalWorkId(api.getFinalWorkId());
        db.setEvaluation(api.getEvaluation());
        db.setEvaluation(api.getEvaluation());
        db.setChairmanId(api.getChairmanId());
        return db;
    }

    private static DefenceDb mapToDefenceDb(Defence api) {
        return mapToDefenceDb(api.getId(), api);
    }

    public String updateDefenceEvluation(Defence defence) {
        defenceRepository.updateDefenceEvluation(defence.getId(), defence.getEvaluation());
        return "{'message' : 'defence evaluation updated'}";
    }
}
