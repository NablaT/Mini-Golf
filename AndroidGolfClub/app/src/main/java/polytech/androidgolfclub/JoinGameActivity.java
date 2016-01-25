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
import android.widget.Toast;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONException;
import org.json.JSONObject;

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
        socket.on("gameNotStarted", gameNotStarted);
        socket.on("noPlaceAvailable", noPlaceAvailable);
        socket.on("waitingToStart", waitingToStart);

    }

    public void back(View view) {

        socket.off("gameNotStarted", gameNotStarted);
        socket.off("noPlaceAvailable", noPlaceAvailable);
        socket.off("waitingToStart", waitingToStart);

        socket.disconnect();

        Intent i = new Intent(getApplicationContext(), IpSettingsActivity.class);
        startActivity(i);

        finish();
    }


    public void joinGame(View view){

        pseudo = name.getText().toString();

        if (pseudo.length() > 0){

            JSONObject json = new JSONObject();
            try {
                json.put("name", pseudo);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            if (socket.connected()) {

                Log.i("join game", pseudo + " is joigning the game");

                name.setEnabled(false);

                socket.emit("joinGame", json);
                progressBar.setVisibility(View.VISIBLE);
                joinBtn.setEnabled(false);
                name.setEnabled(false);

            } else {

                Log.i("join game", pseudo + " error connected");

                AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(JoinGameActivity.this);
                alertDialogBuilder.setMessage("Le serveur n'est pas joignable, vérifiez l'adresse IP et recommencez");
                alertDialogBuilder.setCancelable(false);
                alertDialogBuilder.setPositiveButton("Ok", new DialogInterface.OnClickListener() {

                    @Override
                    public void onClick(DialogInterface arg0, int arg1) {

                        socket.off("gameNotStarted", gameNotStarted);
                        socket.off("noPlaceAvailable", noPlaceAvailable);
                        socket.off("waitingToStart", waitingToStart);

                        socket.disconnect();

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

            AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(JoinGameActivity.this);
            alertDialogBuilder.setMessage("Entrez un nom valide !");
            alertDialogBuilder.setCancelable(false);
            alertDialogBuilder.setPositiveButton("Ok", new DialogInterface.OnClickListener() {

                @Override
                public void onClick(DialogInterface arg0, int arg1) {
                    joinBtn.setEnabled(true);
                }
            });
            ;

            AlertDialog alertDialog = alertDialogBuilder.create();
            alertDialog.show();
        }

    }


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

                    socket.off("gameNotStarted", gameNotStarted);
                    socket.off("noPlaceAvailable", noPlaceAvailable);
                    socket.off("waitingToStart", waitingToStart);

                    DataKeeper.getInstance().setPlayerName(pseudo);

                    Intent i = new Intent(getApplicationContext(), WaitingStartActivity.class);
                    startActivity(i);

                    finish();

                }

            });
        }
    };

    @Override
    public void onBackPressed() {
    }

}
