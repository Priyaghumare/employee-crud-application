package com.example.model;
import lombok.Data;
import jakarta.persistence.*;


@Data
@Entity

public class Employee {
    @Id
    private String id;
    private String name;
    private String email;
    private String position;
    private double salary;

    public Employee(String id, String name, String email, String position, double salary) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.position = position;
        this.salary = salary;
    }

    // Default constructor (needed by JPA)
    public Employee() {
    }
}
