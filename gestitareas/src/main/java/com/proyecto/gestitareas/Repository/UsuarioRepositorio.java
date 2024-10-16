package com.proyecto.gestitareas.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.proyecto.gestitareas.Model.Usuario;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long>{
        //JPQL: Se hace la consulta sobre la clase
    @Query("select count(*) from Usuario as p where p.nombre = :nombre and p.password =:password")
    int findByNombreUsuarioAndPassword(@Param("nombre") String nombreUsuario,
                    @Param("password") String password);

    @Query("select p from Usuario as p where p.nombre = :nombreUsuario and p.password =:password")
    Usuario findByNameAndPassword(@Param("nombre") String nombreUsuario,
                    @Param("password") String password);
}
