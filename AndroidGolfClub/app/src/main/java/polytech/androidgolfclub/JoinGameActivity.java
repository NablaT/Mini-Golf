package polytech.androidgolfclub;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONException;
import org.json.JSONObject;

import polytech.androidgolfclub.data.DataKeeper;
import polytech.androidgolfclub.webconnector.SocketGolf;

/**
 * This class is used to enter a name and join the game
 */
public class JoinGameActivity extends AppCompatActivity {

    private EditText name;
    private Button joinBtn;
    private ProgressBar progressBar;
    private String pseudo;
    private Socket socket;
    private Handler handler = new Handler(Looper.getMainLooper());

    @Override
    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_join_game);

        name = (EditText) findViewById(R.id.name);
        joinBtn = (Button) findViewById(R.id.btnjoin);
        progressBar = (ProgressBar) findViewById(R.id.progressBar);
        progressBar.setVisibility(View.GONE);
        joinBtn.setEnabled(true);

        name.setEnabled(true);

        // button to press OK automatically in the keyboard
        name.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView textView, int id, KeyEvent keyEvent) {
                if (id == EditorInfo.IME_NULL) {
                    joinGame(textView);
                    return true;
                }
                return false;
            }
        });

        socket = SocketGolf.getInstance().getSocket();

        // register events
        registerEvents();

    }

    /**
     * Register events for socket
     */
    private void registerEvents(){
        // gameNotStarted : no game is started on the frontend
        // noPlaceAvailable : all the players are already used
        // waitingToStart : the player has been regsiter, we are waiting for other players
        socket.on("gameNotStarted", gameNotStarted);
        socket.on("noPlaceAvailable", noPlaceAvailable);
        socket.on("waitingToStart", waitingToStart);
        socket.on("nameInvalid", nameInvalid);
    }

    /**
     * Unregister events for the socket
     */
    private void unregisterEvents() {
        socket.off("gameNotStarted", gameNotStarted);
        socket.off("noPlaceAvailable", noPlaceAvailable);
        socket.off("waitingToStart", waitingToStart);
        socket.off("nameInvalid", nameInvalid);

    }

    /**
     * Back button callback
     * @param view
     */
    public void back(View view) {

        // unregister events
        unregisterEvents();

        socket.disconnect();

        // go to ip settings activity
        Intent i = new Intent(getApplicationContext(), IpSettingsActivity.class);
        startActivity(i);

        finish();
    }

    /**
     * Button join game callback
     * @param view
     */
    public void joinGame(View view){

        pseudo = name.getText().toString();

        // check if the input text is not empty
        if (pseudo.length() > 0){

            // construct the object to send
            JSONObject json = new JSONObject();
            try {
                json.put("name", pseudo);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            if (socket.connected()) {

                Log.i("join game", pseudo + " is joigning the game");

                // disable input
                name.setEnabled(false);
                joinBtn.setEnabled(false);

                // show progress bar
                progressBar.setVisibility(View.VISIBLE);

                // emit join game event with the name of the player
                socket.emit("joinGame", json);

            } else {

                Log.i("join game", pseudo + " error connected");

                // display error alert, the ip is not good or the server is down
                AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(JoinGameActivity.this);
                alertDialogBuilder.setMessage("Le serveur n'est pas joignable, vérifiez l'adresse IP et recommencez");
                alertDialogBuilder.setCancelable(false);
                alertDialogBuilder.setPositiveButton("Ok", new DialogInterface.OnClickListener() {

                    @Override
                    public void onClick(DialogInterface arg0, int arg1) {

                        // unregister events
                        unregisterEvents();
                        socket.disconnect();

                        // go to ip settings activity
                        Intent i = new Intent(getApplicationContext(), IpSettingsActivity.class);
                        startActivity(i);

                        finish();
                    }
                });
                ;

                AlertDialog alertDialog = alertDialogBuilder.create();
                alertDialog.show();
            }


        } else {

            Log.i("join game", "name empty");

            // alert because the name is empty
            AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(JoinGameActivity.this);
            alertDialogBuilder.setMessage("Entrez un nom valide !");
            alertDialogBuilder.setCancelable(false);
            alertDialogBuilder.setPositiveButton("Ok", new DialogInterface.OnClickListener() {

                @Override
                public void onClick(DialogInterface arg0, int arg1) {
                    joinBtn.setEnabled(true);
                    name.setEnabled(true);
                    progressBar.setVisibility(View.GONE);
                }
            });
            ;

            AlertDialog alertDialog = alertDialogBuilder.create();
            alertDialog.show();
        }

    }

    /**
     * GameNotStarted event listener
     * If no game was started on the frontend
     */
    private Emitter.Listener gameNotStarted = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            Log.i("socketio", "received event : game not started");

            handler.post(new Runnable() {

                @Override
                public void run() {

                    progressBar.setVisibility(View.GONE);
                    joinBtn.setEnabled(true);
                    name.setEnabled(true);

                    // display error alert
                    AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(JoinGameActivity.this);
                    alertDialogBuilder.setMessage("Le jeu n'a pas été démarré !");
                    alertDialogBuilder.setCancelable(false);
                    alertDialogBuilder.setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface arg0, int arg1) {
                        }
                    });
                    ;

                    AlertDialog alertDialog = alertDialogBuilder.create();
                    alertDialog.show();
                }

            });
        }
    };

    /**
     * noPlaceAvailable event listener
     * If all the player are full
     */
    private Emitter.Listener noPlaceAvailable = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            Log.i("socketio", "received event : no place available");

            handler.post(new Runnable() {

                @Override
                public void run() {

                    progressBar.setVisibility(View.GONE);
                    joinBtn.setEnabled(true);
                    name.setEnabled(true);

                    AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(JoinGameActivity.this);
                    alertDialogBuilder.setMessage("Tous les joueurs sont déjà pris !");
                    alertDialogBuilder.setCancelable(false);
                    alertDialogBuilder.setPositiveButton("Ok", new DialogInterface.OnClickListener() {

                        @Override
                        public void onClick(DialogInterface arg0, int arg1) {
                        }
                    });
                    ;

                    AlertDialog alertDialog = alertDialogBuilder.create();
                    alertDialog.show();

                }

            });
        }
    };

    /**
     * nameInvalid event listener
     * If a player has already the name
     */
    private Emitter.Listener nameInvalid = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            Log.i("socketio", "received event : name invalid");

            handler.post(new Runnable() {

                @Override
                public void run() {

                    progressBar.setVisibility(View.GONE);
                    joinBtn.setEnabled(true);
                    name.setEnabled(true);

                    AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(JoinGameActivity.this);
                    alertDialogBuilder.setMessage("Le nom est déjà pris par un autre joueur!");
                    alertDialogBuilder.setCancelable(false);
                    alertDialogBuilder.setPositiveButton("Ok", new DialogInterface.OnClickListener() {

                        @Override
                        public void onClick(DialogInterface arg0, int arg1) {
                        }
                    });
                    ;

                    AlertDialog alertDialog = alertDialogBuilder.create();
                    alertDialog.show();

                }

            });
        }
    };

    /**
     * waitingToStart event listener
     * If all is ok, we will wait for the other players in an other activity
     */
    private Emitter.Listener waitingToStart = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            handler.post(new Runnable() {

                @Override
                public void run() {

                    Log.i("socketio", "received event : waiting to start");

                    handler.post(new Runnable() {

                        @Override
                        public void run() {
                            progressBar.setVisibility(View.GONE);
                        }
                    });

                    // unregister events
                    unregisterEvents();

                    // set the player name
                    DataKeeper.getInstance().setPlayerName(pseudo);

                    // go to WaitingStartActivity
                    Intent i = new Intent(getApplicationContext(), WaitingStartActivity.class);
                    startActivity(i);

                    finish();

                }

            });
        }
    };

    /**
     * Disable back button
     */
    @Override
    public void onBackPressed() {
    }

}
