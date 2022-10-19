package edu.eci.arsw.drawit.persistence;

import edu.eci.arsw.drawit.model.User;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.zip.DataFormatException;

@Service
public interface DrawitPersistence {

    public void saveUser(User user);

    public User getUser(String name) throws DrawitPersistenceException;

    public Set<User> getAllUsers();
}
