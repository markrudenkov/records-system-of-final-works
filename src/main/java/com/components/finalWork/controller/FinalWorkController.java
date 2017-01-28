package com.components.finalWork.controller;

import com.components.finalWork.model.FinalWork;
import com.components.finalWork.service.FinalWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.xml.bind.ValidationException;


@RestController
public class FinalWorkController {

    @Autowired
    FinalWorkService service;


    // Teacher could create final work
    @RequestMapping(method = RequestMethod.POST, path = "/api/finalwork")
    public FinalWork createFinalWork(@RequestBody  @Valid FinalWork finalWork) throws ValidationException {
        return service.createFinalWork(finalWork);
    }
}
