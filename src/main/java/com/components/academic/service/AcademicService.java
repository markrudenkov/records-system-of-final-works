package com.components.academic.service;

import com.components.academic.model.Academic;
import com.components.academic.repository.AcademicRepository;
import com.components.academic.repository.model.AcademicDb;
import com.components.user.model.User;
import com.components.user.repository.UserDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.xml.bind.ValidationException;

@Service
public class AcademicService {

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private AcademicRepository repository;

    @Transactional
    public Academic createAcademic (Academic academic) throws ValidationException {
        UserDb userByUsername = getUserDbByUsername(academic.getUsername());
        if (userByUsername != null) {
            throw new ValidationException("username", "already exists");
        }

        academic.setPassword(encoder.encode(academic.getPassword()));
        AcademicDb db = repository.create(mapToAcademicDb(academic));

        //roleService.createRole(new Role(db.getId(), db.getUsername(), Roles.CUSTOMER));
        return mapToAcademic(db);
    }

    private UserDb getUserDbByUsername(String username) {
        return repository.getUserByUsername(username);
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
