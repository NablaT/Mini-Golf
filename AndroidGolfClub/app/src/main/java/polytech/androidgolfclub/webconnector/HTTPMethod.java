package polytech.androidgolfclub.webconnector;

/**
 * Created by Romain Guillot on 22/01/16.
 */
@Deprecated
public enum HTTPMethod {

    GET("GET"), POST("POST"), PUT("PUT");

    private String text;

    HTTPMethod(String str){
        this.text = str;
    }

    public String getText(){
        return text;
    }
}
