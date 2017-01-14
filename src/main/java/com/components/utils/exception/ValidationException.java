package com.components.utils.exception;


public class ValidationException extends RuntimeException {

    private String name;
    private String message;

    public ValidationException(String name, String message) {
        this.name = name;
        this.message = message;
    }

    public String getName() {
        return name;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
