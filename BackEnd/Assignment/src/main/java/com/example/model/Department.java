package com.example.model;
import lombok.Data;
import jakarta.persistence.*;
import java.util.List;

@Data
@Entity
public class Department {
    @Id
    private String id;
    private String name;
    private String location;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Employee> employees;

    public Department() {
    }

    public Department(String id, String name, String location, List<Employee> employees) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.employees = employees;
    }
}
