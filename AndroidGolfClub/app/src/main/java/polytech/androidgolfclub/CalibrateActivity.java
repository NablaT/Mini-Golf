package polytech.androidgolfclub;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.Toast;

import polytech.androidgolfclub.webconnector.WebConnector;
import polytech.androidgolfclub.webconnector.WebMinigolf;

public class CalibrateActivity extends AppCompatActivity {

    private boolean calibrating;
    private Button btncalibrate;
    private ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calibrate);

        btncalibrate = (Button) findViewById(R.id.btncalibrate);
        progressBar = (ProgressBar) findViewById(R.id.progressBar);

        calibrating = false;
    }

    public void calibrate(View v){

        if (!calibrating){

            // start calibration
            calibrating = true;
            btncalibrate.setText(getString(R.string.btniscalibrating));
            progressBar.setVisibility(View.VISIBLE);

            new StartCalibrationTask().execute();

        } else {
            // stop calibration
            calibrating = false;
            btncalibrate.setText(getString(R.string.btntocalibrate));
            progressBar.setVisibility(View.GONE);

            new StopCalibrationTask().execute();

            Toast.makeText(this, "Calibration effectuée", Toast.LENGTH_SHORT).show();

        }

    }

    public void backClick(View view){
        Intent i = new Intent(this, MainActivity.class);
        startActivity(i);
    }

    private class StartCalibrationTask extends AsyncTask<Void, Void, Void> {
        @Override
        protected Void doInBackground(Void... params) {
             WebMinigolf.startCalibration();
            return null;
        }
    }

    private class StopCalibrationTask extends AsyncTask<Void, Void, Void> {
        @Override
        protected Void doInBackground(Void... params) {
            WebMinigolf.stopCalibration();
            return null;
        }
    }


}
