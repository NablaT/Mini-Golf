package polytech.androidgolfclub;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class ShootErrorActivity extends AppCompatActivity {

    private TextView reasonText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_shoot_error);

        reasonText = (TextView) findViewById(R.id.textViewReason);


        //Get the bundle
        Bundle bundle = getIntent().getExtras();
        Double force = bundle.getDouble("reason");

        switch (force.intValue()) {
            case -3 : reasonText.setText("Erreur de connexion"); break;
            case -2 : reasonText.setText("Erreur sur le serveur"); break;
            case -1 : reasonText.setText("Tir non valide"); break;
            default : reasonText.setText("Erreur non traitée"); break;

        }
    }

    public void goMainMenu(View v){

        Intent i = new Intent(this, MainActivity.class);
        startActivity(i);
    }

    public void goRetry(View v){

        Intent i = new Intent(this, ShootActivity.class);
        startActivity(i);
    }
}
