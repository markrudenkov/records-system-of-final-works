package com.components.student.repository.model;

import com.components.user.repository.UserDb;

/**
 * Created by mark on 17.1.15.
 */
public class StudentDb extends UserDb {

    private int finalWorkID;

    public int getFinalWorkID() {
        return finalWorkID;
    }

    public void setFinalWorkID(int finalWorkID) {
        this.finalWorkID = finalWorkID;
    }
}
