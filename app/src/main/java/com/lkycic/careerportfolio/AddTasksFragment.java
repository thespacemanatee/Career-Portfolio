package com.lkycic.careerportfolio;

import android.content.Context;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.google.android.material.button.MaterialButton;

public class AddTasksFragment extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View rootView = inflater.inflate(R.layout.fragment_add_tasks, container, false);
        Context mContext = rootView.getContext();

        MaterialButton addTask = rootView.findViewById(R.id.add_task);

        addTask.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AddTasksDialog dialog = new AddTasksDialog(mContext);
                dialog.show(getFragmentManager(), "Add task");
            }
        });

        return rootView;
    }
}