package polytech.androidgolfclub;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONException;
import org.json.JSONObject;

import polytech.androidgolfclub.data.DataKeeper;
import polytech.androidgolfclub.webconnector.SocketGolf;

/**
 * Activity when the shoot is not accepted
 */
public class ShootErrorActivity extends AppCompatActivity {

    private TextView reasonText;
    private Socket socket;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_shoot_error);

        socket = SocketGolf.getInstance().getSocket();
        socket.on("play", play);

        reasonText = (TextView) findViewById(R.id.textViewReason);

        //Get the bundle
        Bundle bundle = getIntent().getExtras();
        Double force = bundle.getDouble("reason");

        switch (force.intValue()) {
            case -4 : reasonText.setText(getString(R.string.error_kinect)); break;
            case -3 : reasonText.setText(getString(R.string.error_connection)); break;
            case -2 : reasonText.setText(getString(R.string.error_server)); break;
            case -1 : reasonText.setText(getString(R.string.dummy_content_fail)); break;
            default : reasonText.setText(getString(R.string.error_unknown)); break;

        }
    }

    public void goMainMenu(View v){

        socket.off("play", play);
        Intent i = new Intent(this, MainActivity.class);
        startActivity(i);
    }

    public void goRetry(View v){

        socket.off("play", play);
        Intent i = new Intent(this, ShootActivity.class);
        startActivity(i);
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

    @Override
    public void onBackPressed() {
    }
}
