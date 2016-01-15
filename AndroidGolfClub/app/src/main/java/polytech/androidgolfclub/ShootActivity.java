package polytech.androidgolfclub;

import android.annotation.SuppressLint;
import android.content.Context;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.AsyncTask;
import android.os.Vibrator;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Calendar;

/**
 *
 * This activity is used to detect the shoot and save the datas
 *
 * Created by Romain Guillot on 18/12/15
 *
 */
public class ShootActivity extends AppCompatActivity {

    /**
     * Whether or not the system UI should be auto-hidden after
     * {@link #AUTO_HIDE_DELAY_MILLIS} milliseconds.
     */
    private static final boolean AUTO_HIDE = true;

    /**
     * If {@link #AUTO_HIDE} is set, the number of milliseconds to wait after
     * user interaction before hiding the system UI.
     */
    private static final int AUTO_HIDE_DELAY_MILLIS = 3000;

    /**
     * Some older devices needs a small delay between UI widget updates
     * and a change of the status and navigation bar.
     */
    private static final int UI_ANIMATION_DELAY = 300;

    private static final int TIME_BEFORE_NEXT_SHOOT = 10000;

    private static final int MINIMUM_SHOOT_TIME = 1000;

    private static long[] PATTERN_VIBRATOR_ERROR = {0, 200, 200, 300, 200};

    private View mContentView;
    private TextView mtextContentView;
    private SensorManager senSensorManager;
    private ShootSensorListener senListener;
    private Sensor senAccelerometer;
    private Vibrator vibrator;

    private boolean shooting;
    private boolean hasJustShoot;

    private long timeStartShoot;

    private Results resultShoot;
    private final Handler mHideHandler = new Handler();


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_shoot);

        mContentView = findViewById(R.id.fullscreen_content);
        mtextContentView = (TextView) findViewById(R.id.fullscreen_content);

        shooting = false;
        hasJustShoot = false;

        resultShoot = Results.getInstance();

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

                            Log.d("TOUCH", "TOUCH DOWN !");

                            vibrator.vibrate(50);
                            timeStartShoot = Calendar.getInstance().getTimeInMillis();
                            resultShoot.setStart(0l);

                            mContentView.setBackgroundColor(getResources().getColor(R.color.colorAccent));
                            mtextContentView.setText(getResources().getText(R.string.dummy_content_shoot));
                        }

                        break;
                    }
                    case MotionEvent.ACTION_UP: {

                        if (!hasJustShoot) {

                            shooting = false;
                            hasJustShoot = true;

                            Log.d("TOUCH", "TOUCH UP");

                            long timeEndShoot = Calendar.getInstance().getTimeInMillis();

                            if (timeEndShoot - timeStartShoot < MINIMUM_SHOOT_TIME) {

                                // erreur de tir ou tir impossible car trop court
                                vibrator.vibrate(PATTERN_VIBRATOR_ERROR, -1);

                                mContentView.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));
                                mtextContentView.setText(getResources().getText(R.string.dummy_content_fail));

                                // change text for the next shoot
                                mHideHandler.postDelayed(new Runnable() {
                                    @Override
                                    public void run() {
                                        mtextContentView.setText(getResources().getText(R.string.dummy_content_before));
                                        hasJustShoot = false;
                                    }
                                }, TIME_BEFORE_NEXT_SHOOT);

                            } else {

                                // tir effectué et valide

                                // send datas to server
                                new SendDatasTask().execute();

                                // vibration de confirmation
                                vibrator.vibrate(500);

                                resultShoot.setEnd(timeEndShoot - timeStartShoot);

                                mContentView.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));
                                mtextContentView.setText(getResources().getText(R.string.dummy_content_after));

                                Log.i("GOLF", "Data size : " + resultShoot.getValues().size());

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
     * Accelerometer listener
     * Save the datas of the movement
     */
    private class ShootSensorListener implements SensorEventListener {

        @Override
        public void onSensorChanged(SensorEvent event) {

            if (shooting){
                Long time = Calendar.getInstance().getTimeInMillis()-timeStartShoot;
                resultShoot.addValue(time, event.values[0], event.values[1], event.values[2]);
            }
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {

        }

    }

    /**
     * Send datas to server task
     * It also receive the response
     */
    private class SendDatasTask extends AsyncTask<String, Void, Double> {


        protected Double doInBackground(String... urls) {

            // Send datas to server
            return WebConnector.sendShoot();
        }

        @Override
        protected void onPostExecute(Double force) {

            if (force==-3){

                // connectivity error

            } else if (force == -2) {

                // server error

            } else if (force == -1) {

                // shoot not accepted by the server

            } else {

                // shoot accepted
                Results.getInstance().setForce(force);
                
            }
            if (force>0){
                Toast.makeText(getApplicationContext(), "Tir envoyé au serveur", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(getApplicationContext(), "Erreur lors de l'envoi du tir au serveur", Toast.LENGTH_SHORT).show();
            }
        }
    }
}
