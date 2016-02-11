package polytech.androidgolfclub;

import android.content.Context;

import android.content.Intent;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.AsyncTask;
import android.os.Looper;
import android.os.Vibrator;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.Map;

import polytech.androidgolfclub.data.DataKeeper;
import polytech.androidgolfclub.data.Results;
import polytech.androidgolfclub.webconnector.SocketGolf;
import polytech.androidgolfclub.webconnector.WebMinigolf;

/**
 *
 * This activity is used to detect the shoot and save the datas
 * Process :
 * 1) user put finger on the screen
 * 2) send ready event to server
 * 3) receive ready response
 * 4) user shoot : accelerometer get and save movement information
 * 5) user relash his finger
 * 6) send go event with datas of the shoot
 * 7) receive goResponse : if the shoot is accepted : go ShootAcceptedActivity /// otherwise go to ShootErrorActivity
 *
 * Created by Romain Guillot on 18/12/15
 *
 */
public class ShootActivity extends AppCompatActivity {

    private static long[] PATTERN_VIBRATOR_ERROR = {0, 200, 200, 300, 200};

    private View mContentView;
    private TextView mtextContentView;
    private SensorManager senSensorManager;
    private ShootSensorListener senListener;
    private Sensor senAccelerometer;
    private Vibrator vibrator;

    private boolean shooting;
    private boolean hasJustShoot;
    private boolean shootCanceled = false;

    private long timeStartShoot;

    private Results resultShoot;
    private Socket socket;

    private Handler handler = new Handler(Looper.getMainLooper());
    private MediaPlayer player;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_shoot);

        mContentView = findViewById(R.id.fullscreen_content);
        mtextContentView = (TextView) findViewById(R.id.fullscreen_content);

        shooting = false;
        hasJustShoot = false;

        // object to save the results
        resultShoot = Results.getInstance();

        // get the socket and register the events
        socket = SocketGolf.getInstance().getSocket();
        registerSocketListeners();

        // register the accelometer
        senSensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);
        senAccelerometer = senSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        senListener = new ShootSensorListener();

        vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);

        mContentView.setOnTouchListener(new View.OnTouchListener() {

            @Override
            public boolean onTouch(View v, MotionEvent event) {

                switch (event.getActionMasked()) {
                    case MotionEvent.ACTION_DOWN: {

                        if (!hasJustShoot) {

                            resultShoot.clearValues();
                            shooting = true;

                            Log.i("TOUCH", "TOUCH DOWN !");

                            // launch the event that the player is ready (touch down)
                            if (socket.connected()) {

                                Log.i("socketio", "emit event ready");
                                socket.emit("ready", new JSONObject());

                                vibrator.vibrate(50);
                                timeStartShoot = Calendar.getInstance().getTimeInMillis();
                                resultShoot.setStart(0l);

                                mContentView.setBackgroundColor(getResources().getColor(R.color.colorAccent));
                                mtextContentView.setText(getResources().getText(R.string.dummy_content_shoot));

                            } else {
                                connectivityError();
                            }

                        }

                        break;
                    }
                    case MotionEvent.ACTION_UP: {

                        if (!hasJustShoot) {

                            shooting = false;
                            hasJustShoot = true;

                            Log.d("TOUCH", "TOUCH UP");

                            long timeEndShoot = Calendar.getInstance().getTimeInMillis();
                            resultShoot.setEnd(timeEndShoot - timeStartShoot);

                            // tir effectué
                            // send datas to server
                            if (!shootCanceled) { // check if the shoot has been canceled
                                sendShoot();
                            }

                        }

                        break;
                    }
                }

                return true;
            }
        });

    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.i("GOLF", "onPause");
        senSensorManager.unregisterListener(senListener);
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.i("GOLF", "onResume");
        senSensorManager.registerListener(senListener, senAccelerometer, SensorManager.SENSOR_DELAY_FASTEST);
    }

    /**
     * Register events
     */
    private void registerSocketListeners() {
        socket.on("readyResponse", readyResponse);
        socket.on("goResponse", goResponse);
        socket.on("play", play);
    }

    /**
     * Unregister events
     */
    private void unregisterSocketListeners() {
        socket.off("readyResponse", readyResponse);
        socket.off("goResponse", goResponse);
        socket.off("play", play);
    }

    /**
     * Big fzil song
     */
    private class PlaySongFailTask extends AsyncTask<Void, Void, Void> {

        @Override
        protected void onPreExecute() {

            setVolumeControlStream(AudioManager.STREAM_MUSIC);
            player = MediaPlayer.create(ShootActivity.this, R.raw.fail);
        }

        @Override
        protected Void doInBackground(Void... params) {

            player.start();
            return null;
        }
    }

    /**
     * Big shoot song
     */
    private class PlaySongShootTask extends AsyncTask<Void, Void, Void> {

        @Override
        protected void onPreExecute() {

            setVolumeControlStream(AudioManager.STREAM_MUSIC);
            player = MediaPlayer.create(ShootActivity.this, R.raw.shoot);
        }

        @Override
        protected Void doInBackground(Void... params) {

            player.start();
            return null;
        }
    }

    /**
     * Small shoot song
     */
    private class PlaySongPutterShootTask extends AsyncTask<Void, Void, Void> {

        @Override
        protected void onPreExecute() {
            setVolumeControlStream(AudioManager.STREAM_MUSIC);
            player = MediaPlayer.create(ShootActivity.this, R.raw.shoot_putter);
        }

        @Override
        protected Void doInBackground(Void... params) {
            player.start();
            return null;
        }
    }

    /**
     * Listener for ready response event
     */
    private Emitter.Listener readyResponse = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            Log.i("socketio", "received event : ready response");

            JSONObject data = (JSONObject) args[0];

            String rep = null;
            try {
                rep = data.getString("response");
                if ("ok".equals(rep)) {
                    shootCanceled = false;
                } else {
                    kinectNotSetError();
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }
    };

    /**
     * Listener for go response event
     */
    private Emitter.Listener goResponse = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            Log.i("socketio", "received event : go response");

            JSONObject resp = (JSONObject) args[0];

            try {

                Log.i("GOLF", "cccc");

                boolean valid = resp.getBoolean("valid");
                final double force = resp.getDouble("strike_force");

                // test if the shoot is considered as valid by the server
                if (!valid) {

                    Log.i("GOLF", "Shoot not valid");
                    shootError(-1);

                } else {

                    Log.i("GOLF", "Shoot AND ACCEPTED F=" + force);

                    handler.post(new Runnable() {

                        @Override
                        public void run() {

                            resultShoot.setForce(force);

                            // shoot accepted
                            // vibration de confirmation
                            vibrator.vibrate(500);

                            // Great shoot
                            // Play the song
                            if (Results.getInstance().getForce()*10 < 30) {
                                // short shoot, it's a putt
                                new PlaySongPutterShootTask().executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
                            } else {
                                new PlaySongShootTask().executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
                            }

                            mContentView.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));
                            mtextContentView.setText(getResources().getText(R.string.dummy_content_after));

                            unregisterSocketListeners();

                            // go to shoot accepted activity
                            Intent i = new Intent(ShootActivity.this, ShootAcceptedActivity.class);
                            startActivity(i);

                        }

                    });

                }
            } catch (JSONException e) {
                Log.i("GOLF", "JSON parse error");
                shootError(-3);
            }

        }
    };

    /**
     * Listener for play event
     * Not supposed to arrive
     */
    private Emitter.Listener play = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            new Thread(new Runnable() {

                @Override
                public void run() {

                    Log.i("socketio", "received event : play");

                    JSONObject data = (JSONObject) args[0];

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
     * This method is called when there is a connectivy error withe server on socket io
     */
    private void connectivityError() {

        Log.i("GOLF", "CONNECTIVITY ERROR");
        shootCanceled = true;
        shootError(-3);
    }

    /**
     * This method is called when the position of the player is not set by the kinect
     */
    private void kinectNotSetError() {

        Log.i("GOLF", "Position on kinect not set");
        shootCanceled = true;
        shootError(-4);
    }

    /**
     * THis medthod is called in case of error during the shoot
     *
     * @param error the error code you can find in ShootErrorActivity
     */
    private void shootError(final int error) {

        handler.post(new Runnable() {

            @Override
            public void run() {

                // fail song
                new PlaySongFailTask().executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);

                vibrator.vibrate(PATTERN_VIBRATOR_ERROR, -1);

                mContentView.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));
                mtextContentView.setText(getResources().getText(R.string.dummy_content_fail));

                // unregister listeners
                socket.off("readyResponse", readyResponse);
                socket.off("goResponse", goResponse);
                socket.off("play", play);

                // go to shoot error activity
                Intent i = new Intent(ShootActivity.this, ShootErrorActivity.class);
                Bundle bundle = new Bundle();

                // set the reason
                bundle.putDouble("reason", error);
                i.putExtras(bundle);
                startActivity(i);
            }
        });
    }

    /**
     * THis medthod is called when a shoot is valid
     * Construct the json to send to the server with the datas of the shoot and send it by socket io
     */
    private void sendShoot() {

        // the object with the datas of the shoot to send
        JSONArray json = new JSONArray();

        // get the values
        LinkedHashMap<Long, Float[]> values = Results.getInstance().getValues();

        // construct the json to send
        for (Map.Entry<Long, Float[]> entry : values.entrySet()) {
            try {
                JSONObject object = new JSONObject();
                Float[] vals = entry.getValue();

                object.put("t", entry.getKey());
                object.put("x", vals[0]);
                object.put("y", vals[1]);
                object.put("z", vals[2]);

                json.put(object);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        // emit the evnt with the datas to the server
        if (socket.connected()) {
            socket.emit("go", json);
        } else {
            connectivityError();
        }
    }

    /**
     * Accelerometer listener
     * Save the datas of the movement
     */
    private class ShootSensorListener implements SensorEventListener {

        @Override
        public void onSensorChanged(SensorEvent event) {

            if (shooting) {
                Long now = Calendar.getInstance().getTimeInMillis();
                if (now != null){
                    Long time = now - timeStartShoot;
                    resultShoot.addValue(time, event.values[0], event.values[1], event.values[2]);
                }
            }
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {
        }

    }

    @Override
    public void onBackPressed() {
        unregisterSocketListeners();
        super.onBackPressed();
    }
}
