package polytech.androidgolfclub;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class ParametersActivity extends AppCompatActivity {

    public boolean isDroitier = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_parameters);
    }

    public void droitierClick(View v){
        isDroitier = true;
    }

    public void gaucherClick(View v){
        isDroitier = false;
    }
}
