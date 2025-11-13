package com.example.demo.service;

import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    public List<Employee> findAll() {
        return repo.findAll();
    }

    public Employee findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    public Employee create(Employee employee) {
        if (repo.existsByEmail(employee.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        return repo.save(employee);
    }

    public Employee update(Long id, Employee details) {
        Employee emp = findById(id);
        emp.setName(details.getName());
        emp.setEmail(details.getEmail());
        emp.setPosition(details.getPosition());
        return repo.save(emp);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
