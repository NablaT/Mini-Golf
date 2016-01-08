package polytech.androidgolfclub;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import org.json.JSONArray;
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
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * This class is used to send datas to the web server
 *
 * Created by Romain Guillot on 18/12/15
 */
public class WebConnector {


    public static boolean sendShoot(){

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
            connection.setConnectTimeout(2000); //set timeout to 2 seconds


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
                return true;

            } else if (connection.getResponseCode() == 500) {

                Log.i("GOLF", "Server internal error");

            } else {

                Log.i("GOLF", "Not accepted by the server");
            }

        } catch (java.net.SocketTimeoutException e) {
            Log.e("GOLF", e.getMessage());
        } catch (MalformedURLException e){
            Log.e("GOLF", e.getMessage());
        } catch (IOException e) {
            Log.e("GOLF", e.getMessage());
        }

        return false;

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
