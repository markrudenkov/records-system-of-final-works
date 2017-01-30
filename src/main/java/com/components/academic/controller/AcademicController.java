package com.components.academic.controller;

import com.components.academic.model.Academic;
import com.components.academic.service.AcademicService;
import com.components.utils.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.bind.ValidationException;
import java.io.IOException;
import java.util.List;


@RestController
public class AcademicController extends BaseController {

    @Autowired
    AcademicService service;

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

    @RequestMapping(method = RequestMethod.GET, path = "/api/academic/{username}")
    public Academic getAcademicByUsername(@PathVariable String username) {
        return service.getAcademicByUsername(username);
    }

}
