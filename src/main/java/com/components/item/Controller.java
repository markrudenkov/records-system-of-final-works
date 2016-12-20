package com.components.item;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by mark on 16.12.19.
 */
@RestController
public class Controller {




    private static final String template = "Hello, World!";


    @RequestMapping("/item")
    public
    @ResponseBody
    String hello() {
        return template;
    }



}
