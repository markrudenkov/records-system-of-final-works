package com.components.academic.model;

import com.components.user.model.User;

public class Academic extends User {

    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
