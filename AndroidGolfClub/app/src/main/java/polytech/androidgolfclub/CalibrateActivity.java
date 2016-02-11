package polytech.androidgolfclub;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONException;
import org.json.JSONObject;

import polytech.androidgolfclub.data.DataKeeper;
import polytech.androidgolfclub.webconnector.SocketGolf;

/**
 * This activity is used to calibrate the sphero
 */
public class CalibrateActivity extends AppCompatActivity {

    private boolean calibrating;
    private Button btncalibrate;
    private ProgressBar progressBar;

    private Socket socket;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calibrate);

        btncalibrate = (Button) findViewById(R.id.btncalibrate);
        progressBar = (ProgressBar) findViewById(R.id.progressBar);

        socket = SocketGolf.getInstance().getSocket();

        calibrating = false;
    }

    /**
     * Calibrate button callback
     * @param v
     */
    public void calibrate(View v){

        if (!calibrating){

            // start calibration
            calibrating = true;
            btncalibrate.setText(getString(R.string.btniscalibrating));
            progressBar.setVisibility(View.VISIBLE);

            // emit the event to start the calibration
            socket.emit("startCalibration", new JSONObject());

            DataKeeper.getInstance().setHasCalibrate(true);

        } else {

            // stop calibration
            calibrating = false;
            btncalibrate.setText(getString(R.string.btntocalibrate));
            progressBar.setVisibility(View.GONE);

            // emit the event to stop the calibration
            socket.emit("stopCalibration", new JSONObject());

            // display message
            Toast.makeText(this, getString(R.string.calibration_done), Toast.LENGTH_SHORT).show();

        }

    }

    /**
     * Back button callback
     * @param view
     */
    public void backClick(View view){

        if (calibrating){

            // emit the event to stop the calibration
            socket.emit("stopCalibration", new JSONObject());

            // display message
            Toast.makeText(this, getString(R.string.calibration_done), Toast.LENGTH_SHORT).show();
        }

        // go to main activity
        Intent i = new Intent(this, MainActivity.class);
        startActivity(i);
    }

}
