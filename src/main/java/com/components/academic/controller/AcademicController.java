package com.components.academic.controller;

import com.components.academic.model.Academic;
import com.components.academic.service.AcademicService;
import com.components.utils.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.xml.bind.ValidationException;


@RestController
public class AcademicController extends BaseController {

    @Autowired
    AcademicService service;


    @RequestMapping(method = RequestMethod.POST, path = "/api/admin/academic")
    public Academic createAcademic(@RequestBody @Valid Academic academic) throws ValidationException {
        return service.createAcademic(academic);
    }
}
