package polytech.androidgolfclub;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.AsyncTask;
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

import polytech.androidgolfclub.data.DataKeeper;
import polytech.androidgolfclub.data.Results;
import polytech.androidgolfclub.webconnector.SocketGolf;

public class ShootAcceptedActivity extends AppCompatActivity {

    private MediaPlayer player;

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

        // register events
        registerEvents();

        forceText = (TextView) findViewById(R.id.textViewForce);
        btnReshoot = (Button) findViewById(R.id.btnReshoot);

        // string format to display strike force
        DecimalFormat df = new java.text.DecimalFormat("0.##");
        String fText =  df.format(Results.getInstance().getForce()*10);
        forceText.setText(fText + "");
    }

    private void registerEvents(){
        socket.on("play", play);
        socket.on("end", end);
        socket.on("outOfMap", outOfMap);
    }

    private void unregisterEvents(){
        socket.off("play", play);
        socket.off("end", end);
        socket.off("outOfMap", outOfMap);
    }

    /**
     * Go main menu callback
     * @param v
     */
    public void goMainMenu(View v){

        // unregister event
        unregisterEvents();

        // go to main activity
        Intent i = new Intent(ShootAcceptedActivity.this, MainActivity.class);
        startActivity(i);
    }

    /**
     * Go display results callback
     * @param v
     */
    public void goDisplayResults(View v){

        // unregister event
        unregisterEvents();

        // go display results activity
        Intent i = new Intent(ShootAcceptedActivity.this, DisplayResultsActivity.class);
        startActivity(i);
    }

    /**
     * Retry shoot callback
     * @param v
     */
    @Deprecated
    public void goShoot(View v){

        // unregister event
        unregisterEvents();

        // return to shoot activity
        Intent i = new Intent(ShootAcceptedActivity.this, ShootActivity.class);
        startActivity(i);
    }

    /**
     * Play ball in hole song
     */
    private class PlaySongInHoleTask extends AsyncTask<Void, Void, Void> {

        @Override
        protected void onPreExecute() {

            setVolumeControlStream(AudioManager.STREAM_MUSIC);
            player = MediaPlayer.create(ShootAcceptedActivity.this, R.raw.in_hole);
        }

        @Override
        protected Void doInBackground(Void... params) {

            player.start();
            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            new PlaySongApplauseTask().executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
        }
    }

    /**
     * Applause the player
     */
    private class PlaySongApplauseTask extends AsyncTask<Void, Void, Void> {

        @Override
        protected void onPreExecute() {
            player = MediaPlayer.create(ShootAcceptedActivity.this, R.raw.applause);
        }

        @Override
        protected Void doInBackground(Void... params) {
            player.start();
            return null;
        }
    }

    /**
     * Play event listener
     * This is where this event is supposed to arrive
     *
     * The player has put the ball in the hole !
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
                        // set the new current player
                        DataKeeper.getInstance().setCurrentPlayer(data.getString("name"));
                    } catch (JSONException e) {
                        return;
                    }

                    handler.post(new Runnable() {

                        @Override
                        public void run() {

                            // Great, ball in hole !
                            // Play the song
                            new PlaySongInHoleTask().executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);

                            // disable button because it's somebody else turn
                            btnReshoot.setEnabled(false);

                            // display felicitation message
                            // its now the next player turn
                            new AlertDialog.Builder(ShootAcceptedActivity.this)
                                    .setCancelable(false)
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


                                    // disable button because it's somebody else turn
                                    btnReshoot.setEnabled(false);

                                    // display felicitation message
                                    // its now the next player turn
                                    new AlertDialog.Builder(ShootAcceptedActivity.this)
                                            .setCancelable(false)
                                            .setTitle(R.string.end_game_title)
                                            .setPositiveButton(R.string.end_game_confirm_yes, new DialogInterface.OnClickListener() {
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

    /**
     * outOfMap event listener
     *
     * The player has put the ball out of the map
     * Tell him to put the ball on the start point and recalibrate the ball
     */
    private Emitter.Listener outOfMap = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            new Thread(new Runnable() {

                @Override
                public void run() {

                    Log.i("socketio", "received event : outOfMap");

                    handler.post(new Runnable() {

                        @Override
                        public void run() {


                            // disable button because it's somebody else turn
                            btnReshoot.setEnabled(false);

                            // display felicitation message
                            // its now the next player turn
                            new AlertDialog.Builder(ShootAcceptedActivity.this)
                                    .setCancelable(false)
                                    .setTitle(R.string.out_of_map_title)
                                    .setMessage(R.string.out_of_map_message)
                                    .setPositiveButton(R.string.out_of_map_yes, new DialogInterface.OnClickListener() {
                                        @Override
                                        public void onClick(DialogInterface dialog, int which) {

                                            // unregister event
                                            unregisterEvents();

                                            // return to shoot activity
                                            Intent i = new Intent(ShootAcceptedActivity.this, CalibrateActivity.class);
                                            startActivity(i);
                                        }
                                    })
                                    .show();
                        }});
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
