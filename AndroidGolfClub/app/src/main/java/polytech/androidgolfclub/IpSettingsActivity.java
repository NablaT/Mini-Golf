package polytech.androidgolfclub;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

/**
 *
 * This activity is used to set the ip and the port of the server
 *
 * Created by Romain Guillot on 18/12/15
 *
 */
public class IpSettingsActivity extends AppCompatActivity {

    public static final String PREFS_NAME = "MyPrefsFile";

    public static final String default_ip = "192.168.1.8";
    public static final String default_port = "3000";

    private EditText ip_view, port_view;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ip_settings);

        ip_view = (EditText) findViewById(R.id.iptext);
        port_view = (EditText) findViewById(R.id.porttext);

        ip_view.setText(ServerIp.getInstance().getIp());
        port_view.setText(ServerIp.getInstance().getPort());

    }

    public void okClick(View view){

        // We need an Editor object to make preference changes.
        // All objects are from android.context.Context
        SharedPreferences settings = getSharedPreferences(PREFS_NAME, 0);
        SharedPreferences.Editor editor = settings.edit();

        editor.putString("ip", String.valueOf(ip_view.getText()));
        editor.putString("port", String.valueOf(port_view.getText()));

        editor.commit();

        Toast.makeText(this, "Changement enregitrés ! ", Toast.LENGTH_SHORT).show();
    }

}
