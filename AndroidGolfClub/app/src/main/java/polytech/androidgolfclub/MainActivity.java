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

import polytech.androidgolfclub.data.DataKeeper;
import polytech.androidgolfclub.webconnector.SocketGolf;


/**
 * Main activity display main menu with buttons to shoot, calibrate, see last shoot
 */
public class MainActivity extends AppCompatActivity {

    private Socket socket;
    private Button newShoot, seeShoot, calibrateSpehro;
    private TextView text;

    private Handler handler = new Handler(Looper.getMainLooper());

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

        // register event
        registerEvents();

        // update buttons view
        update();
    }

    /**
     * Register socket events
     */
    private void registerEvents(){
        socket.on("play", play);
        socket.on("end", end);
    }

    /**
     * Unregister socket events
     */
    private void unregisterEvents(){
        socket.off("play", play);
        socket.off("end", end);
    }

    /**
     * New shoot callback
     * @param view
     */
    public void newShootClick(View view){

        // unregister event
        unregisterEvents();

        // go to shoot activity
        Intent intent = new Intent(this, ShootActivity.class);
        startActivity(intent);
    }

    /**
     * Stat button callback
     * @param view
     */
    public void statsClick(View view){

        // unregister event
        unregisterEvents();

        // go to display results activity
        Intent intent = new Intent(this, DisplayResultsActivity.class);
        startActivity(intent);
    }

    /**
     * Calibrate button callback
     * @param view
     */
    public void calibrateClick(View view){

        // unregister event
        unregisterEvents();

        // go to calibrate activity
        Intent intent = new Intent(this, CalibrateActivity.class);
        startActivity(intent);
    }

    /**
     * Update the view in function of the current player
     * If we are the current player we can unlock shoot button and calibrate button
     */
    private void update() {

        DataKeeper dk = DataKeeper.getInstance();
        final String me = dk.getPlayerName();
        final String current = dk.getCurrentPlayer();
        final boolean gameEnded = dk.isGameEnded();

        if (me != null) {

            if (current != null) {

                // check if the game is ended
                if (gameEnded) {

                    handler.post(new Runnable() {

                        @Override
                        public void run() {
                            newShoot.setEnabled(false);
                            calibrateSpehro.setEnabled(false);
                            text.setText("La partie est terminée !");
                        }
                    });

                } else if (me.equals(current)) {

                    Log.i("MAIN", "It's my turn");

                    handler.post(new Runnable() {

                        @Override
                        public void run() {
                            newShoot.setEnabled(true);
                            calibrateSpehro.setEnabled(true);
                            text.setText(me + ", c'est à toi de jouer");

                        }
                    });

                } else {

                    Log.i("MAIN", "It's " + current + " turn");

                    handler.post(new Runnable() {

                        @Override
                        public void run() {
                            newShoot.setEnabled(false);
                            calibrateSpehro.setEnabled(false);
                            text.setText("C'est à " + current + " de jouer");
                        }
                    });

                }
            }
        }
    }

    /**
     * Play event listener
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

                    // update the view
                    update();
                }

            }).start();
        }
    };

    /**
     * End event listener
     *
     * The player has put the ball in the hole and the game is ended
     */
    private Emitter.Listener end = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            new Thread(new Runnable() {

                @Override
                public void run() {

                    Log.i("socketio", "received event : end");

                    handler.post(new Runnable() {

                        @Override
                        public void run() {

                            DataKeeper.getInstance().setGameEnded(true);

                            // update the view
                            update();
                        }
                    });
                }

            }).start();
        }
    };

    /**
     * Disable back button
     */
    @Override
    public void onBackPressed() {
    }

}
