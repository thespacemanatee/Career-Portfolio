package com.lkycic.careerportfolio;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.ArrayList;

public class DataSource {

    private final ArrayList<Occupation> dataArrayList;

    DataSource(){
        dataArrayList = new ArrayList<>();
    }

    void addOccupation(Occupation occupation) {
        dataArrayList.add(occupation);
    }

    void removeData(int position){
        dataArrayList.remove(position);
    }

    void removeOccupation(Occupation occupation) {
        dataArrayList.remove(occupation);
    }

    void removeDataWithTitle(String title) {
        Occupation o = new Occupation();
        o.setTitle(title);
        dataArrayList.remove(o);
    }

    void removeDataWithTask(String task) {
        Occupation o = new Occupation(task, Occupation.ADD_BY_TASK);
        dataArrayList.remove(o);
    }

    Occupation getOccupation(int i){
        return dataArrayList.get(i);
    }

    boolean contains(Occupation occupation) {
        return dataArrayList.contains(occupation);
    }

    int getSize(){
        return dataArrayList.size();
    }

    public void clear() {
        dataArrayList.clear();
    }

    @NonNull
    @Override
    public String toString() {
        return "Occupations: " + dataArrayList;
    }
}
