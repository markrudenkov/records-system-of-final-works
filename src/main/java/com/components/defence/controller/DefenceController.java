package com.components.defence.controller;

import com.components.defence.service.DefenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.components.defence.model.Defence;

import javax.validation.Valid;
import javax.xml.bind.ValidationException;

@RestController
public class DefenceController {

    @Autowired
    DefenceService service;

    @RequestMapping(method = RequestMethod.POST, path = "/api/admin/defence")
    public Defence createDefence(@RequestBody @Valid Defence defence) throws ValidationException {
        return service.createDefence(defence);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/api/academic/defence/{id}")
    public String updateDefenceEvluation(@RequestBody @Valid Defence defence) throws ValidationException {
        return service.updateDefenceEvluation(defence);
    }

}
