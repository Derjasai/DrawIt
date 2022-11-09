package edu.eci.arsw.drawit.persistence.impl;

import edu.eci.arsw.drawit.model.Pista;
import edu.eci.arsw.drawit.model.Point;
import edu.eci.arsw.drawit.model.User;
import edu.eci.arsw.drawit.persistence.DrawitPersistence;
import edu.eci.arsw.drawit.persistence.DrawitPersistenceException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class InMemoryDrawitPersistence implements DrawitPersistence {

    private final Map<String,User> participantes = new ConcurrentHashMap<>();

    private Pista nuevaPista = new Pista();

    public InMemoryDrawitPersistence(){
    }


    @Override
    public void saveUser(User user) {
        if(!participantes.containsKey(user.getName())){
            participantes.put(user.getName(), user);
        }
    }

    @Override
    public User getUser(String name) throws DrawitPersistenceException{
        Set<String> keys = participantes.keySet();
        if(!participantes.containsKey(name)){
            throw new DrawitPersistenceException(DrawitPersistenceException.NO_USER);
        }
        return participantes.get(name);
    }

    @Override
    public Set<User> getAllUsers() {
        Set<User> users = new HashSet<>();
        Set<String> keys = participantes.keySet();

        for (String name: keys){
            users.add(participantes.get(name));
        }
        return users;
    }

    @Override
    public ArrayList<Point> getPointsByUser(String name) {
        return participantes.get(name).getPoints();
    }

    @Override
    public void addPointToUser(User user) {
        participantes.get(user.getName()).addPoint(user.getPoints().get(0));
    }

    @Override
    public void delteAllPointsUser(String name) {
        participantes.get(name).deletePoints();
    }

    @Override
    public void savePista(Pista pista) throws DrawitPersistenceException{
        nuevaPista = new Pista(pista.getContenido(), pista.getTomada());
    }

}