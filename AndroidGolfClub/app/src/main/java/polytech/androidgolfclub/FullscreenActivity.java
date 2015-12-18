package polytech.androidgolfclub;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.res.ColorStateList;
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

/**
 * Created by Romain Guillot on 18/12/15
 *
 */
public class FullscreenActivity extends AppCompatActivity implements SensorEventListener {

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
    private View mControlsView;
    private TextView mtextContentView;
    private boolean mVisible;
    private SensorManager senSensorManager;
    private Sensor senAccelerometer;
    private Vibrator vibrator;

    private boolean shooting;
    private boolean hasJustShoot;

    private long timeStartShoot;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_fullscreen);

        mVisible = true;
        mControlsView = findViewById(R.id.fullscreen_content_controls);
        mContentView = findViewById(R.id.fullscreen_content);
        mtextContentView = (TextView) findViewById(R.id.fullscreen_content);

        shooting = false;
        hasJustShoot = false;

        // Upon interacting with UI controls, delay any scheduled hide()
        // operations to prevent the jarring behavior of controls going away
        // while interacting with the UI.
//        findViewById(R.id.dummy_button).setOnTouchListener(mDelayHideTouchListener);

        senSensorManager = (SensorManager)getSystemService(SENSOR_SERVICE);
        senAccelerometer = senSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);

        vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);

        mContentView.setOnTouchListener(new View.OnTouchListener() {

            @Override
            public boolean onTouch(View v, MotionEvent event) {

                switch (event.getActionMasked()) {
                    case MotionEvent.ACTION_DOWN: {

                        if (!hasJustShoot) {

                            shooting = true;

                            Log.d("TOUCH", "TOUCH DOWN !");

                            vibrator.vibrate(50);
                            timeStartShoot = System.currentTimeMillis();

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

                            long timeEndShoot = System.currentTimeMillis();

                            if (timeEndShoot-timeStartShoot < MINIMUM_SHOOT_TIME){

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

                                vibrator.vibrate(500);

                                mContentView.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));
                                mtextContentView.setText(getResources().getText(R.string.dummy_content_after));

                                // change text for the next shoot
                                mHideHandler.postDelayed(new Runnable() {
                                    @Override
                                    public void run() {
                                        mtextContentView.setText(getResources().getText(R.string.dummy_content_before));
                                        hasJustShoot = false;
                                    }
                                }, TIME_BEFORE_NEXT_SHOOT);

                                // send datas to server
                                new SendDatasTask().execute();

                            }

                        }

                        break;
                    }
                }

                return true;
            }
        });

    }


    class SendDatasTask extends AsyncTask<String, Void, Boolean> {


        protected Boolean doInBackground(String... urls) {

            // Send datas to server
            WebConnector.sendShoot("coucou");
            return true;
        }

    }

    @Override
    protected void onPostCreate(Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);

        // Trigger the initial hide() shortly after the activity has been
        // created, to briefly hint to the user that UI controls
        // are available.
        delayedHide(100);
    }

    /**
     * Touch listener to use for in-layout UI controls to delay hiding the
     * system UI. This is to prevent the jarring behavior of controls going away
     * while interacting with activity UI.
     */
   /* private final View.OnTouchListener mDelayHideTouchListener = new View.OnTouchListener() {
        @Override
        public boolean onTouch(View view, MotionEvent motionEvent) {
            if (AUTO_HIDE) {
                delayedHide(AUTO_HIDE_DELAY_MILLIS);
            }
            return false;
        }
    }; */

    private void toggle() {
        if (mVisible) {
            hide();
        } else {
            show();
        }
    }

    private void hide() {
        // Hide UI first
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.hide();
        }
        mControlsView.setVisibility(View.GONE);
        mVisible = false;

        // Schedule a runnable to remove the status and navigation bar after a delay
        mHideHandler.removeCallbacks(mShowPart2Runnable);
        mHideHandler.postDelayed(mHidePart2Runnable, UI_ANIMATION_DELAY);
    }

    private final Runnable mHidePart2Runnable = new Runnable() {
        @SuppressLint("InlinedApi")
        @Override
        public void run() {
            // Delayed removal of status and navigation bar

            // Note that some of these constants are new as of API 16 (Jelly Bean)
            // and API 19 (KitKat). It is safe to use them, as they are inlined
            // at compile-time and do nothing on earlier devices.
            mContentView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LOW_PROFILE
                    | View.SYSTEM_UI_FLAG_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION);
        }
    };

    @SuppressLint("InlinedApi")
    private void show() {
        // Show the system bar
        mContentView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION);
        mVisible = true;

        // Schedule a runnable to display UI elements after a delay
        mHideHandler.removeCallbacks(mHidePart2Runnable);
        mHideHandler.postDelayed(mShowPart2Runnable, UI_ANIMATION_DELAY);
    }


    private final Runnable mShowPart2Runnable = new Runnable() {
        @Override
        public void run() {
            // Delayed display of UI elements
            ActionBar actionBar = getSupportActionBar();
            if (actionBar != null) {
                actionBar.show();
            }
            mControlsView.setVisibility(View.VISIBLE);
        }
    };

    private final Handler mHideHandler = new Handler();
    private final Runnable mHideRunnable = new Runnable() {
        @Override
        public void run() {
            hide();
        }
    };

    /**
     * Schedules a call to hide() in [delay] milliseconds, canceling any
     * previously scheduled calls.
     */
    private void delayedHide(int delayMillis) {
        mHideHandler.removeCallbacks(mHideRunnable);
        mHideHandler.postDelayed(mHideRunnable, delayMillis);
    }

    @Override
    protected void onPause() {
        super.onPause();
        senSensorManager.unregisterListener(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        senSensorManager.registerListener(this, senAccelerometer , SensorManager.SENSOR_DELAY_NORMAL);
    }


    @Override
    public void onSensorChanged(SensorEvent event) {
        if (shooting){
            Log.d("SENSOR", "x = [" + Float.toString(event.values[0]) + "], y = ["+ Float.toString(event.values[1]) + "], z = ["+ Float.toString(event.values[2]) + "]");
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        Log.d("SENSOR", "Accuracy changed");
    }
}
