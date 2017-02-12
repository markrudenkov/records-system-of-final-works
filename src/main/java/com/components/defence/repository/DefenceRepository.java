package com.components.defence.repository;

import com.components.defence.repository.model.DefenceDb;
import com.components.utils.repository.BaseRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Repository
public class DefenceRepository extends BaseRepository<DefenceDb> {

    public static final String SELECT_DEFENCES_BY_CHAIRMAN_ID = "SELECT * FROM work_defenses WHERE chairman_id = ?";
    private static final String UPDATE_DEFENCE_EVALUATION = "UPDATE work_defenses  SET evaluation = ? WHERE defense_id = ?";
    public static final String SELECT_DEFENCES_BY_FINALWORK_ID = "SELECT * FROM work_defenses WHERE final_work_id = ?";

    @Autowired
    private JdbcTemplate template;

    private static final RowMapper<DefenceDb> ROW_MAPPER = (rs, rowNum) -> {
        DefenceDb db = new DefenceDb();
        db.setId(rs.getLong("defense_id"));
        db.setEvaluation(rs.getBigDecimal("evaluation"));
        db.setDate(new DateTime(rs.getDate("date")));
        db.setFinalWorkId(rs.getLong("final_work_id"));
        db.setChairmanId(rs.getLong("chairman_id"));
        return db;
    };

    private static final RowUnmapper<DefenceDb> ROW_UNMAPPER = defenceDb -> mapOf(
            "defense_id", defenceDb.getId(),
            "evaluation", defenceDb.getEvaluation(),
            "date", new Timestamp(defenceDb.getDate().getMillis()),
            "final_work_id", defenceDb.getFinalWorkId(),
            "chairman_id", defenceDb.getChairmanId()
    );


    public DefenceRepository() {
        super(ROW_MAPPER, ROW_UNMAPPER, "work_defenses", "defense_id");
    }

    public List<DefenceDb> getDefencesByChairmanID(Long chairmanId) {
        List<DefenceDb> defenceDbList = template.query(SELECT_DEFENCES_BY_CHAIRMAN_ID, new Object[]{chairmanId}, ROW_MAPPER);
        return defenceDbList;
    }

    public DefenceDb getDefencesByFinalWorkID(Long finalworkId) {
        List<DefenceDb> defenceDbList = template.query(SELECT_DEFENCES_BY_FINALWORK_ID, new Object[]{finalworkId}, ROW_MAPPER);
        if (defenceDbList.isEmpty()) {
            return null;
        } else {
            return defenceDbList.get(0);
        }
    }

    public void updateDefenceEvluation(Long id, BigDecimal evaluation) {
        template.update(UPDATE_DEFENCE_EVALUATION, new Object[]{evaluation, id});
    }
}
