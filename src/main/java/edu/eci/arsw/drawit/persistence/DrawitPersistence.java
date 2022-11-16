package edu.eci.arsw.drawit.persistence;

import edu.eci.arsw.drawit.model.Point;
import edu.eci.arsw.drawit.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.zip.DataFormatException;

@Service
public interface DrawitPersistence {

    public void saveUser(User user);

    public User getUser(String name) throws DrawitPersistenceException;

    public Set<User> getAllUsers();

    public ArrayList<Point> getPointsByUser(String name);

    public void addPointToUser(User user);

    public void delteAllPointsUser(String name);

    public  User getMasterName();

    public User getGanador();

    public void setGanador(String name);

    public User getIsfirst();

    public void setIsfirst(String name, boolean isfirst);

    public void deleteParticipantes();
}