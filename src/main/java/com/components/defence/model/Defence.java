package com.components.defence.model;

import org.joda.time.DateTime;

import java.math.BigDecimal;

public class Defence {
    private Long id;
    private BigDecimal evaluation;
    private DateTime date;
    private Long finalWorkId;
    private Long chairmanId;

    public Long getId() {
        return id;
    }

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

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", evaluation='" + evaluation + '\'' +
                ", date=" + date +
                ", finalWorkId=" + finalWorkId +
                ", chairmanId=" + chairmanId +
                '}';
    }
}
