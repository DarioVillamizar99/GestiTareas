package com.proyecto.gestitareas.Service;

import com.proyecto.gestitareas.Model.Tarea;
import com.proyecto.gestitareas.Model.TareaDTO;
import com.proyecto.gestitareas.Repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TareaService {

    @Autowired
    private TareaRepository tareaRepository;

    public List<Tarea> getAllTareas() {
        return tareaRepository.findAll();
    }

    public Optional<Tarea> getTareaById(int idTarea) {
        return tareaRepository.findById(idTarea);
    }

    public Long createTarea(TareaDTO tareaDTO) {
        Tarea tarea = new Tarea();

        // Mapear los datos del DTO a la entidad Tarea
        tarea.setIdUsuario(tareaDTO.getIdUsuario());
        tarea.setTitulo(tareaDTO.getTitulo());
        tarea.setDescripcion(tareaDTO.getDescripcion());
        tarea.setFechaCreacion(tareaDTO.getFechaCreacion());
        tarea.setFechaLimite(tareaDTO.getFechaLimite());
        tarea.setPrioridad(tareaDTO.getPrioridad());
        tarea.setEstado(tareaDTO.getEstado());
        tarea.setCategoria(tareaDTO.getCategoria());

        // Guardar la entidad Tarea y obtener el ID generado
        Tarea tareaGuardada = tareaRepository.save(tarea);
        return (long) tareaGuardada.getIdTarea();  // Retornar el ID de la tarea creada
    }


    public Tarea updateTarea(int idTarea, TareaDTO tareaDTO) {
        return tareaRepository.findById(idTarea).map(tarea -> {
            tarea.setTitulo(tareaDTO.getTitulo());
            tarea.setDescripcion(tareaDTO.getDescripcion());
            tarea.setFechaCreacion(tareaDTO.getFechaCreacion());
            tarea.setFechaLimite(tareaDTO.getFechaLimite());
            tarea.setPrioridad(tareaDTO.getPrioridad());
            tarea.setEstado(tareaDTO.getEstado());
            tarea.setCategoria(tareaDTO.getCategoria());
            return tareaRepository.save(tarea);
        }).orElseThrow(() -> new RuntimeException("Tarea no encontrada con id " + idTarea));
    }

    public void deleteTarea(int idTarea) {
        Tarea tarea = tareaRepository.findById(idTarea)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada con id " + idTarea));
        tareaRepository.delete(tarea);
    }
}
