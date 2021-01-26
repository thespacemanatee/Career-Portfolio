package com.lkycic.careerportfolio;

import androidx.annotation.NonNull;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.function.Consumer;

public class DataSource implements Iterable<Occupation> {

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

    Occupation getOccupation(int i){
        return dataArrayList.get(i);
    }

    ArrayList<Occupation> getDataArrayList(){
        return dataArrayList;
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

    @NonNull
    @Override
    public Iterator<Occupation> iterator() {
        return dataArrayList.iterator();
    }
}
