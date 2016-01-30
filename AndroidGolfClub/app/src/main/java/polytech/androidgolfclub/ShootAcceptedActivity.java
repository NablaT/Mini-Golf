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
import android.widget.Button;
import android.widget.TextView;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.DecimalFormat;

import polytech.androidgolfclub.webconnector.SocketGolf;

public class ShootAcceptedActivity extends AppCompatActivity {

    private TextView forceText;
    private Button btnReshoot;
    private Socket socket;

    private Handler handler = new Handler(Looper.getMainLooper());

    public ShootAcceptedActivity(){}

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_shoot_accepted);

        socket = SocketGolf.getInstance().getSocket();
        socket.on("play", play);

        forceText = (TextView) findViewById(R.id.textViewForce);
        btnReshoot = (Button) findViewById(R.id.btnReshoot);

        DecimalFormat df = new java.text.DecimalFormat("0.##");
        String fText =  df.format(Results.getInstance().getForce()*10);

        forceText.setText(fText + "");
    }

    public void goMainMenu(View v){

        socket.off("play", play);
        Intent i = new Intent(this, MainActivity.class);
        startActivity(i);
    }

    public void goDisplayResults(View v){

        socket.off("play", play);
        Intent i = new Intent(this, DisplayResultsActivity.class);
        startActivity(i);
    }

    public void goShoot(View v){

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

                    handler.post(new Runnable() {

                        @Override
                        public void run() {


                            // disable button because it's somebody else turn
                            btnReshoot.setEnabled(false);

                            new AlertDialog.Builder(ShootAcceptedActivity.this)
                                    .setTitle(R.string.next_player_event_title)
                                    .setPositiveButton(R.string.next_player_confirm_yes, new DialogInterface.OnClickListener() {
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

    @Override
    public void onBackPressed() {
    }
}
