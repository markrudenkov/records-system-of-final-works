package com.components.academic.service;

import com.components.academic.model.Academic;
import com.components.academic.repository.AcademicRepository;
import com.components.academic.repository.model.AcademicDb;
import com.components.student.model.Student;
import com.components.user.model.User;
import com.components.user.repository.UserDb;
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
public class AcademicService {


    private BCryptPasswordEncoder encoder;

    AcademicService() {
        encoder = new BCryptPasswordEncoder();
    }

    @Autowired
    private AcademicRepository repository;

    @Transactional(readOnly = true)
    public Academic getAcademicByUsername(String username) {
        return mapToAcademic(repository.getAcademicByUsername(username));
    }

    @Transactional
    public Academic createAcademic (Academic academic) throws ValidationException {
        AcademicDb userByUsername = repository.getAcademicByUsername(academic.getUsername());
        if (userByUsername != null) {
            throw new ValidationException("username", "already exists");
        }
        academic.setPassword(encoder.encode(academic.getPassword()));
        AcademicDb db = repository.create(mapToAcademicDb(academic));
        return mapToAcademic(db);
    }

    @Transactional(readOnly = true)
    public List<Academic> all() {
        return repository.findAll().stream().map(AcademicService::mapToAcademic).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Academic getAcademic(Long id) throws IOException {
        AcademicDb academicDb = repository.findOne(id);
        if (academicDb != null) {
            return mapToAcademic(academicDb);
        } else {
            throw new DataNotFoundException("Academic with id " + id + " not found");
        }
    }

    @Transactional
    public Academic updateAcademic(Long id, Academic academic) {
        if (repository.exists(id)) {
            AcademicDb updated = repository.update(mapToAcademicDb(id, academic));
            return mapToAcademic(updated);
        } else {
            throw new DataNotFoundException("Academic with id " + id + " not found");
        }
    }

    @Transactional
    public void remove(Long id) {
        if (!repository.exists(id)) {
            throw new DataNotFoundException("Academic id " + id + " doesn't exist");
        }
        repository.delete(id);
    }


    private static Academic mapToAcademic(AcademicDb db) {
        Academic api = new Academic();
        api.setId(db.getId());
        api.setUsername(db.getUsername());
        api.setName(db.getName());
        api.setPassword(db.getPassword());
        api.setSurname(db.getSurname());
        api.setTitle(db.getTitle());
        return api;
    }

    private static AcademicDb mapToAcademicDb(Long id, Academic api) {
        AcademicDb db = new AcademicDb();
        db.setId(id);
        db.setUsername(api.getUsername());
        db.setPassword(api.getPassword());
        db.setName(api.getName());
        db.setSurname(api.getSurname());
        db.setTitle(api.getTitle());
        return db;
    }

    private static AcademicDb mapToAcademicDb(Academic api) {
        return mapToAcademicDb(api.getId(), api);
    }

}
