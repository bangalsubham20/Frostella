package com.frostella.backend.controller;
import com.frostella.backend.model.Order;
import com.frostella.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;
    @GetMapping
    public List<Order> getAll() { return orderRepository.findAll(); }
    @PostMapping
    public Order create(@RequestBody Order order) { return orderRepository.save(order); }
    @GetMapping("/user/{userId}")
    public List<Order> getByUser(@PathVariable Long userId) { return orderRepository.findByUserId(userId); }
}