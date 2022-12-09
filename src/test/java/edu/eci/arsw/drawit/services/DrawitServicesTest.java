package edu.eci.arsw.drawit.services;

import edu.eci.arsw.drawit.model.Point;
import edu.eci.arsw.drawit.model.User;
import edu.eci.arsw.drawit.persistence.DrawitPersistenceException;
import edu.eci.arsw.drawit.persistence.impl.InMemoryDrawitPersistence;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

import java.util.ArrayList;

public class DrawitServicesTest {
    InMemoryDrawitPersistence dp;
    User usuario1, resultado;

    @Before
    public void before(){
        dp = new InMemoryDrawitPersistence();
    }

    @Test
    public void deberiaGuardarUsuario() throws DrawitPersistenceException {
        ArrayList<Point> puntosPrueba  = new ArrayList();
        Point p1 = new Point(1, 2);
        Point p2 = new Point(3, 4);
        Point p3 = new Point(5, 6);
        puntosPrueba.add(p1);
        puntosPrueba.add(p2);
        puntosPrueba.add(p3);
        usuario1 = new User("UsuarioPrueba", puntosPrueba);
        dp.saveUser(usuario1);
        resultado = dp.getUser("UsuarioPrueba");
        assertEquals(usuario1, resultado);
    }
}