package com.components.academic.repository;

import com.components.academic.repository.model.AcademicDb;
import com.components.utils.repository.BaseRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AcademicRepository extends BaseRepository<AcademicDb> {

    public static final String SELECT_BY_USERNAME = "SELECT * FROM teachers where username = ?";

    @Autowired
    private JdbcTemplate template;

    private static final RowMapper<AcademicDb> ROW_MAPPER = (rs, rowNum) -> {
        AcademicDb academic = new AcademicDb();
        academic.setId(rs.getLong("id"));
        academic.setUsername(rs.getString("username"));
        academic.setPassword(rs.getString("password"));
        academic.setName(rs.getString("name"));
        academic.setSurname(rs.getString("surname"));
        academic.setTitle(rs.getString("academic_title"));
        return academic;
    };

    private static final RowUnmapper<AcademicDb> ROW_UNMAPPER = academicDb -> mapOf(
            "id", academicDb.getId(),
            "username", academicDb.getUsername(),
            "password", academicDb.getPassword(),
            "name", academicDb.getName(),
            "surname", academicDb.getSurname(),
            "academic_title", academicDb.getTitle()
    );

    public AcademicRepository () {
        super(ROW_MAPPER, ROW_UNMAPPER, "teachers", "teacher_id");
    }

    public AcademicDb getUserByUsername(String username) {
        List<AcademicDb> users = template.query(SELECT_BY_USERNAME, new Object[]{username}, ROW_MAPPER);
        if (users.isEmpty()) {
            return null;
        }
        return users.get(0);
    }
}
