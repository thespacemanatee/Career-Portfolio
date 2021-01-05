package com.lkycic.careerportfolio;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;

import com.google.android.material.textfield.TextInputLayout;

import org.angmarch.views.NiceSpinner;
import org.angmarch.views.OnSpinnerItemSelectedListener;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class AddTasksDialog extends DialogFragment {

    private View parentView;
    private final Context mContext;
    private NiceSpinner niceSpinner;
    private TextInputLayout objectText;
    private TextInputLayout purposeText;
    private String action;

    public AddTasksDialog(Context mContext) {
        this.mContext = mContext;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        LayoutInflater layoutInflater = requireActivity().getLayoutInflater();
        parentView = layoutInflater.inflate(R.layout.add_task_dialog, null);
        niceSpinner = parentView.findViewById(R.id.actions_spinner);
        objectText = parentView.findViewById(R.id.object_text);
        purposeText = parentView.findViewById(R.id.purpose_text);

        niceSpinner.setOnSpinnerItemSelectedListener(new OnSpinnerItemSelectedListener() {
            @Override
            public void onItemSelected(NiceSpinner parent, View view, int position, long id) {
                action = (String) parent.getItemAtPosition(position);
            }
        });

    }

    @NonNull
    @Override
    public Dialog onCreateDialog(@Nullable Bundle savedInstanceState) {
        niceSpinner.attachDataSource(readLine(mContext));
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());

        builder.setView(parentView)
                .setPositiveButton("Add Task", (dialog, which) -> {

                })
                .setNegativeButton("Cancel", (dialog, which) -> {
                    Objects.requireNonNull(AddTasksDialog.this.getDialog()).cancel();
                });

        return builder.create();
    }

    @Override
    public void onResume() {
        super.onResume();
        final AlertDialog dialog = (AlertDialog) getDialog();
        if (dialog != null) {

            Button positiveButton = dialog.getButton(Dialog.BUTTON_POSITIVE);
            positiveButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    String object = objectText.getEditText().getText().toString();
                    String purpose = purposeText.getEditText().getText().toString();
                    if (object.isEmpty()) {
                        objectText.setError("Field cannot be empty");
                    } else {
                        objectText.setError(null);
                        objectText.setErrorEnabled(false);
                    }
                    if (purpose.isEmpty()) {
                        purposeText.setError("Field cannot be empty");
                    } else {
                        purposeText.setError(null);
                        purposeText.setErrorEnabled(false);
                    }
                    
                    if (!(object.isEmpty() || purpose.isEmpty())) {
                        addTask();
                        dialog.dismiss();
                    }
                }
            });

        }

    }

    private void addTask() {
    }

    private List<String> readLine(Context mContext) {

        List<String> lines = new ArrayList<>();

        try {
            InputStream is = mContext.getAssets().open("actions.txt");
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            String line;

            while ((line = reader.readLine()) != null)
                lines.add(line);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return  lines;

    }
}
