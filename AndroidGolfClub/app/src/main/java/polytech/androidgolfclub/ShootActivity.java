package polytech.androidgolfclub;

import android.content.Context;

import android.content.Intent;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.AsyncTask;
import android.os.Vibrator;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;

import java.util.Calendar;

/**
 *
 * This activity is used to detect the shoot and save the datas
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

                            new SendReadyTask().execute();

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
                            resultShoot.setEnd(timeEndShoot - timeStartShoot);

                            // tir effectué
                            // send datas to server
                            new SendDatasTask().execute();

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
     * Send ready state to server
     */
    private class SendReadyTask extends AsyncTask<Void, Void, Boolean> {

        @Override
        protected Boolean doInBackground(Void... params) {
            return WebConnector.ready();
        }

        @Override
        protected void onPostExecute(Boolean isOK) {

            if (!isOK){

                Log.i("GOLF", "Position on kinect not set");

                vibrator.vibrate(PATTERN_VIBRATOR_ERROR, -1);

                mContentView.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));
                mtextContentView.setText(getResources().getText(R.string.dummy_content_fail));

                Intent i = new Intent(ShootActivity.this, ShootErrorActivity.class);
                Bundle bundle = new Bundle();
                bundle.putDouble("reason", -4);
                i.putExtras(bundle);
                startActivity(i);
            }
        }
    }

        /**
     * Send datas to server task
     * It also receive the response
     */
    private class SendDatasTask extends AsyncTask<String, Void, Double> {


        protected Double doInBackground(String... urls) {

            // Send datas to server
            return WebConnector.go();
        }

        @Override
        protected void onPostExecute(Double force) {


            if (force>0){

                // shoot accepted
                // vibration de confirmation
                vibrator.vibrate(500);

                resultShoot.setForce(force);
                mContentView.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));
                mtextContentView.setText(getResources().getText(R.string.dummy_content_after));

                Intent i = new Intent(ShootActivity.this, ShootAcceptedActivity.class);

                startActivity(i);

            } else {


                // erreur de tir

                if (force==-3){

                    // connectivity error
                    Log.i("GOLF", "CONNECTIVITY ERROR");
                } else if (force == -2) {

                    // server error
                    Log.i("GOLF", "SERVER ERROR");
                } else if (force == -1) {

                    // shoot not accepted by the server
                    Log.i("GOLF", "SHOOT ERROR");
                }

                vibrator.vibrate(PATTERN_VIBRATOR_ERROR, -1);

                mContentView.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));
                mtextContentView.setText(getResources().getText(R.string.dummy_content_fail));

                Intent i = new Intent(ShootActivity.this, ShootErrorActivity.class);
                Bundle bundle = new Bundle();
                bundle.putDouble("reason", force);
                i.putExtras(bundle);
                startActivity(i);

            }

        }
    }
}
