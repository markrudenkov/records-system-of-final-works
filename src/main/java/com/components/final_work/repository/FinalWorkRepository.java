package com.components.final_work.repository;

import com.components.final_work.repository.model.FinalWorkDb;
import com.components.utils.repository.BaseRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FinalWorkRepository extends BaseRepository<FinalWorkDb> {

    public static final String UPDATE_STATUS_BY_ID = "UPDATE final_works  SET status = ? WHERE final_work_id = ?";
    public static final String SELECT_CONFIRMED_FINAL_WORKS = "SELECT * FROM final_works WHERE status = 'CONFIRMED'";
    public static final String UPDATE_REVIEW_ID = "UPDATE final_works  SET status = ? WHERE final_work_id = ?";

    @Autowired
    private JdbcTemplate template;

    private static final RowMapper<FinalWorkDb> ROW_MAPPER = (rs, rowNum) -> {
        FinalWorkDb db = new FinalWorkDb();
        db.setId(rs.getLong("final_work_id"));
        db.setTitle(rs.getString("title"));
        db.setAnnotation(rs.getString("annotation"));
        db.setStatus(rs.getString("status"));
        db.setPromotorReviewId(rs.getLong("promotor_review_id"));
        db.setReviewerReviewId(rs.getLong("reviewer_review_id"));
        db.setReviewerId(rs.getLong("reviewer_id"));
        db.setPromotorId(rs.getLong("promotor_id"));
        return db;
    };

    private static final RowUnmapper<FinalWorkDb> ROW_UNMAPPER = finalWorkDb -> mapOf(
            "final_work_id", finalWorkDb.getId(),
            "title", finalWorkDb.getTitle(),
            "annotation", finalWorkDb.getAnnotation(),
            "status", finalWorkDb.getStatus(),
            "promotor_review_id", finalWorkDb.getPromotorReviewId(),
            "reviewer_review_id", finalWorkDb.getReviewerReviewId(),
            "reviewer_id", finalWorkDb.getReviewerId(),
            "promotor_id", finalWorkDb.getPromotorId()
    );

    public FinalWorkRepository() {
        super(ROW_MAPPER, ROW_UNMAPPER, "final_works", "final_work_id");
    }

    public void updateFinalWorkStatus(Long id, String status){
        template.update(UPDATE_STATUS_BY_ID,new Object[]{status,id});
    }

    public List<FinalWorkDb> getAllConfirmedFinalWorks() {
        List<FinalWorkDb> finalWorkDbs = template.query(SELECT_CONFIRMED_FINAL_WORKS, ROW_MAPPER);
        return  finalWorkDbs;
    }
}
