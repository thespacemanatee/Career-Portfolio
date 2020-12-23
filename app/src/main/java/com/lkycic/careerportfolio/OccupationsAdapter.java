package com.lkycic.careerportfolio;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class OccupationsAdapter extends RecyclerView.Adapter<OccupationsAdapter.ViewHolder> {

    private final Context context;
    private final LayoutInflater mInflater;
    private final DataSource dataSource;
    private final OnOccupationListener mOnOccupationListener;


    class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        private final TextView occupation;
        private final OnOccupationListener onOccupationListener;

        public ViewHolder(@NonNull View itemView, OnOccupationListener onOccupationListener) {
            super(itemView);
            this.occupation = itemView.findViewById(R.id.occupation_text);
            this.onOccupationListener = onOccupationListener;

            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View v) {
            onOccupationListener.onOccupationClick(getAdapterPosition());
        }
    }

    OccupationsAdapter(Context context, DataSource dataSource, OnOccupationListener onOccupationListener) {
        this.mInflater = LayoutInflater.from(context);
        this.context = context;
        this.dataSource = dataSource;
        this.mOnOccupationListener = onOccupationListener;
    }

    @NonNull
    @Override
    public OccupationsAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = mInflater.inflate(R.layout.occupations, parent, false);
        return new ViewHolder(itemView, mOnOccupationListener);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.occupation.setText(dataSource.getOccupation(position).getTitle());
    }

    @Override
    public int getItemCount() {
        return dataSource.getSize();
    }

    public interface OnOccupationListener{
        void onOccupationClick(int position);
    }
}
