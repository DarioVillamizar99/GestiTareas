package com.proyecto.gestitareas.Service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.proyecto.gestitareas.Model.LoginDto;
import com.proyecto.gestitareas.Model.Usuario;

public interface IUsuarioService {

    List<Usuario> getUsuarios();

    Usuario nuevoUsuario(Usuario usuario);

    Usuario buscarUsuario(Long id);
    
    int borrarUsuario(Long id);

    int login(LoginDto usuarioDto);

    ResponseEntity<?> ingresar(LoginDto usuarioDto);

}
