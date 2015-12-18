package polytech.androidgolfclub;

import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by Romain Guillot on 18/12/15
 *
 */
public class WebConnector {

    private static final String server_addr = "http://192.168.1.8:3000";


    public static void sendShoot(String movement){

        JSONObject json = new JSONObject();

        try {
            json.put("x", 11);
            json.put("y", 0);
            json.put("z", -8);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        URL url_to = null;

        try {
            url_to = new URL(server_addr + "/smartphone/club");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        try {

            HttpURLConnection connection = (HttpURLConnection) url_to.openConnection();
            connection.setRequestMethod("PUT");
            connection.setDoOutput(true);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Accept", "application/json");

            OutputStreamWriter osw = new OutputStreamWriter(connection.getOutputStream());

            Log.d("GOLF", "SEND " + json);

            osw.write(json.toString());
            osw.flush();
            osw.close();

            Log.i("GOLF", connection.getResponseCode() + ":" + connection.getResponseMessage());

            InputStream isr = connection.getInputStream();

            String ret = convertInputStreamToString(isr);
            isr.close();

            connection.disconnect();

            if (connection.getResponseCode() == 200){
                // no error in the servor
                Log.i("GOLF", "Received by the server");
            } else if (connection.getResponseCode() == 500) {
                Log.i("GOLF", "Server internal error");
            } else {
                Log.i("GOLF", "Not accepted by the server");
            }

        } catch (MalformedURLException e){
            Log.e("GOLF", e.getMessage());
        } catch (IOException e) {
            Log.e("GOLF", e.getMessage());
        }

    }

    private static String convertInputStreamToString(InputStream inputStream) throws IOException{
        BufferedReader bufferedReader = new BufferedReader( new InputStreamReader(inputStream));

        String line = "";
        String result = "";
        while((line = bufferedReader.readLine()) != null)
            result += line;

        inputStream.close();
        return result;

    }


}
