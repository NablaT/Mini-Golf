package polytech.androidgolfclub;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    public static final String PREFS_NAME = "MyPrefsFile";
    public static final String default_ip = "192.168.1.8";
    public static final String default_port = "3000";

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // get the ip and port from settings
        SharedPreferences settings = getSharedPreferences(PREFS_NAME, 0);
        String ip = settings.getString("ip", default_ip);
        String port = settings.getString("port", default_port);

        ServerIp.getInstance().setIp(ip);
        ServerIp.getInstance().setPort(port);
    }

    public void newShootClick(View view){
            Intent intent = new Intent(this, ShootActivity.class);
            startActivity(intent);
    }

    public void statsClick(View view){
        Intent intent = new Intent(this, DisplayResultsActivity.class);
        startActivity(intent);
    }

    public void settingsClick(View view){
        Intent intent = new Intent(this, IpSettingsActivity.class);
        startActivity(intent);
    }

    public void calibrateClick(View view){
        Intent intent = new Intent(this, CalibrateActivity.class);
        startActivity(intent);
    }}
