package com.components.review.model;

public class Review {

    private Long id;
    private String evaluation;
    private String description;
    private Long finalWorkId;
    private Long reviewerId;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getFinalWorkId() {
        return finalWorkId;
    }

    public void setFinalWorkId(Long finalWorkId) {
        this.finalWorkId = finalWorkId;
    }

    public Long getReviewerId() {
        return reviewerId;
    }

    public void setReviewerId(Long reviewerId) {
        this.reviewerId = reviewerId;
    }
}
