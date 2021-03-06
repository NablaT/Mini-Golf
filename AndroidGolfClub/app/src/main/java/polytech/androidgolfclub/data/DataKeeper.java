package polytech.androidgolfclub.data;

/**
 *
 * This class is used to keep player name and current player
 *
 * Created by Romain Guillot on 25/01/16.
 */
public class DataKeeper {

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    private String playerName;

    public String getCurrentPlayer() {
        return currentPlayer;
    }

    public void setCurrentPlayer(String currentPlayer) {
        this.currentPlayer = currentPlayer;
    }

    private String currentPlayer;

    private boolean gameEnded;

    private boolean firstPlayerToPLay;

    private boolean hasCalibrate;

    private static DataKeeper ourInstance = new DataKeeper();

    public static DataKeeper getInstance() {
        return ourInstance;
    }

    private DataKeeper() {
        playerName = null;
        currentPlayer = null;
        gameEnded = false;
        firstPlayerToPLay = true;
        hasCalibrate = false;
    }

    public boolean isGameEnded() {
        return gameEnded;
    }

    public void setGameEnded(boolean gameEnded) {
        this.gameEnded = gameEnded;
    }

    public boolean isFirstPlayerToPLay() {
        return firstPlayerToPLay;
    }

    public void setFirstPlayerToPLay(boolean firstPlayerToPLay) {
        this.firstPlayerToPLay = firstPlayerToPLay;
    }

    public void reset(){
        playerName = null;
        currentPlayer = null;
        gameEnded = false;
        firstPlayerToPLay = true;
        hasCalibrate = false;
    }

    public boolean isHasCalibrate() {
        return hasCalibrate;
    }

    public void setHasCalibrate(boolean hasCalibrate) {
        this.hasCalibrate = hasCalibrate;
    }
}
