package com.components.finalWork.repository;

import com.components.academic.repository.model.AcademicDb;
import com.components.finalWork.repository.model.FinalWorkDb;
import com.components.utils.repository.BaseRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FinalWorkRepository extends BaseRepository<FinalWorkDb> {


    public static final String SELECT_BY_USERNAME = "SELECT * FROM final_works where username = ?";

    @Autowired
    private JdbcTemplate template;

    private static final RowMapper<FinalWorkDb> ROW_MAPPER = (rs, rowNum) -> {
        FinalWorkDb db = new FinalWorkDb();
        db.setId(rs.getLong("final_work_id"));
        db.setTitle(rs.getString("title"));
        db.setAnnotation(rs.getString("annotation"));
        db.setPromotorReviewId(rs.getInt("promotor_review_id"));
        db.setReviewerReviewId(rs.getInt("reviewer_review_id"));
        db.setReviewerId(rs.getInt("reviewer_id"));
        db.setPromotorId(rs.getInt("promotor_id"));
        return db;
    };

    private static final RowUnmapper<FinalWorkDb> ROW_UNMAPPER = finalWorkDb -> mapOf(
            "final_work_id", finalWorkDb.getId(),
            "title", finalWorkDb.getTitle(),
            "annotation", finalWorkDb.getAnnotation(),
            "promotor_review_id", finalWorkDb.getPromotorReviewId(),
            "reviewer_review_id", finalWorkDb.getReviewerReviewId(),
            "reviewer_id", finalWorkDb.getReviewerId(),
            "promotor_id", finalWorkDb.getPromotorId()
    );

    public FinalWorkRepository() {
        super(ROW_MAPPER, ROW_UNMAPPER, "final_works", "final_work_id");
    }

    public FinalWorkDb getUserByUsername(String username) {
        List<FinalWorkDb> users = template.query(SELECT_BY_USERNAME, new Object[]{username}, ROW_MAPPER);
        if (users.isEmpty()) {
            return null;
        }
        return users.get(0);
    }
}