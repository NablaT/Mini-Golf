package polytech.androidgolfclub;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.text.DecimalFormat;

public class ShootAcceptedActivity extends AppCompatActivity {

    private TextView forceText;

    public ShootAcceptedActivity(){}

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_shoot_accepted);

        forceText = (TextView) findViewById(R.id.textViewForce);

        DecimalFormat df = new java.text.DecimalFormat("0.##");
        String fText =  df.format(Results.getInstance().getForce());

        forceText.setText(fText + " N");
    }

    public void goMainMenu(View v){

        Intent i = new Intent(this, MainActivity.class);
        startActivity(i);
    }

    public void goDisplayResults(View v){

        Intent i = new Intent(this, DisplayResultsActivity.class);
        startActivity(i);
    }

    public void goShoot(View v){

        Intent i = new Intent(this, ShootActivity.class);
        startActivity(i);
    }
}
