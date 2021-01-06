package com.lkycic.careerportfolio;

import android.os.Parcel;
import android.os.Parcelable;

import org.jetbrains.annotations.NotNull;

public class CustomTask implements Parcelable {

    private String action;
    private String object;
    private String purpose;

    public CustomTask(String action, String object, String purpose) {
        this.action = action;
        this.object = object;
        this.purpose = purpose;
    }

    protected CustomTask(Parcel in) {
        action = in.readString();
        object = in.readString();
        purpose = in.readString();
    }

    public static final Creator<CustomTask> CREATOR = new Creator<CustomTask>() {
        @Override
        public CustomTask createFromParcel(Parcel in) {
            return new CustomTask(in);
        }

        @Override
        public CustomTask[] newArray(int size) {
            return new CustomTask[size];
        }
    };

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    @NotNull
    @Override
    public String toString() {
        return "CustomTask{" +
                "action='" + action + '\'' +
                ", object='" + object + '\'' +
                ", purpose='" + purpose + '\'' +
                '}';
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(action);
        dest.writeString(object);
        dest.writeString(purpose);
    }
}
