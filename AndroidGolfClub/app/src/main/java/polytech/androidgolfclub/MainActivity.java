package polytech.androidgolfclub;

import android.content.Intent;
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

import polytech.androidgolfclub.webconnector.SocketGolf;

public class MainActivity extends AppCompatActivity {

    private Socket socket;
    private Button newShoot, seeShoot, calibrateSpehro;
    private TextView text;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        newShoot = (Button) findViewById(R.id.btnNewShoot);
        seeShoot = (Button) findViewById(R.id.btnSeeShoot);
        calibrateSpehro = (Button) findViewById(R.id.btnCalibrate);
        text = (TextView) findViewById(R.id.text);

        newShoot.setEnabled(false);
        calibrateSpehro.setEnabled(false);

        socket = SocketGolf.getInstance().getSocket();
        socket.on("play", play);
    }

    public void newShootClick(View view){
            Intent intent = new Intent(this, ShootActivity.class);
            startActivity(intent);
    }

    public void statsClick(View view){
        Intent intent = new Intent(this, DisplayResultsActivity.class);
        startActivity(intent);
    }

    public void settingsClick(View view){
        Intent intent = new Intent(this, IpSettingsActivity.class);
        startActivity(intent);
    }

    public void calibrateClick(View view){
        Intent intent = new Intent(this, CalibrateActivity.class);
        startActivity(intent);
    }

    private void update() {

        DataKeeper dk = DataKeeper.getInstance();
        String me = dk.getPlayerName();
        String current = dk.getCurrentPlayer();

        if (me != null){

            if (me.equals(current)){

                Log.i("MAIN", "It's my turn");
                newShoot.setEnabled(true);
                calibrateSpehro.setEnabled(true);
                text.setText(me + ", c'est à toi de jouer");

            } else {

                Log.i("MAIN", "It's " + current + " turn");
                newShoot.setEnabled(false);
                calibrateSpehro.setEnabled(false);
                text.setText(me + ", c'est à " + current + " de jouer");
            }

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

                    update();

                }

            }).start();
        }
    };

    @Override
    public void onBackPressed() {
    }

}
