package polytech.androidgolfclub;

import android.content.Intent;
import android.os.AsyncTask;
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

import polytech.androidgolfclub.webconnector.SocketGolf;
import polytech.androidgolfclub.webconnector.WebConnector;
import polytech.androidgolfclub.webconnector.WebMinigolf;

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
        socket.on("play", play);

        calibrating = false;
    }

    public void calibrate(View v){

        if (!calibrating){

            // start calibration
            calibrating = true;
            btncalibrate.setText(getString(R.string.btniscalibrating));
            progressBar.setVisibility(View.VISIBLE);

            socket.emit("startCalibration", new JSONObject());

        } else {

            // stop calibration
            calibrating = false;
            btncalibrate.setText(getString(R.string.btntocalibrate));
            progressBar.setVisibility(View.GONE);

            socket.emit("stopCalibration", new JSONObject());

            Toast.makeText(this, "Calibration effectuée", Toast.LENGTH_SHORT).show();

        }

    }

    private Emitter.Listener play = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            new Thread(new Runnable() {

                @Override
                public void run() {

                    Log.i("socketio", "received event : play");

                    JSONObject data = (JSONObject) args[0];

                    try {
                        DataKeeper.getInstance().setCurrentPlayer(data.getString("name"));
                    } catch (JSONException e) {
                        return;
                    }
                }

            }).start();
        }
    };

    public void backClick(View view){

        socket.off("play", play);
        Intent i = new Intent(this, MainActivity.class);
        startActivity(i);
    }

}
