package polytech.androidgolfclub.webconnector;

/**
 * Created by Romain Guillot on 22/01/16.
 */
public class ServerException extends Exception {

    public ReturnServer getReturnError() {
        return returnError;
    }

    private ReturnServer returnError;

    public int getErrorCode() {
        return errorCode;
    }

    private int errorCode;

    public ServerException(ReturnServer message){

        super("Server exception");

        returnError = message;
    }

    public ServerException(ReturnServer message, int errorCode){

        super("Server exception");

        this.returnError = message;
        this.errorCode = errorCode;
    }
}
