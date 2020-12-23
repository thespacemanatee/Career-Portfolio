package com.lkycic.careerportfolio;

import android.content.Context;
import android.util.Log;
import android.util.SparseBooleanArray;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.Transformation;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

public class OccupationScopeAdapter extends RecyclerView.Adapter<OccupationScopeAdapter.ViewHolder> {

    private static final String TAG = "OccupationScopeAdapter";
    private final Context context;
    private final LayoutInflater mInflater;
    private final DataSource dataSource;
    private final WorkScheduleFragment workScheduleFragment;

    OccupationScopeAdapter(Context context, DataSource dataSource, WorkScheduleFragment fragment) {
        this.context = context;
        this.dataSource = dataSource;
        this.mInflater = LayoutInflater.from(context);
        this.workScheduleFragment = fragment;
    }

    class ViewHolder extends RecyclerView.ViewHolder {

        private final TextView occupationScope;
        private final LinearLayout linearLayout;
        private final CardView cardView;
        private final CheckBox checkBoxDelete;
        private final CheckBox checkBoxCore;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            this.occupationScope = itemView.findViewById(R.id.occupation_scope_text);
            this.linearLayout = itemView.findViewById(R.id.linearLayout);
            this.cardView = itemView.findViewById(R.id.cardView);
            this.checkBoxDelete = itemView.findViewById(R.id.checkBoxDelete);
            this.checkBoxCore = itemView.findViewById(R.id.checkBoxCore);

        }
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = mInflater.inflate(R.layout.occupations_scope, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        final Occupation occupation = dataSource.getOccupation(position);
        holder.occupationScope.setText(dataSource.getOccupation(position).getTask());
        holder.occupationScope.setWidth(1000);
        holder.checkBoxDelete.setOnCheckedChangeListener(null);
        holder.checkBoxDelete.setChecked(occupation.isCheckedDelete());
        holder.checkBoxCore.setOnCheckedChangeListener(null);
        holder.checkBoxCore.setChecked(occupation.isCheckedCore());

        if (workScheduleFragment.position == position) {
            holder.checkBoxDelete.setChecked(true);
            workScheduleFragment.position = -1;
        }

        if (workScheduleFragment.isActionMode) {
            holder.checkBoxCore.setVisibility(View.GONE);
            Anim anim = new Anim(100, holder.linearLayout);
            anim.setDuration(300);
            holder.linearLayout.setAnimation(anim);
        } else {
            holder.checkBoxCore.setVisibility(View.VISIBLE);
            Anim anim = new Anim(0, holder.linearLayout);
            anim.setDuration(300);
            holder.linearLayout.setAnimation(anim);
            holder.checkBoxDelete.setChecked(false);
        }

        holder.cardView.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                workScheduleFragment.startSelectionDelete(position);
                occupation.setCheckedDelete(true);
                return true;
            }
        });

        holder.checkBoxDelete.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                //set your object's last status
                workScheduleFragment.checkForRemoval(buttonView, dataSource.getOccupation(position));
                occupation.setCheckedDelete(isChecked);
            }
        });

        holder.checkBoxCore.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                workScheduleFragment.checkForCore(buttonView, dataSource.getOccupation(position));
                occupation.setCheckedCore(isChecked);
            }
        });
    }

    @Override
    public int getItemCount() {
        return dataSource.getSize();
    }

    static class Anim extends Animation {
        private final int width, startWidth;
        private final View view;

        public Anim(int width, View view) {
            this.width = width;
            this.view = view;
            this.startWidth = view.getWidth();
        }

        @Override
        protected void applyTransformation(float interpolatedTime, Transformation t) {

            view.getLayoutParams().width = startWidth + (int) ((width - startWidth) * interpolatedTime);
            view.requestLayout();

            super.applyTransformation(interpolatedTime, t);
        }

        @Override
        public boolean willChangeBounds() {
            return true;
        }
    }
}
