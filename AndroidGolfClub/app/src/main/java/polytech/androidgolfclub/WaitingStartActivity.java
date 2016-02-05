package polytech.androidgolfclub;

import android.content.Intent;
import android.media.MediaPlayer;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.Socket;

import polytech.androidgolfclub.webconnector.SocketGolf;

/**
 * Waiting for other player activity
 * Display while the party is not started
 */
public class WaitingStartActivity extends AppCompatActivity {

    private Socket socket;
    private MediaPlayer player;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_waiting_start);

        socket = SocketGolf.getInstance().getSocket();
        socket.on("gameStart", gameStart);

        new PlaySongWaitingTask().executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }


    /**
     * Waiting music
     */
    private class PlaySongWaitingTask extends AsyncTask<Void, Void, Void> {

        @Override
        protected void onPreExecute() {
            player = MediaPlayer.create(WaitingStartActivity.this, R.raw.waiting_song);
            player.setLooping(true);
        }

        @Override
        protected Void doInBackground(Void... params) {
            player.start();
            return null;
        }
    }

    /**
     * Gamestart event listener
     * All the users are kept
     */
    private Emitter.Listener gameStart = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            new Thread(new Runnable() {

                @Override
                public void run() {

                    Log.i("socketio", "received event : game start");

                    // unregister event
                    socket.off("gameStart", gameStart);

                    // stop music
                    player.stop();

                    // go to main activity
                    Intent i = new Intent(getApplicationContext(), MainActivity.class);
                    startActivity(i);

                    finish();

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
