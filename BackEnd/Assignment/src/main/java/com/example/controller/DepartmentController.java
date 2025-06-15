package com.example.controller;

import com.example.model.Department;
import com.example.model.Employee;
import com.example.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departments")
@CrossOrigin(origins = "http://localhost:4200")

public class DepartmentController {
    @Autowired
    private DepartmentRepository departmentRepository;

    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @GetMapping("/{id}/employees")
    public List<Employee> getEmployeesInDepartment(@PathVariable String id) {
        return departmentRepository.findById(id).map(Department::getEmployees).orElse(null);
    }

    @PostMapping("/departments/{id}/employees")
    public Department addEmployeeToDepartment(@PathVariable String id, @RequestBody Employee employee) {
        Department dept = departmentRepository.findById(id).orElseThrow();
        dept.getEmployees().add(employee);
        return departmentRepository.save(dept);
    }

    @DeleteMapping("/{deptId}/employees/{empId}")
    public Department deleteEmployeeFromDepartment(@PathVariable String deptId, @PathVariable String empId) {
        Department dept = departmentRepository.findById(deptId).orElseThrow();
        dept.getEmployees().removeIf(emp -> emp.getId().equals(empId));
        return departmentRepository.save(dept);
    }

}
