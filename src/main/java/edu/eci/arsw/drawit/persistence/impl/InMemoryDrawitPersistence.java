package edu.eci.arsw.drawit.persistence.impl;

import edu.eci.arsw.drawit.model.User;
import edu.eci.arsw.drawit.persistence.DrawitPersistence;
import edu.eci.arsw.drawit.persistence.DrawitPersistenceException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class InMemoryDrawitPersistence implements DrawitPersistence {

    private final Map<String,User> participantes = new ConcurrentHashMap<>();

    public InMemoryDrawitPersistence(){

    }


    @Override
    public void saveUser(User user) {
        participantes.put(user.getName(), user);
    }

    @Override
    public User getUser(String name) throws DrawitPersistenceException{
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
}
