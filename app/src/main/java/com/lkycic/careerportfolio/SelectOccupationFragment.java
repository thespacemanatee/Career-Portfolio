package com.lkycic.careerportfolio;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.InputMethodManager;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.button.MaterialButton;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.textfield.TextInputLayout;
import com.google.gson.Gson;

import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Iterator;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class SelectOccupationFragment extends Fragment implements OccupationsAdapter.OnOccupationListener {

    private LoadingDialog loadingDialog;
    private OccupationsAdapter adapter;
    private DataSource dataSource;
    private final static String PREF_KEY = "mainPrefs";
    private final static String DATA_KEY = "occupationsJson";
    private final static String SELECTED_KEY = "selectedOccupation";
    private SharedPreferences mPreferences;
    private String selectedOccupation;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View rootView = inflater.inflate(R.layout.fragment_select_occupation, container, false);
        mPreferences = getActivity().getSharedPreferences(PREF_KEY, Context.MODE_PRIVATE);

        // Setup hooks
        RecyclerView recyclerView = rootView.findViewById(R.id.occupationsRecycler);
        FloatingActionButton nextBtn = rootView.findViewById(R.id.nextBtn);
        TextInputLayout occupation_input = rootView.findViewById(R.id.occupation_input);
        MaterialButton searchBtn = rootView.findViewById(R.id.searchBtn);
        loadingDialog = new LoadingDialog(getActivity());

        // Get saved search data from SharedPreferences
        mPreferences.getString(DATA_KEY, null);
        Gson gson = new Gson();
        String json = mPreferences.getString(DATA_KEY, "");
        dataSource = gson.fromJson(json, DataSource.class);

        // If SharedPreferences does not contain saved data, initialise dataSource
        if (dataSource == null) {
            dataSource = new DataSource();
        }

        // Setup recyclerview
        adapter = new OccupationsAdapter(getContext(), dataSource, this);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setAdapter(adapter);

        searchBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String selectedOccupation = occupation_input.getEditText().getText().toString();
                if (selectedOccupation.isEmpty()) {
                    Toast.makeText(getContext(), "Please enter an occupation!", Toast.LENGTH_SHORT).show();
                } else {
                    loadingDialog.startLoadingDialog();
                    String url = "https://services.onetcenter.org/ws/online/search?keyword="
                            + selectedOccupation + "&start=1&end=100";
                    beginRequest(url);
                }
            }
        });

        nextBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (selectedOccupation == null) {
                    Toast.makeText(getContext(), "Please choose an occupation!", Toast.LENGTH_SHORT).show();
                } else {
                    Bundle bundle = new Bundle();
                    bundle.putString(SELECTED_KEY, selectedOccupation);
                    WorkScheduleFragment fragment = new WorkScheduleFragment();
                    fragment.setArguments(bundle);
                    FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
                    FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                    fragmentTransaction.setCustomAnimations(
                            R.anim.slide_in,
                            R.anim.fade_out,
                            R.anim.fade_in,
                            R.anim.slide_out);
                    fragmentTransaction.replace(R.id.container, fragment).addToBackStack(null);
                    fragmentTransaction.commit();
                }
            }
        });

        return rootView;
    }

    private void beginRequest(String url) {

        String TAG = "TEST";
        // OkHttp Request
        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(new NetworkUtils("singapore_university", "3594cgj"))
                .build();

        Request request = new Request.Builder()
                .url(url)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
                loadingDialog.dismissLoadingDialog();
                call.cancel();
                Log.d(TAG, "onFailure: " + call.toString());
            }

            @Override
            public void onResponse(@NotNull Call call, @NotNull Response response) throws IOException {

                final String responseData = response.body().string();

                Log.d(TAG, "onResponse: " + responseData);

                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            // Get response wtih key value "occupation" into a JSONArray
                            JSONArray jsonArray = new JSONObject(responseData).getJSONArray("occupation");
                            dataSource.clear();
                            // Parse each entry into dataSource for recyclerview information
                            for (int i = 0; i < jsonArray.length(); i++) {
                                JSONObject occupation = (JSONObject) jsonArray.get(i);
                                Log.d(TAG, "run: " + occupation.get("title"));
                                dataSource.addOccupation(new Occupation((String) occupation.get("title"), Occupation.ADD_BY_TITLE));
                            }
                            adapter.notifyDataSetChanged();
                            loadingDialog.dismissLoadingDialog();
                            // Close the keyboard
                            View view = getActivity().getCurrentFocus();
                            if (view != null) {
                                InputMethodManager imm = (InputMethodManager) getActivity().getSystemService(Context.INPUT_METHOD_SERVICE);
                                imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
                            }
                            Toast.makeText(getContext(), "Occupations found!", Toast.LENGTH_SHORT).show();

                        } catch (JSONException e) {
                            e.printStackTrace();
                            loadingDialog.dismissLoadingDialog();
                        }
                    }
                });
            }
        });
    }

    @Override
    public void onPause() {
        super.onPause();
        SharedPreferences.Editor editor = mPreferences.edit();
        Gson gson = new Gson();
        String json = gson.toJson(dataSource);
        editor.putString(DATA_KEY, json);
        editor.apply();
    }

    @Override
    public void onOccupationClick(int position) {
        Log.d("TAG", "onOccupationClick: " + dataSource.getOccupation(position));
        selectedOccupation = dataSource.getOccupation(position).getTitle();
    }
}