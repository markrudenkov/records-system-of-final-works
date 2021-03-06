package com.components.final_work.controller;

import com.components.final_work.model.FinalWork;
import com.components.final_work.service.FinalWorkService;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.bind.ValidationException;
import java.util.List;


@RestController
public class FinalWorkController {

    @Autowired
    FinalWorkService service;

    // Teacher could create final work
    @RequestMapping(method = RequestMethod.POST, path = "/api/finalwork")
    public FinalWork createFinalWork(@RequestBody @Valid FinalWork finalWork) throws ValidationException {
        return service.createFinalWork(finalWork);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/api/finalwork/{id}")
    public FinalWork updateFinalWorkStatus(@PathVariable Long id, @Valid @RequestBody FinalWork finalWork) {
        return service.updateFinalWorkStatus(id, finalWork);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/api/admin/finalwork")
    public String getAllFinalWorks() throws JsonProcessingException {
        return service.getAllFinalWorks();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/api/student/finalwork/{id}")
    public String getFinalWorkOfStudent(@PathVariable Long id) {
        return service.getFinalWorkOfStudent(id);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/api/student/finalwork")
    public List<FinalWork> getAllConfirmedFinalWorks() {
        return service.getAllConfirmedFinalWorks();
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/api/student/finalwork/{id}")  // Student id as param
    public FinalWork updateFinalWorkStatusByStudent(@PathVariable Long id, @Valid @RequestBody FinalWork finalWork) {
        return service.updateFinalWorkStatusByStudent(id, finalWork);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/api/academic/reviewer/finalworks/{id}")
    public List<FinalWork> getAllConfirmedFinalWorks(@PathVariable Long id) {
        return service.getFinalWorksToReview(id);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/api/academic/promotor/finalworks/{id}")
    public List<FinalWork> getPromotorFinalWorks(@PathVariable Long id) {
        return service.getPromotorFinalWorks(id);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/api/academic/finalworks/{id}")
    public String getFinalWorksAndDefencesOfAcademic(@PathVariable Long id) throws JsonProcessingException {
        return service.getFinalWorksAndDefencesOfAcademic(id);
    }
}
