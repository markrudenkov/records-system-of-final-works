package com.components.review.controller;

import com.components.review.model.Review;
import com.components.review.service.ReviewService;
import com.components.utils.exception.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ReviewController {

    @Autowired
    ReviewService service;

    @RequestMapping (method = RequestMethod.POST, path = "/api/review")
    public Review createReview (@RequestBody Review review) throws ValidationException{
        return service.createReview(review);
    }

}
