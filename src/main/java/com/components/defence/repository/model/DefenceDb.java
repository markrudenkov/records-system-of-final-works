package com.components.defence.repository.model;

import com.components.utils.repository.model.DbModel;
import org.joda.time.DateTime;

import java.math.BigDecimal;

public class DefenceDb extends DbModel {
    private Long id;
    private BigDecimal evaluation;
    private DateTime date;
    private Long finalWorkId;
    private Long chairmanId;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getEvaluation() {
        return evaluation;
    }

    public void setEvaluation(BigDecimal evaluation) {
        this.evaluation = evaluation;
    }

    public DateTime getDate() {
        return date;
    }

    public void setDate(DateTime date) {
        this.date = date;
    }

    public Long getFinalWorkId() {
        return finalWorkId;
    }

    public void setFinalWorkId(Long finalWorkId) {
        this.finalWorkId = finalWorkId;
    }

    public Long getChairmanId() {
        return chairmanId;
    }

    public void setChairmanId(Long chairmanId) {
        this.chairmanId = chairmanId;
    }
}
