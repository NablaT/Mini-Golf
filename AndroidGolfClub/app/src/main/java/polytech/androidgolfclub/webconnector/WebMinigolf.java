package polytech.androidgolfclub.webconnector;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.LinkedHashMap;
import java.util.Map;

import polytech.androidgolfclub.Results;
import polytech.androidgolfclub.ServerIp;

/**
 * Created by Romain Guillot on 22/01/16.
 */
public class WebMinigolf {

    private static final int TIMEOUT = 1000; //set timeout to 1 seconds

    /**
     * Send the shoot datas to the server
     * @return the force in Newton, -1 if bad shoot, -2 if server error, -3 connectivity error
     */
    public static double go(){

        String server_addr = "http://" + ServerIp.getInstance().getIp() + ":" + ServerIp.getInstance().getPort();

        // the object with the datas of the shoot to send
        JSONArray json = new JSONArray();

        LinkedHashMap<Long, Float[]> values = Results.getInstance().getValues();

        for (Map.Entry<Long, Float[]> entry : values.entrySet()) {
            try{
                JSONObject object = new JSONObject();
                Float[] vals = entry.getValue();

                object.put("t", entry.getKey());
                object.put("x", vals[0]);
                object.put("y", vals[1]);
                object.put("z", vals[2]);

                json.put(object);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        URL url_to = null;

        try {
            url_to = new URL(server_addr + "/smartphone/go");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }


        try {

            String ret = WebConnector.doHTTP(HTTPMethod.PUT, url_to, TIMEOUT, json.toString());
            Log.i("GOLF", "Received by the server");

            try {
                // get the reponse of the server
                JSONObject obj = new JSONObject(ret);
                boolean valid = obj.getBoolean("valid");
                double force = obj.getDouble("strike_force");

                // test if the shoot is considered as valid by the server
                if (!valid){
                    Log.i("GOLF", "Shoot not valid");
                    return -1;
                } else {

                    Log.i("GOLF", "Shoot valid F=" + force);
                    return force;
                }

            } catch (JSONException e) {
                e.printStackTrace();
                Log.i("GOLF", "JSON parse error");
                return -2;
            }
        } catch (ServerException e) {
            e.printStackTrace();
            if (ReturnServer.INTERNAL_ERROR.equals(e.getReturnError()) || ReturnServer.OTHER.equals(e.getReturnError())) {
                Log.i("GOLF", "Server error");
                return -2;
            } else {
                return -3;
            }

        }

    }


    /**
     * Reday state when touch the screen
     */
    public static boolean ready(){

        String server_addr = "http://" + ServerIp.getInstance().getIp() + ":" + ServerIp.getInstance().getPort();

        URL url_to = null;

        JSONObject jsonObject = new JSONObject();

        try {
            url_to = new URL(server_addr + "/smartphone/ready");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        try {
            String ret = WebConnector.doHTTP(HTTPMethod.PUT, url_to, TIMEOUT, jsonObject.toString());
            if ("ok".equals(ret)){
                Log.i("GOLF", "Received ok");
                return true;
            }
            else {
                Log.i("GOLF", "Received bad");
                return false;
            }
        } catch (ServerException e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Ready state when touch the screen
     */
    public static void readyNew(){
        SocketGolf.getInstance().getSocket().emit("ready", null);
    }


    /**
     * Start the calibration of the sphero
     * @return
     */
    public static boolean startCalibrationOld(){

            String server_addr = "http://" + ServerIp.getInstance().getIp() + ":" + ServerIp.getInstance().getPort();

            URL url_to = null;

            JSONObject jsonObject = new JSONObject();

            try {
                url_to = new URL(server_addr + "/smartphone/startcalibration");
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }

            try {
                String ret = WebConnector.doHTTP(HTTPMethod.PUT, url_to, TIMEOUT, jsonObject.toString());
                return true;
            } catch (ServerException e) {
                e.printStackTrace();
                return false;
            }
    }

    /**
     * Start the calibration of the sphero with socket io
     */
    public static void startCalibration(){
        SocketGolf.getInstance().getSocket().emit("startCalibration", null);
    }

    /**
     * Stop the calibration of the sphero
     * @return
     */
    public static boolean stopCalibrationOld(){

        String server_addr = "http://" + ServerIp.getInstance().getIp() + ":" + ServerIp.getInstance().getPort();

        URL url_to = null;

        JSONObject jsonObject = new JSONObject();

        try {
            url_to = new URL(server_addr + "/smartphone/stopcalibration");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        try {
            String ret = WebConnector.doHTTP(HTTPMethod.PUT, url_to, TIMEOUT, jsonObject.toString());
            return true;
        } catch (ServerException e) {
            e.printStackTrace();
            return false;
        }

    }

    /**
     * Stop the calibration of the sphero with socket io
     */
    public static void stopCalibration(){
        SocketGolf.getInstance().getSocket().emit("stopCalibration", null);
    }
}
