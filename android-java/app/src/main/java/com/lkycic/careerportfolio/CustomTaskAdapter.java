package com.lkycic.careerportfolio;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class CustomTaskAdapter extends RecyclerView.Adapter<CustomTaskAdapter.ViewHolder>{

    private final Context context;
    private final LayoutInflater mInflater;
    private final ArrayList<CustomTask> customTasks;

    class ViewHolder extends RecyclerView.ViewHolder {

        private final TextView action;
        private final TextView object;
        private final TextView purpose;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            this.action = itemView.findViewById(R.id.action);
            this.object = itemView.findViewById(R.id.object);
            this.purpose = itemView.findViewById(R.id.purpose);
        }
    }

    CustomTaskAdapter(Context context, ArrayList<CustomTask> customTasks) {
        this.mInflater = LayoutInflater.from(context);
        this.context = context;
        this.customTasks = customTasks;
    }

    @NonNull
    @Override
    public CustomTaskAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = mInflater.inflate(R.layout.custom_task, parent, false);
        return new ViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull CustomTaskAdapter.ViewHolder holder, int position) {
        holder.action.setText(customTasks.get(position).getAction());
        holder.object.setText(customTasks.get(position).getObject());
        holder.purpose.setText(customTasks.get(position).getPurpose());
    }

    @Override
    public int getItemCount() {
        return customTasks.size();
    }
}
