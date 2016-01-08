package polytech.androidgolfclub;

import java.util.LinkedHashMap;

/**
 * Created by Romain Guillot on 28/12/15.
 */
public class Results {

    private static Results ourInstance = new Results();

    public static Results getInstance() {
        return ourInstance;
    }

    private LinkedHashMap<Long, Float> xValues;
    private LinkedHashMap<Long, Float> yValues;
    private LinkedHashMap<Long, Float> zValues;
    private Long start, end;

    private Results() {
        zValues = new LinkedHashMap<>();
        xValues = new LinkedHashMap<>();
        yValues = new LinkedHashMap<>();
        start = 0l;
        end = 0l;
    }

    public synchronized LinkedHashMap<Long, Float> getzValues(){
        return (LinkedHashMap<Long, Float>) zValues.clone();
    }
    public synchronized LinkedHashMap<Long, Float> getxValues(){
        return (LinkedHashMap<Long, Float>) xValues.clone();
    }
    public synchronized LinkedHashMap<Long, Float> getyValues(){
        return (LinkedHashMap<Long, Float>) yValues.clone();
    }

    public void setStart(Long l){
        start=l;
    }
    public Long getStart(){
        return start;
    }

    public void setEnd(Long l){
        end=l;
    }
    public Long getEnd(){
        return end;
    }

    public synchronized void addZ(Long time, Float value){
        zValues.put(time, value);
    }
    public synchronized void addX(Long time, Float value){
        xValues.put(time, value);
    }
    public synchronized void addY(Long time, Float value){
        yValues.put(time, value);
    }


    public synchronized void clearZ(){
        zValues.clear();
    }
    public synchronized void clearX(){
        xValues.clear();
    }
    public synchronized void clearY(){
        yValues.clear();
    }

}
