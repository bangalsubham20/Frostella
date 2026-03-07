package com.frostella.backend.controller;
import com.frostella.backend.model.Product;
import com.frostella.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    @GetMapping
    public List<Product> getAll() { return productRepository.findAll(); }
    @PostMapping
    public Product create(@RequestBody Product product) { return productRepository.save(product); }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { productRepository.deleteById(id); }
}