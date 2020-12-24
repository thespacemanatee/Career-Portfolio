package com.lkycic.careerportfolio;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

public class WorkScheduleFragment extends Fragment {

    private final static String PREF_KEY = "mainPrefs";
    private final static String SELECTED_KEY = "selectedOccupation";
    private static final String TAG = "WorkScheduleFragment";
    private SharedPreferences mPreferences;
    private String selectedOccupation;
    private DataSource dataSource;
    private DataSource deleteList;
    private DataSource coreList;
    private OccupationScopeAdapter adapter;
    private Toolbar toolbar;
    private TextView txtToolbar;
    private ImageButton btnBack;
    public boolean isActionMode;
    public int counter = 0;
    public int position = -1;
    private LoadingDialog loadingDialog;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View rootView = inflater.inflate(R.layout.fragment_work_schedule, container, false);
        mPreferences = getActivity().getSharedPreferences(PREF_KEY, Context.MODE_PRIVATE);
        setHasOptionsMenu(true);
        loadingDialog = new LoadingDialog(getActivity());
        loadingDialog.startLoadingDialog();
        Bundle bundle = this.getArguments();
        selectedOccupation = bundle.getString(SELECTED_KEY);
        deleteList = new DataSource();
        coreList = new DataSource();

        toolbar = rootView.findViewById(R.id.toolbar);
        toolbar.setVisibility(View.GONE);
        ((AppCompatActivity) getActivity()).setSupportActionBar(toolbar);
        txtToolbar = rootView.findViewById(R.id.toolbarText);
        txtToolbar.setVisibility(View.GONE);
        btnBack = rootView.findViewById(R.id.btnBack);
        btnBack.setVisibility(View.GONE);

        RecyclerView recyclerView = rootView.findViewById(R.id.occupationScopeRecycler);
        TextView workSubtitle = rootView.findViewById(R.id.work_schedule_subtitle);
        FloatingActionButton nextBtn = rootView.findViewById(R.id.nextBtn);

        workSubtitle.setText(String.format(getResources().getString(R.string.work_schedule_subtitle), selectedOccupation));

        if (dataSource == null) {
            dataSource = new DataSource();
        }

        adapter = new OccupationScopeAdapter(getContext(), dataSource, WorkScheduleFragment.this);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setAdapter(adapter);

        Occupation.GetOccupationDetails getter = new Occupation.GetOccupationDetails(getContext(), selectedOccupation, 5000) {
            @Override
            public void onPostExecute() {
                for (Occupation occupation: getResult()) {
                    dataSource.addOccupation(occupation);
                }

                Log.d(TAG, "onPostExecute: " + dataSource);
                loadingDialog.dismissLoadingDialog();
                adapter.notifyDataSetChanged();
            }
        };
        getter.start();
        
        btnBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clearActionMode();
            }
        });

        nextBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d(TAG, "Core List: " + coreList);
                Log.d(TAG, "Core List Size: " + coreList.getSize());
            }
        });

        return rootView;
    }

    private void clearActionMode() {
        isActionMode = false;
        txtToolbar.setVisibility(View.GONE);
        txtToolbar.setText(String.format(getResources().getString(R.string.items_selected), 0));
        btnBack.setVisibility(View.GONE);
        toolbar.setVisibility(View.GONE);
        toolbar.getMenu().clear();
        counter = 0;
        for (Occupation occupation: dataSource) {
            occupation.setCheckedDelete(false);
        }
//        for (int i = 0; i < dataSource.getSize(); i++) {
//            dataSource.getOccupation(i).setCheckedDelete(false);
//        }
        deleteList.clear();
        adapter.notifyDataSetChanged();

    }

    public void startSelectionDelete(int index) {
        if (!isActionMode) {
            isActionMode = true;
            deleteList.addOccupation(dataSource.getOccupation(index));
            counter++;
            updateToolbarText(counter);
            toolbar.setVisibility(View.VISIBLE);
            txtToolbar.setVisibility(View.VISIBLE);
            btnBack.setVisibility(View.VISIBLE);
            toolbar.inflateMenu(R.menu.menu_action);
            position = index;
            adapter.notifyDataSetChanged();
        }
    }

    private void updateToolbarText(int counter) {
        if (counter == 0) {
            txtToolbar.setText(String.format(getResources().getString(R.string.items_selected), 0));
        } else if (counter == 1) {
            txtToolbar.setText(String.format(getResources().getString(R.string.items_selected), 1));
        } else {
            txtToolbar.setText(String.format(getResources().getString(R.string.items_selected), counter));
        }
    }

    public void checkForRemoval(CompoundButton buttonView, Occupation occupation) {

        if ((buttonView.isChecked())) {
            deleteList.addOccupation(occupation);
            counter++;
        } else {
            deleteList.removeOccupation(occupation);
            counter--;
        }
        updateToolbarText(counter);

    }

    public void checkForCore(CompoundButton buttonView, Occupation occupation) {
        if ((buttonView.isChecked())) {
            coreList.addOccupation(occupation);
        } else {
            coreList.removeOccupation(occupation);
        }
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        Log.d(TAG, "onOptionsItemSelected: " + "DELETE MENU");
        if (item.getItemId() == R.id.item_delete && deleteList.getSize() > 0) {

            Log.d(TAG, "onOptionsItemSelected: " + "DELETE MENU SHOWN");
            AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
            builder.setMessage("Delete " + deleteList.getSize() + " items?");
            builder.setTitle("Confirm");
            builder.setPositiveButton("Delete", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    for (Occupation occupation: deleteList) {
                        dataSource.removeOccupation(occupation);
                        Log.d(TAG, "onClick: " + deleteList.contains(occupation));
                    }

//                    for (int i = 0; i < deleteList.getSize(); i++) {
//                        dataSource.removeOccupation(deleteList.getOccupation(i));
//                        Log.d(TAG, "onClick: " + deleteList.getOccupation(i).getTask());
//                    }
                    updateToolbarText(0);
                    clearActionMode();
                }
            });
            builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {

                }
            });
            builder.show();
        }

        return super.onOptionsItemSelected(item);
    }
}