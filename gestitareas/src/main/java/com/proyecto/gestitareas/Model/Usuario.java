package com.proyecto.gestitareas.Model;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = Usuario.TABLE_NAME)
public class Usuario {

    public static final String TABLE_NAME = "usuario";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    @NotNull(message = "Este campo no puede ser nulo")
    @NotEmpty(message = "Este campo no puede estar vacío")
    @NotBlank(message = "Este campo no puede estar en blanco")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "El campo solo debe contener letras y espacios")
    @Column(name = "nombre")
    private String nombre;

    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,20}$", 
        message = "La contraseña debe tener entre 8 y 20 caracteres,"
            +
            "y debe incluir al menos una letra mayúscula, una minúscula, un número" +
            "y un carácter especial (@#$%^&+=)")
    @NotNull(message = "Este campo no puede ser nulo")
    @NotEmpty(message = "Este campo no puede estar vacío")
    @NotBlank(message = "Este campo no puede estar en blanco")
    @Column(name = "password")
    private String password;
    

    @NotNull(message="Este campo no puede ser nulo")
    @NotEmpty(message = "Este campo no puede estar vacío")
    @NotBlank(message = "Este campo no puede estar en blanco")
    @Column(name = "email")
    private String email;

    @Column(name = "fechaCreacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "ultimaSesion")
    private LocalDateTime ultimaSesion;
    /*------------------------------Constructores----------------------*/

    public Usuario() {

    }

    public Usuario(Long idUsuario,String nombre,String password,String email,
            LocalDateTime fechaCreacion, LocalDateTime ultimaSesion) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.password = password;
        this.email = email;
        this.fechaCreacion = fechaCreacion;
        this.ultimaSesion = ultimaSesion;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateTime getUltimaSesion() {
        return ultimaSesion;
    }

    public void setUltimaSesion(LocalDateTime ultimaSesion) {
        this.ultimaSesion = ultimaSesion;
    }

    
}
