package polytech.androidgolfclub;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.Socket;
import com.jjoe64.graphview.GraphView;
import com.jjoe64.graphview.LegendRenderer;
import com.jjoe64.graphview.series.DataPoint;
import com.jjoe64.graphview.series.LineGraphSeries;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

import polytech.androidgolfclub.data.DataKeeper;
import polytech.androidgolfclub.data.Results;
import polytech.androidgolfclub.webconnector.SocketGolf;


/**
 *
 * This activity is used to display the datas of the last shoot
 *
 * Created by Romain Guillot on 18/12/15
 *
 */
public class DisplayResultsActivity extends AppCompatActivity {

    private Socket socket;
    private Handler handler = new Handler(Looper.getMainLooper());


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_display_results);

        socket = SocketGolf.getInstance().getSocket();

        // register events
        registerEvents();

        GraphView graph = (GraphView) findViewById(R.id.graph);

        // create 3 curves for the 3 axes of the movement
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

    /**
     * Register socket events
     */
    private void registerEvents(){
        socket.on("play", play);
        socket.on("end", end);
    }

    /**
     * Unregister socket events
     */
    private void unregisterEvents(){
        socket.off("play", play);
        socket.off("end", end);
    }

    /**
     * Go back callback
     * @param v
     */
    public void goMenu(View v){

        // unregister event
        unregisterEvents();

        // go to main activity
        Intent i = new Intent(this, MainActivity.class);
        startActivity(i);
    }

    /**
     * Oveeride back button
     */
    @Override
    public void onBackPressed() {
        goMenu(null);
    }

    /**
     * Play event listener
     */
    private Emitter.Listener play = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            new Thread(new Runnable() {

                @Override
                public void run() {

                    Log.i("socketio", "received event : play");

                    JSONObject data = (JSONObject) args[0];

                    DataKeeper.getInstance().setHasCalibrate(false);

                    try {
                        // change current player
                        DataKeeper.getInstance().setCurrentPlayer(data.getString("name"));
                    } catch (JSONException e) {
                        return;
                    }
                }

            }).start();
        }
    };

    /**
     * End event listener
     *
     * An other player has put the ball in the hole and the game is ended
     */
    private Emitter.Listener end = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            new Thread(new Runnable() {

                @Override
                public void run() {

                    Log.i("socketio", "received event : end");

                    handler.post(new Runnable() {

                        @Override
                        public void run() {

                            DataKeeper.getInstance().setGameEnded(true);

                            // display felicitation message
                            // its now the next player turn
                            new AlertDialog.Builder(DisplayResultsActivity.this)
                                    .setCancelable(false)
                                    .setTitle(R.string.end_game_title)
                                    .setPositiveButton(R.string.end_game_confirm_yes, new DialogInterface.OnClickListener() {
                                        @Override
                                        public void onClick(DialogInterface dialog, int which) {
                                        }
                                    })
                                    .show();
                        }});
                }

            }).start();
        }
    };

}
