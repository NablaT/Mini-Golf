package polytech.androidgolfclub.webconnector;

import android.util.Log;

import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;


import java.net.URISyntaxException;

import polytech.androidgolfclub.ServerIp;

/**
 * Created by Romain Guillot on 25/01/16.
 */
public class SocketGolf {

    public Socket getSocket() {
        return mSocket;
    }

    private com.github.nkzawa.socketio.client.Socket mSocket;

    private static SocketGolf ourInstance = new SocketGolf();

    public static SocketGolf getInstance() {
        return ourInstance;
    }

    private SocketGolf() {
    }

    public void connect(){

        String server_addr = "http://" + ServerIp.getInstance().getIp() + ":" + ServerIp.getInstance().getPort() + "/smartphone";

        try {

            Log.i("socketio", "create socket");
            mSocket = IO.socket(server_addr);
            mSocket.connect();

        } catch (URISyntaxException e) {

            // go back to main menu
            Log.i("socketio", "error create socket");
        }
    }
}
