package polytech.androidgolfclub;

import java.util.LinkedHashMap;

/**
 * this class is used to save the results of the shoot
 *
 * Created by Romain Guillot on 28/12/15.
 */
public class Results {

    private static Results ourInstance = new Results();

    public static Results getInstance() {
        return ourInstance;
    }

    private Long start, end;

    private LinkedHashMap<Long, Float[]> values;

    private double force;

    private Results() {

        start = 0l;
        end = 0l;
        force = -1;

        values = new LinkedHashMap<>();
    }


    public void setStart(Long l){
        start=l;
    }
    public Long getStart(){
        return start;
    }
    public void setForce(double f){force=f;}

    public void setEnd(Long l){
        end=l;
    }
    public Long getEnd(){
        return end;
    }
    public double getForce(){return force;}


    public synchronized void addValue(Long time, Float vx, Float vy, Float vz){
        Float[] val = new Float[3];
        val[0] = vx;
        val[1] = vy;
        val[2] = vz;
        values.put(time, val);
    }

    public synchronized LinkedHashMap<Long, Float[]> getValues(){
        return values;
    }

    public synchronized void clearValues(){
        values.clear();
    }

}
