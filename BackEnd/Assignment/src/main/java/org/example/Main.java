package org.example;

import com.example.model.Department;
import com.example.model.Employee;
import com.example.repository.DepartmentRepository;
import com.example.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.util.Arrays;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
@SpringBootApplication
@ComponentScan(basePackages = {"com.example"})
public class Main implements CommandLineRunner {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Department hr = new Department("dept01", "Human Resources", "Building A", Arrays.asList(
                new Employee("emp001", "Alice Smith", "alice.smith@example.com", "Recruiter", 60000),
                new Employee("emp003", "Charlie Brown", "charlie.brown@example.com", "HR Assistant", 40000)
        ));

        Department engineering = new Department("dept02", "Engineering", "Building B", Arrays.asList(
                new Employee("emp002", "Bob Johnson", "bob.johnson@example.com", "Software Engineer", 80000),
                new Employee("emp004", "Diana Prince", "diana.prince@example.com", "System Architect", 90000)
        ));

        departmentRepository.saveAll(Arrays.asList(hr, engineering));
    }
}
