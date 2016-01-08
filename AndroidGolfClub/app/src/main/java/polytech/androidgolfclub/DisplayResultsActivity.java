package polytech.androidgolfclub;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.jjoe64.graphview.GraphView;
import com.jjoe64.graphview.LegendRenderer;
import com.jjoe64.graphview.series.DataPoint;
import com.jjoe64.graphview.series.LineGraphSeries;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

public class DisplayResultsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_display_results);

        GraphView graph = (GraphView) findViewById(R.id.graph);

        /* X points */
        ArrayList<DataPoint> pointsX = new ArrayList<>();
        LinkedHashMap<Long, Float> resX =  Results.getInstance().getxValues();
        for (Map.Entry<Long,Float> e : resX.entrySet()){
            pointsX.add(new DataPoint(e.getKey(), e.getValue()));

        }
        DataPoint[] datapointsX = new DataPoint[pointsX.size()];
        pointsX.toArray(datapointsX);
        LineGraphSeries<DataPoint> seriesX = new LineGraphSeries<DataPoint>(datapointsX);

        seriesX.setTitle("X");
        seriesX.setColor(getResources().getColor(R.color.x_points));
        seriesX.setThickness(5);
        graph.addSeries(seriesX);

        /* Y points */
        ArrayList<DataPoint> pointsY = new ArrayList<>();
        LinkedHashMap<Long, Float> resY =  Results.getInstance().getyValues();
        for (Map.Entry<Long,Float> e : resY.entrySet()){
            System.out.println(e.getKey() + " : " + e.getValue());

            pointsY.add(new DataPoint(e.getKey(), e.getValue()));

        }
        DataPoint[] datapointsY = new DataPoint[pointsY.size()];
        pointsY.toArray(datapointsY);
        LineGraphSeries<DataPoint> seriesY = new LineGraphSeries<DataPoint>(datapointsY);

        seriesY.setTitle("Y");
        seriesY.setColor(getResources().getColor(R.color.y_points));
        seriesY.setThickness(5);
        graph.addSeries(seriesY);

        /* Z points */
        ArrayList<DataPoint> pointsZ = new ArrayList<>();
        LinkedHashMap<Long, Float> resZ =  Results.getInstance().getzValues();
        for (Map.Entry<Long,Float> e : resZ.entrySet()){
            pointsZ.add(new DataPoint(e.getKey(), e.getValue()));
        }
        DataPoint[] datapointsZ = new DataPoint[pointsZ.size()];
        pointsZ.toArray(datapointsZ);
        LineGraphSeries<DataPoint> seriesZ = new LineGraphSeries<DataPoint>(datapointsZ);

        seriesZ.setTitle("Z");
        seriesZ.setColor(getResources().getColor(R.color.z_points));
        seriesZ.setThickness(5);
        graph.addSeries(seriesZ);

        graph.getLegendRenderer().setVisible(true);
        graph.getLegendRenderer().setAlign(LegendRenderer.LegendAlign.TOP);

        // set manual x bounds to have nice steps
        graph.getViewport().setMinX(Results.getInstance().getStart());
        graph.getViewport().setMaxX(Results.getInstance().getEnd());
        graph.getViewport().setXAxisBoundsManual(true);

    }
}
