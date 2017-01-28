package com.components.finalWork.controller;

import com.components.finalWork.model.FinalWork;
import com.components.finalWork.service.FinalWorkService;
import com.components.student.model.Student;
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
    public FinalWork createFinalWork(@RequestBody  @Valid FinalWork finalWork) throws ValidationException {
        return service.createFinalWork(finalWork);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/api/admin/finalwork/{id}")
    public FinalWork  updateAcademic(@PathVariable Long id, @Valid @RequestBody FinalWork finalWork) {
        return service.updateFinalworkStatus(id, finalWork);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/api/admin/finalworks")
    public List<FinalWork> getAllFinalWorks() {
        return service.getAllFinalWorks();
    }

}
