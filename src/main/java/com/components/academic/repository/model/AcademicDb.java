package com.components.academic.repository.model;

import com.components.user.repository.UserDb;

public class AcademicDb extends UserDb {

    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
