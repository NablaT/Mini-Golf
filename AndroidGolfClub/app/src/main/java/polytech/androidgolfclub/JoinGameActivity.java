package polytech.androidgolfclub;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONException;
import org.json.JSONObject;

import polytech.androidgolfclub.webconnector.SocketGolf;

public class JoinGameActivity extends AppCompatActivity {

    private EditText name;
    private Button joinBtn;
    private ProgressBar progressBar;

    private Socket socket;

    @Override
    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_join_game);

        name = (EditText) findViewById(R.id.name);
        joinBtn = (Button) findViewById(R.id.btnjoin);
        progressBar = (ProgressBar) findViewById(R.id.progressBar);
        progressBar.setVisibility(View.GONE);
        joinBtn.setEnabled(true);

        socket = SocketGolf.getInstance().getSocket();
        socket.on("gameNotStarted", gameNotStarted);
        socket.on("noPlaceAvailable", noPlaceAvailable);
        socket.on("waitingToStart", gameNotStarted);

    }

    public void back(View view){

        socket.off("gameNotStarted", gameNotStarted);
        socket.off("noPlaceAvailable", noPlaceAvailable);
        socket.off("waitingToStart", gameNotStarted);

        Intent i = new Intent(getApplicationContext(), IpSettingsActivity.class);
        startActivity(i);

        finish();
    }

    public void joinGame(View view){

        String pseudo = name.getText().toString();

        if (pseudo.length() > 0){

            JSONObject json = new JSONObject();
            try {
                json.put("name", pseudo);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            if (socket.connected()){

                Log.i("join game", pseudo + " is joigning the game");

                DataKeeper.getInstance().setCurrentPlayer(pseudo);
                socket.emit("joinGame", json);
                progressBar.setVisibility(View.VISIBLE);
                joinBtn.setEnabled(false);

            } else {

                Log.i("join game", pseudo + " error connected");

                AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
                alertDialogBuilder.setMessage("Le serveur n'est pas joignable, vérifiez l'adresse IP et recommencez");
                alertDialogBuilder.setCancelable(false);
                alertDialogBuilder.setPositiveButton("Ok", new DialogInterface.OnClickListener() {

                    @Override
                    public void onClick(DialogInterface arg0, int arg1) {

                        socket.off("gameNotStarted", gameNotStarted);
                        socket.off("noPlaceAvailable", noPlaceAvailable);
                        socket.off("waitingToStart", gameNotStarted);

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

            AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
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

            new Thread(new Runnable() {

                @Override
                public void run() {

                    Log.i("socketio", "received event : game not started");

                    progressBar.setVisibility(View.GONE);

                    AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(getApplicationContext());
                    alertDialogBuilder.setMessage("Le jeu n'a pas été démarré !");
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

            }).start();
        }
    };

    private Emitter.Listener noPlaceAvailable = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            new Thread(new Runnable() {

                @Override
                public void run() {

                    Log.i("socketio", "received event : no place available");

                    progressBar.setVisibility(View.GONE);

                    AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(getApplicationContext());
                    alertDialogBuilder.setMessage("Tous les joueurs sont déjà pris !");
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

            }).start();
        }
    };

    private Emitter.Listener waitingToStart = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            new Thread(new Runnable() {

                @Override
                public void run() {

                    Log.i("socketio", "received event : waiting to start");

                    progressBar.setVisibility(View.GONE);

                    socket.off("gameNotStarted", gameNotStarted);
                    socket.off("noPlaceAvailable", noPlaceAvailable);
                    socket.off("waitingToStart", gameNotStarted);

                    Intent i = new Intent(getApplicationContext(), WaitingStartActivity.class);
                    startActivity(i);

                    finish();

                }

            }).start();
        }
    };

    @Override
    public void onBackPressed() {
    }

}
