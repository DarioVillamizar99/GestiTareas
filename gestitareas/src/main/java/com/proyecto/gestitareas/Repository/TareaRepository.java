package com.proyecto.gestitareas.Repository;

import com.proyecto.gestitareas.Model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TareaRepository extends JpaRepository<Tarea, Integer> {
}
