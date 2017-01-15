package com.components.student.service;

import com.components.academic.model.Academic;
import com.components.academic.repository.model.AcademicDb;
import com.components.academic.service.AcademicService;
import com.components.student.model.Student;
import com.components.student.repository.StudentRepository;
import com.components.student.repository.model.StudentDb;
import com.components.utils.exception.DataNotFoundException;
import com.components.utils.exception.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {


    private BCryptPasswordEncoder encoder;

    StudentService() {
        encoder = new BCryptPasswordEncoder();
    }

    @Autowired
    StudentRepository repository;

    @Transactional
    public Student createStudent (Student student) throws ValidationException {
        StudentDb userByUsername = getUserDbByUsername(student.getUsername());
        if (userByUsername != null) {
            throw new ValidationException("username", "already exists");
        }
        student.setPassword(encoder.encode(student.getPassword()));
        StudentDb db = repository.create(mapToStudentDb(student));
        return mapToStudent(db);
    }

    @Transactional(readOnly = true)
    public List<Student> allStudents() {
        return repository.findAll().stream().map(StudentService::mapToStudent).collect(Collectors.toList());
    }

    private StudentDb getUserDbByUsername(String username) {
        return repository.getStudentsByUsername(username);
    }

    @Transactional(readOnly = true)
    public Student getStudent(Long id) throws IOException {
        StudentDb studentDb = repository.findOne(id);
        if (studentDb != null) {
            return mapToStudent(studentDb);
        } else {
            throw new DataNotFoundException("Mission results with id " + id + " not found");
        }
    }

    @Transactional
    public Student updateStudent(Long id, Student student) {
        if (repository.exists(id)) {
            StudentDb updated = repository.update(mapToStudentDb(id, student));
            return mapToStudent(updated);
        } else {
            throw new DataNotFoundException("Mission results with id " + id + " not found");
        }
    }

    @Transactional
    public void remove(Long id) {
        if (!repository.exists(id)) {
            throw new DataNotFoundException("Item with id " + id + " doesn't exist");
        }
        repository.delete(id);
    }

    private static Student mapToStudent(StudentDb db) {
        Student api = new Student();
        api.setId(db.getId());
        api.setUsername(db.getUsername());
        api.setName(db.getName());
        api.setPassword(db.getPassword());
        api.setSurname(db.getSurname());
        api.setFinalWorkID(db.getFinalWorkID());
        return api;
    }

    private static StudentDb mapToStudentDb(Long id, Student api) {
        StudentDb db = new StudentDb();
        db.setId(id);
        db.setUsername(api.getUsername());
        db.setPassword(api.getPassword());
        db.setName(api.getName());
        db.setSurname(api.getSurname());
        return db;
    }

    private static StudentDb mapToStudentDb(Student api) {
        return mapToStudentDb(api.getId(), api);
    }
}
