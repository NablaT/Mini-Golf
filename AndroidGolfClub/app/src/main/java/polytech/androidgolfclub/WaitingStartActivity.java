package polytech.androidgolfclub;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.Socket;

import polytech.androidgolfclub.webconnector.SocketGolf;

public class WaitingStartActivity extends AppCompatActivity {

    private Socket socket;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_waiting_start);

        socket = SocketGolf.getInstance().getSocket();
        socket.on("gameStart", gameStart);
    }

    private Emitter.Listener gameStart = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {

            new Thread(new Runnable() {

                @Override
                public void run() {

                    Log.i("socketio", "received event : game start");

                    socket.off("gameStart", gameStart);

                    Intent i = new Intent(getApplicationContext(), MainActivity.class);
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
