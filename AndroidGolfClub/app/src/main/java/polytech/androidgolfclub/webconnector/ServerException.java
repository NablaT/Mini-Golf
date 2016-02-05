package polytech.androidgolfclub.webconnector;

/**
 * Created by Romain Guillot on 22/01/16.
 */
@Deprecated
public class ServerException extends Exception {

    public ReturnServer getReturnError() {
        return returnError;
    }

    private ReturnServer returnError;

    public int getErrorCode() {
        return errorCode;
    }

    private int errorCode;

    public ServerException(ReturnServer returnServer){

        super("Server Exception");
        returnError = returnServer;

    }

    public ServerException(ReturnServer message, int errorCode){

        super("Server exception");

        this.returnError = message;
        this.errorCode = errorCode;
    }
}
