package polytech.androidgolfclub.webconnector;

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

import polytech.androidgolfclub.Results;
import polytech.androidgolfclub.ServerIp;

/**
 * This class is used to send http requests to a web server
 *
 * Created by Romain Guillot on 18/12/15
 */
public class WebConnector {

    /**
     * Send an http request
     * @param method get, post, put
     * @param timeout the timeout in milliseconds
     * @param json the data to send
     * @param url the url of the server
     * @return the return of the server
     * @throws ServerException
     */
    public static String doHTTP(HTTPMethod method, URL url, int timeout, String json) throws ServerException {

        try {

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod(method.getText());
            connection.setDoOutput(true);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Accept", "application/json");
            connection.setConnectTimeout(timeout);

            OutputStreamWriter osw = new OutputStreamWriter(connection.getOutputStream());

            osw.write(json);
            osw.flush();
            osw.close();

            InputStream isr = connection.getInputStream();

            String ret = convertInputStreamToString(isr);
            isr.close();

            connection.disconnect();

            if (connection.getResponseCode() == 200){
                return ret;
            } else if (connection.getResponseCode() == 500) {
                throw new ServerException(ReturnServer.INTERNAL_ERROR);
            } else {
                throw new ServerException(ReturnServer.OTHER, connection.getResponseCode());
            }

        } catch (java.net.SocketTimeoutException e) {
            throw new ServerException(ReturnServer.TIMEOUT);
        } catch (MalformedURLException e){
            throw new ServerException(ReturnServer.MALFORMED_URL);
        } catch (IOException e) {
            throw new ServerException(ReturnServer.IO_EXCEPTION);
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
