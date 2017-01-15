package com.components.student.model;

import com.components.user.model.User;


public class Student extends User {

    private int finalWorkID;

    public int getFinalWorkID() {
        return finalWorkID;
    }

    public void setFinalWorkID(int finalWorkID) {
        this.finalWorkID = finalWorkID;
    }
}
