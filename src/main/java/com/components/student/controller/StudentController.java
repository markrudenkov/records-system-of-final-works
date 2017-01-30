package com.components.student.controller;

import com.components.final_work.model.FinalWork;
import com.components.student.model.Student;
import com.components.student.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import javax.xml.bind.ValidationException;
import java.io.IOException;
import java.util.List;


@RestController
public class StudentController {

    @Autowired
    StudentService studentService;

    @RequestMapping(method = RequestMethod.POST, path = "/api/admin/student")
    public Student createAcademic(@RequestBody @Valid Student student) throws ValidationException {
        return studentService.createStudent(student);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/api/admin/student")
    public List<Student> allStudents() {
        return studentService.allStudents();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/api/admin/student/{id}")
    public Student getStudent(@PathVariable Long id) throws IOException {
        return studentService.getStudent(id);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/api/admin/student/{id}")
    public Student updateAcademic(@PathVariable Long id, @Valid @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/api/admin/student/{id}")
    public String removeStudent(@PathVariable Long id) {
        studentService.remove(id);
        return "{\"message\": \"removed\"}";
    }

    @RequestMapping(method = RequestMethod.GET, path = "/api/student/{username}")
    public Student getStudentByUsername(@PathVariable String username) {
        return studentService.getStudentByUsername(username);
    }

}
