package com.components.finalWork.repository.model;

import com.components.utils.repository.model.DbModel;


public class FinalWorkDb extends DbModel {

    private Long id;
    private String title;
    private String annotation;
    private String status;
    private int PromotorReviewId;
    private int ReviewerReviewId;
    private int ReviewerId;
    private int PromotorId;


    @Override
    public Long getId() {
        return id;
    }

    @Override
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

    public int getPromotorReviewId() {
        return PromotorReviewId;
    }

    public void setPromotorReviewId(int promotorReviewId) {
        PromotorReviewId = promotorReviewId;
    }

    public int getReviewerReviewId() {
        return ReviewerReviewId;
    }

    public void setReviewerReviewId(int reviewerReviewId) {
        ReviewerReviewId = reviewerReviewId;
    }

    public int getReviewerId() {
        return ReviewerId;
    }

    public void setReviewerId(int reviewerId) {
        ReviewerId = reviewerId;
    }

    public int getPromotorId() {
        return PromotorId;
    }

    public void setPromotorId(int promotorId) {
        PromotorId = promotorId;
    }
}
