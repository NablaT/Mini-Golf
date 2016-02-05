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

    private static DataKeeper ourInstance = new DataKeeper();

    public static DataKeeper getInstance() {
        return ourInstance;
    }

    private DataKeeper() {
        playerName = null;
        currentPlayer = null;
    }
}
