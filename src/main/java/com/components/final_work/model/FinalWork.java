package com.components.final_work.model;


public class FinalWork {

    private Long id;
    private String title;
    private String annotation;
    private String status;
    private Long promotorReviewId;
    private Long reviewerReviewId;
    private Long reviewerId;
    private Long promotorId;
    private String filePath;

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
        return promotorReviewId;
    }

    public void setPromotorReviewId(Long promotorReviewId) {
        this.promotorReviewId = promotorReviewId;
    }

    public Long getReviewerReviewId() {
        return reviewerReviewId;
    }

    public void setReviewerReviewId(Long reviewerReviewId) {
        this.reviewerReviewId = reviewerReviewId;
    }

    public Long getReviewerId() {
        return reviewerId;
    }

    public void setReviewerId(Long reviewerId) {
        this.reviewerId = reviewerId;
    }

    public Long getPromotorId() {
        return promotorId;
    }

    public void setPromotorId(Long promotorId) {
        this.promotorId = promotorId;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", annotation='" + annotation + '\'' +
                ", status='" + status + '\'' +
                ", promotorReviewId=" + promotorReviewId +
                ", reviewerReviewId=" + reviewerReviewId +
                ", reviewerId=" + reviewerId +
                ", promotorId=" + promotorId +
                ", filePath='" + filePath + '\'' +
                '}';
    }
}
