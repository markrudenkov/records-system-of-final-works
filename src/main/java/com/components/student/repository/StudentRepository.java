package com.components.student.repository;


import com.components.student.repository.model.StudentDb;
import com.components.utils.repository.BaseRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentRepository extends BaseRepository<StudentDb> {

    public static final String SELECT_BY_USERNAME = "SELECT * FROM students where username = ?";
    public static final String UPDATE_FINALWORK_ID = "UPDATE students  SET final_work_id = ? WHERE student_id = ?";

    @Autowired
    private JdbcTemplate template;

    private static final RowMapper<StudentDb> ROW_MAPPER = (rs, rowNum) -> {
        StudentDb student = new StudentDb();
        student.setId(rs.getLong("student_id"));
        student.setUsername(rs.getString("username"));
        student.setPassword(rs.getString("password"));
        student.setName(rs.getString("name"));
        student.setSurname(rs.getString("surname"));
        student.setFinalWorkID((int) rs.getLong("final_work_id"));
        return student;
    };

    private static final RowUnmapper<StudentDb> ROW_UNMAPPER = studentDb -> mapOf(
            "student_id", studentDb.getId(),
            "username", studentDb.getUsername(),
            "password", studentDb.getPassword(),
            "name", studentDb.getName(),
            "surname", studentDb.getSurname()

    );

    public StudentRepository () {
        super(ROW_MAPPER, ROW_UNMAPPER, "students", "student_id");
    }

    public StudentDb getStudentsByUsername(String username) {
        List<StudentDb> students = template.query(SELECT_BY_USERNAME, new Object[]{username}, ROW_MAPPER);
        if (students.isEmpty()) {
            return null;
        }
        return students.get(0);
    }

    public void updateStudentFinalWorkID(Long studentID, Long finalWorkId) {
        template.update(UPDATE_FINALWORK_ID,new Object[]{finalWorkId,studentID});
    }
}
