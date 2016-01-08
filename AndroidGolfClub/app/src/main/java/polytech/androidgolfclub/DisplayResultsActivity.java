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


/**
 *
 * This activity is used to display the datas of the last shoot
 *
 * Created by Romain Guillot on 18/12/15
 *
 */
public class DisplayResultsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_display_results);

        GraphView graph = (GraphView) findViewById(R.id.graph);

        ArrayList<DataPoint> pointsX = new ArrayList<>();
        ArrayList<DataPoint> pointsY = new ArrayList<>();
        ArrayList<DataPoint> pointsZ = new ArrayList<>();

        // get values
        LinkedHashMap<Long, Float[]> points = Results.getInstance().getValues();
        for (Map.Entry<Long,Float[]> e : points.entrySet()){
            Float[] vals = e.getValue();
            pointsX.add(new DataPoint(e.getKey(), vals[0]));
            pointsY.add(new DataPoint(e.getKey(), vals[1]));
            pointsZ.add(new DataPoint(e.getKey(), vals[2]));
        }

        DataPoint[] datapointsX = new DataPoint[points.size()];
        DataPoint[] datapointsY = new DataPoint[points.size()];
        DataPoint[] datapointsZ = new DataPoint[points.size()];
        pointsX.toArray(datapointsX);
        pointsY.toArray(datapointsY);
        pointsZ.toArray(datapointsZ);

        // create series to display
        LineGraphSeries<DataPoint> seriesX = new LineGraphSeries<DataPoint>(datapointsX);
        LineGraphSeries<DataPoint> seriesY = new LineGraphSeries<DataPoint>(datapointsY);
        LineGraphSeries<DataPoint> seriesZ = new LineGraphSeries<DataPoint>(datapointsZ);

        // set graphical information
        seriesX.setTitle("X");
        seriesX.setColor(getResources().getColor(R.color.x_points));
        seriesX.setThickness(5);
        seriesY.setTitle("Y");
        seriesY.setColor(getResources().getColor(R.color.y_points));
        seriesY.setThickness(5);
        seriesZ.setTitle("Z");
        seriesZ.setColor(getResources().getColor(R.color.z_points));
        seriesZ.setThickness(5);

        // add series to the graph
        graph.addSeries(seriesX);
        graph.addSeries(seriesY);
        graph.addSeries(seriesZ);

        graph.getLegendRenderer().setVisible(true);
        graph.getLegendRenderer().setAlign(LegendRenderer.LegendAlign.TOP);

        // set manual x bounds to have nice steps
        graph.getViewport().setMinX(Results.getInstance().getStart());
        graph.getViewport().setMaxX(Results.getInstance().getEnd());
        graph.getViewport().setXAxisBoundsManual(true);

    }
}
