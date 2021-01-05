package com.lkycic.careerportfolio;

import android.content.Context;
import android.util.Log;

import androidx.annotation.Nullable;

import com.opencsv.bean.CsvBindByPosition;

import org.jetbrains.annotations.NotNull;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Collection;


/**
 * Class to represent Occupation objects as a pojo.
 *
 * Occupation objects follow this contract:
 * - <Group ID>: Document
 *    - name: String
 *    - display_picture: String (nullable)
 *    - colour: Long, strictly non-negative integer
 **/
public class Occupation {

    @CsvBindByPosition(position = 0)
    private String SOC_Code = "";

    @CsvBindByPosition(position = 1)
    private String title = "";

    @CsvBindByPosition(position = 2)
    private String taskId = "";

    @CsvBindByPosition(position = 3)
    private String task = "";

    @CsvBindByPosition(position = 4)
    private String DWA_ID = "";

    @CsvBindByPosition(position = 5)
    private String DWA_Title = "";

    @CsvBindByPosition(position = 6)
    private String IWA_ID = "";

    @CsvBindByPosition(position = 7)
    private String IWA_Title = "";

    @CsvBindByPosition(position = 8)
    private String GWA_ID = "";

    @CsvBindByPosition(position = 9)
    private String GWA = "";

    private boolean isCheckedDelete = false;

    private boolean isCheckedCore = false;

    private boolean isSelected = false;

    public static final String ADD_BY_TITLE = "title";

    public static final String ADD_BY_TASK = "task";

    public Occupation() {}

    public Occupation(String attribute, String type) {
        if (type.equals(ADD_BY_TITLE)) {
            this.title = attribute;
        }
        if (type.equals(ADD_BY_TASK)) {
            this.task = attribute;
        }
    }

    public Occupation(String SOC_Code, String title, String taskId, String task, String DWA_ID,
                      String DWA_Title, String IWA_ID, String IWA_Title, String GWA_ID, String GWA) {
        this.SOC_Code = SOC_Code;
        this.title = title;
        this.taskId = taskId;
        this.task = task;
        this.DWA_ID = DWA_ID;
        this.DWA_Title = DWA_Title;
        this.IWA_ID = IWA_ID;
        this.IWA_Title = IWA_Title;
        this.GWA_ID = GWA_ID;
        this.GWA = GWA;
    }

    public String getSOC_Code() {
        return SOC_Code;
    }

    public String getTitle() {
        return title;
    }

    public String getTaskId() {
        return taskId;
    }

    public String getTask() {
        return task;
    }

    public String getDWA_ID() {
        return DWA_ID;
    }

    public String getDWA_Title() {
        return DWA_Title;
    }

    public String getIWA_ID() {
        return IWA_ID;
    }

    public String getIWA_Title() {
        return IWA_Title;
    }

    public String getGWA_ID() {
        return GWA_ID;
    }

    public String getGWA() {
        return GWA;
    }

    public void setSOC_Code(String SOC_Code) {
        this.SOC_Code = SOC_Code;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public void setDWA_ID(String DWA_ID) {
        this.DWA_ID = DWA_ID;
    }

    public void setDWA_Title(String DWA_Title) {
        this.DWA_Title = DWA_Title;
    }

    public void setIWA_ID(String IWA_ID) {
        this.IWA_ID = IWA_ID;
    }

    public void setIWA_Title(String IWA_Title) {
        this.IWA_Title = IWA_Title;
    }

    public void setGWA_ID(String GWA_ID) {
        this.GWA_ID = GWA_ID;
    }

    public void setGWA(String GWA) {
        this.GWA = GWA;
    }

    public boolean isCheckedDelete() {
        return isCheckedDelete;
    }

    public void setCheckedDelete(boolean checkedDelete) {
        isCheckedDelete = checkedDelete;
    }

    public boolean isCheckedCore() {
        return isCheckedCore;
    }

    public void setCheckedCore(boolean checkedCore) {
        isCheckedCore = checkedCore;
    }

    public boolean isSelected() {
        return isSelected;
    }

    public void setSelected(boolean selected) {
        isSelected = selected;
    }

    public abstract static class GetOccupationDetails extends AsyncGetter {

        private static final String TAG = "CSV_Utilities";
        private final Context context;
        private final String selectedOccupation;
        private DataSource result = null;

        /**
         * Standard constructor
         * @param context context of caller
         * @param selectedOccupation selected occupation
         */
        public GetOccupationDetails(Context context, String selectedOccupation){
            this.context = context;
            this.selectedOccupation = selectedOccupation;
        }

        @Override
        protected void runMainBody() {
            InputStream inputStream = context.getResources().openRawResource(R.raw.data);
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(inputStream, StandardCharsets.UTF_8)
            );

            String line = "";
            DataSource occupations = new DataSource();

            try {
                while ((line = reader.readLine()) != null) {
                    // Split by ','
                    String[] tokens = line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)");
                    tokens[2] = tokens[2].replaceAll("\"", "");
                    tokens[4] = tokens[4].replaceAll("\"", "");

                    if (!tokens[2].toLowerCase().equals(selectedOccupation.toLowerCase())) {
                        continue;
                    }

                    // Read data
                    Occupation occupation = new Occupation(tokens[1],
                            tokens[2], tokens[3], tokens[4], tokens[5],
                            tokens[6], tokens[7], tokens[8], tokens[9], tokens[10]);
                    Log.d(TAG, "onClick: " + occupation.toString());

                    if (!containsOccupationWithTask(occupations.getDataArrayList(), occupation.getTask())) {
                        occupations.addOccupation(occupation);
                    }
                }

            } catch (IOException e) {
                e.printStackTrace();
                Log.wtf(TAG, "Error reading data file on line " + line, e);
            }

            result = occupations;
        }

        public static boolean containsOccupationWithTask(Collection<Occupation> occupations, String task) {
            for(Occupation o : occupations) {
                if(o != null && o.getTask().equals(task)) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Get query result as an Occupation
         * @return requested Occupation details, if query succeeds, or null otherwise
         */
        public DataSource getResult(){
            return result;
        }

        /**
         * Abstract method for post-retrieval operations
         */
        public abstract void onPostExecute();

        /**
         * Check whether query is successful
         * @return boolean for whether query is successful
         */
        public boolean isSuccessful(){
            return result!=null;
        }
    }

    @NotNull
    @Override
    public String toString() {
        return "Occupation{" +
                "SOC_Code='" + SOC_Code + '\'' +
                ", title='" + title + '\'' +
                ", taskId='" + taskId + '\'' +
                ", task='" + task + '\'' +
                ", DWA_ID='" + DWA_ID + '\'' +
                ", DWA_Title='" + DWA_Title + '\'' +
                ", IWA_ID='" + IWA_ID + '\'' +
                ", IWA_Title='" + IWA_Title + '\'' +
                ", GWA_ID='" + GWA_ID + '\'' +
                ", GWA='" + GWA + '\'' +
                '}';
    }

    @Override
    public boolean equals(@Nullable Object obj) {
        if (obj instanceof Occupation) {
            Occupation o = (Occupation) obj;
            return o.getSOC_Code().equals(this.getSOC_Code())
                    && o.getTitle().equals(this.getTitle())
                    && o.getTaskId().equals(this.getTaskId())
                    && o.getTask().equals(this.getTask())
                    && o.getDWA_ID().equals(this.getDWA_ID())
                    && o.getDWA_Title().equals(this.getDWA_Title())
                    && o.getIWA_ID().equals(this.getIWA_ID())
                    && o.getIWA_Title().equals(this.getIWA_Title())
                    && o.getGWA_ID().equals(this.getGWA_ID())
                    && o.getGWA().equals(this.getGWA());
        }
        return false;
    }
}
