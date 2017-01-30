package com.components.defence.repository;

import com.components.defence.repository.model.DefenceDb;
import com.components.utils.repository.BaseRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.Timestamp;

public class DefenceRepository extends BaseRepository<DefenceDb> {

    @Autowired
    private JdbcTemplate template;

    private static final RowMapper<DefenceDb> ROW_MAPPER = (rs, rowNum) -> {
        DefenceDb db = new DefenceDb();
        db.setId(rs.getLong("defense_id"));
        db.setEvaluation(rs.getString("evaluation"));
        db.setDate(new DateTime(rs.getDate("date")));
        db.setFinalWorkId(rs.getLong("final_work_id"));
        db.setPromotorId(rs.getLong("promotor_id"));
        return db;
    };

    private static  final RowUnmapper<DefenceDb> ROW_UNMAPPER = defenceDb -> mapOf(
            "defense_id", defenceDb.getId(),
            "evaluation", defenceDb.getEvaluation(),
            "date", new Timestamp(defenceDb.getDate().getMillis()),
            "final_work_id", defenceDb.getFinalWorkId(),
            "promotor_id", defenceDb.getPromotorId()
    );


    public DefenceRepository() {
        super(ROW_MAPPER, ROW_UNMAPPER, "work_defenses", "defense_id");
    }
}
