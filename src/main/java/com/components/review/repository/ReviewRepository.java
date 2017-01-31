package com.components.review.repository;

import com.components.review.repository.model.ReviewDB;
import com.components.utils.repository.BaseRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class ReviewRepository extends BaseRepository<ReviewDB> {

    @Autowired
    private JdbcTemplate template;

    private static final RowMapper<ReviewDB> ROW_MAPPER = (rs, rowNum) -> {
        ReviewDB db = new ReviewDB();
        db.setId(rs.getLong("review_id"));
        db.setEvaluation(rs.getString("evaluation"));
        db.setDescription(rs.getString("description"));
        db.setFinalWorkId(rs.getLong("final_work_id"));
        db.setReviewerId(rs.getLong("reviewer_id"));
        return db;
    };

    private static final RowUnmapper<ReviewDB> ROW_UNMAPPER = reviewDB -> mapOf(
            "review_id", reviewDB.getId(),
            "evaluation", reviewDB.getEvaluation(),
            "description", reviewDB.getDescription(),
            "final_work_id", reviewDB.getFinalWorkId(),
            "reviewer_id", reviewDB.getReviewerId()
    );

    public ReviewRepository() {
        super(ROW_MAPPER, ROW_UNMAPPER, "reviews", "review_id");
    }

}
