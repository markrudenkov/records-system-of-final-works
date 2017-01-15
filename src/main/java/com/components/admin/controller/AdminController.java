package com.components.admin.controller;

import com.components.academic.model.Academic;
import com.components.academic.service.AcademicService;
import com.components.student.model.Student;
import com.components.student.service.StudentService;
import com.components.utils.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.bind.ValidationException;
import java.io.IOException;
import java.util.List;


@RestController
public class AdminController extends BaseController {

    @Autowired
    AcademicService service;

    @Autowired
    StudentService studentService;


    @RequestMapping(method = RequestMethod.POST, path = "/api/admin/academic")
    public Academic createAcademic(@RequestBody @Valid Academic academic) throws ValidationException {
        return service.createAcademic(academic);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/api/admin/academic")
    public List<Academic> all() {
        return service.all();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/api/admin/academic/{id}")
    public Academic get(@PathVariable Long id) throws IOException {
        return service.getAcademic(id);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/api/admin/academic/{id}")
    public Academic updateAcademic(@PathVariable Long id, @Valid @RequestBody Academic academic) {
        return service.updateAcademic(id, academic);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/api/admin/academic/{id}")
    public void remove(@PathVariable Long id) {
        service.remove(id);
    }

    //Student
    @RequestMapping(method = RequestMethod.POST, path = "/api/admin/student")
    public Student createAcademic(@RequestBody @Valid Student student) throws ValidationException {
        return studentService.createStudent(student);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/api/admin/student")
    public List<Student> allStudents() {
        return studentService.allStudents();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/api/admin/student{id}")
    public Student getStudent(@PathVariable Long id) throws IOException {
        return studentService.getStudent(id);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/api/admin/student{id}")
    public Student updateAcademic(@PathVariable Long id, @Valid @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/api/admin/student{id}")
    public void removeStudent(@PathVariable Long id) {
        studentService.remove(id);
    }
}
