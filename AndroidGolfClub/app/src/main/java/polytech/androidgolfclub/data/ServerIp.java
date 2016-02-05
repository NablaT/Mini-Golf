package polytech.androidgolfclub.data;

/**
 * Keep server IP adress
 *
 * Created by Romain Guillot on 08/01/16.
 */
public class ServerIp {

    private String ip, port;

    private static ServerIp ourInstance = new ServerIp();

    public static ServerIp getInstance() {
        return ourInstance;
    }

    private ServerIp() {
    }

    public void setIp(String ip){
        this.ip = ip;
    }

    public void setPort(String port){
        this.port = port;
    }

    public String getIp(){
        return ip;
    }

    public String getPort(){
        return port;
    }
}
