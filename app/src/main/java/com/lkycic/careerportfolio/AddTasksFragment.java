package com.lkycic.careerportfolio;

import android.content.Context;
import android.os.Bundle;

import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.google.android.material.button.MaterialButton;

import org.angmarch.views.NiceSpinner;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class AddTasksFragment extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View rootView = inflater.inflate(R.layout.fragment_add_tasks, container, false);
        Context mContext = rootView.getContext();

        MaterialButton addTask = rootView.findViewById(R.id.add_task);

//        NiceSpinner niceSpinner = rootView.findViewById(R.id.actions_spinner);
//        niceSpinner.attachDataSource(readLine(mContext));

        addTask.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AddTasksDialog dialog = new AddTasksDialog();
            }
        });

        return rootView;
    }
}