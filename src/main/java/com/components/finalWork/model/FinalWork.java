package com.components.finalWork.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FinalWork {

    private Long id;
    private String title;
    private String annotation;
    private String status;
    private Long PromotorReviewId;
    private Long ReviewerReviewId;
    private Long ReviewerId;
    private Long PromotorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAnnotation() {
        return annotation;
    }

    public void setAnnotation(String annotation) {
        this.annotation = annotation;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getPromotorReviewId() {
        return PromotorReviewId;
    }

    public void setPromotorReviewId(Long promotorReviewId) {
        PromotorReviewId = promotorReviewId;
    }

    public Long getReviewerReviewId() {
        return ReviewerReviewId;
    }

    public void setReviewerReviewId(Long reviewerReviewId) {
        ReviewerReviewId = reviewerReviewId;
    }

    public Long getReviewerId() {
        return ReviewerId;
    }

    public void setReviewerId(Long reviewerId) {
        ReviewerId = reviewerId;
    }

    public Long getPromotorId() {
        return PromotorId;
    }

    public void setPromotorId(Long promotorId) {
        PromotorId = promotorId;
    }
}
