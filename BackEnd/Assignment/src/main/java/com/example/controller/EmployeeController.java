package com.example.controller;

import com.example.model.Department;
import com.example.model.Employee;
import com.example.repository.DepartmentRepository;
import com.example.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @GetMapping("/department/{departmentId}")
    public List<Employee> getEmployeesByDepartment(@PathVariable String departmentId) {
        Optional<Department> department = departmentRepository.findById(departmentId);
        return department.map(Department::getEmployees).orElse(null);
    }

    @PostMapping("/department/{departmentId}")
    public Employee addEmployeeToDepartment(@PathVariable String departmentId, @RequestBody Employee employee) {
        Optional<Department> department = departmentRepository.findById(departmentId);
        if (department.isPresent()) {
            employee.setId("emp" + (department.get().getEmployees().size() + 1));
            department.get().getEmployees().add(employee);
            departmentRepository.save(department.get());
            return employee;
        }
        return null;
    }

    @DeleteMapping("/department/{departmentId}/{employeeId}")
    public String deleteEmployeeFromDepartment(@PathVariable String departmentId, @PathVariable String employeeId) {
        Optional<Department> department = departmentRepository.findById(departmentId);
        if (department.isPresent()) {
            department.get().getEmployees().removeIf(emp -> emp.getId().equals(employeeId));
            departmentRepository.save(department.get());
            return "Employee removed successfully";
        }
        return "Department or Employee not found";
    }
}
