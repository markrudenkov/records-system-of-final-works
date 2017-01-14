package com.components.user.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


public class User {

    private Long id;

    @NotNull
    @Size(min = 2)
    private String username;

    @NotNull
    @Size(min = 6)
    private String password;

    @NotNull
    @Size(min = 1)
    private String name;

    private String surname;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}

