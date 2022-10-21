package edu.eci.arsw.drawit.services;

import edu.eci.arsw.drawit.model.Point;
import edu.eci.arsw.drawit.model.User;
import edu.eci.arsw.drawit.persistence.DrawitPersistence;
import edu.eci.arsw.drawit.persistence.DrawitPersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class DrawitServices {

    @Autowired
    DrawitPersistence dip = null;

    public void addNewUser(User user){
        dip.saveUser(user);
    }

    public Set<User> getAllUsers(){
        return dip.getAllUsers();
    }

    public User getUser(String name) throws DrawitPersistenceException {
        return dip.getUser(name);
    }

    public ArrayList<Point> getPointsByUser(String name){
        return dip.getPointsByUser(name);
    }

    public void addPointToUser(User user){
        dip.addPointToUser(user);
    }
}
