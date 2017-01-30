package com.components.defence.model;

import org.joda.time.DateTime;

public class Defence {

    private Long id;
    private String evaluation;
    private DateTime date;
    private Long finalWorkId;
    private Long promotorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEvaluation() {
        return evaluation;
    }

    public void setEvaluation(String evaluation) {
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

    public Long getPromotorId() {
        return promotorId;
    }

    public void setPromotorId(Long promotorId) {
        this.promotorId = promotorId;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", evaluation='" + evaluation + '\'' +
                ", date=" + date +
                ", finalWorkId=" + finalWorkId +
                ", promotorId=" + promotorId +
                '}';
    }
}
