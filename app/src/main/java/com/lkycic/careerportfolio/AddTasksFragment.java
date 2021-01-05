package com.lkycic.careerportfolio;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.google.android.material.button.MaterialButton;

import java.util.ArrayList;

public class AddTasksFragment extends Fragment {

    private static final int TARGET_FRAGMENT_REQUEST_CODE = 1000;
    private static final String CUSTOM_TASK = "custom_task";
    private static final String TAG = "AddTasksFragment";
    private CustomTaskAdapter adapter;
    private final ArrayList<CustomTask> customTasks = new ArrayList<>();

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View rootView = inflater.inflate(R.layout.fragment_add_tasks, container, false);
        Context mContext = rootView.getContext();

        MaterialButton addTask = rootView.findViewById(R.id.add_task);
        RecyclerView recyclerView = rootView.findViewById(R.id.custom_task_recycler);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        adapter = new CustomTaskAdapter(mContext, customTasks);
        recyclerView.setAdapter(adapter);


        addTask.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AddTasksDialog dialog = new AddTasksDialog(mContext);
                dialog.setTargetFragment(AddTasksFragment.this, TARGET_FRAGMENT_REQUEST_CODE);
                dialog.show(getFragmentManager(), "Add task");
            }
        });

        return rootView;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        if (resultCode != Activity.RESULT_OK) {
            return;
        }
        if (requestCode == TARGET_FRAGMENT_REQUEST_CODE) {
            CustomTask customTask = data.getParcelableExtra(CUSTOM_TASK);
            customTasks.add(customTask);
            Log.d(TAG, "onActivityResult: " + customTask.toString());
            adapter.notifyDataSetChanged();
        }
    }
}