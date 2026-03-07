import os

base_dir = r"C:\Subham\Frostella\backend\src\main\java\com\frostella\backend"

# DTOs
dtos = {
    "dto/AuthRequest.java": """package com.frostella.backend.dto;
import lombok.Data;
@Data
public class AuthRequest {
    private String email;
    private String password;
}""",
    "dto/AuthResponse.java": """package com.frostella.backend.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private String role;
}""",
    "dto/RegisterRequest.java": """package com.frostella.backend.dto;
import lombok.Data;
@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String phone;
}""",
    "controller/AuthController.java": """package com.frostella.backend.controller;
import com.frostella.backend.dto.AuthRequest;
import com.frostella.backend.dto.AuthResponse;
import com.frostella.backend.dto.RegisterRequest;
import com.frostella.backend.model.User;
import com.frostella.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        User user = authService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}""",
    "controller/ProductController.java": """package com.frostella.backend.controller;
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
}""",
    "controller/OrderController.java": """package com.frostella.backend.controller;
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
}""",
    "service/AuthService.java": """package com.frostella.backend.service;
import com.frostella.backend.dto.AuthRequest;
import com.frostella.backend.dto.AuthResponse;
import com.frostella.backend.dto.RegisterRequest;
import com.frostella.backend.model.User;
import com.frostella.backend.model.Role;
import com.frostella.backend.repository.UserRepository;
import com.frostella.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class AuthService {
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;
    public User register(RegisterRequest req) {
        if(userRepository.existsByEmail(req.getEmail())) throw new RuntimeException("Email already exists");
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPhone(req.getPhone());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(Role.CUSTOMER);
        return userRepository.save(user);
    }
    public AuthResponse login(AuthRequest req) {
        User user = userRepository.findByEmail(req.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        if(!passwordEncoder.matches(req.getPassword(), user.getPassword())) throw new RuntimeException("Invalid credentials");
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getEmail(), user.getRole().name());
    }
}""",
    "security/JwtUtil.java": """package com.frostella.backend.security;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
@Component
public class JwtUtil {
    @Value("${jwt.secret:9a4f2c8d3b7a1e6f45c8a0b3f267d8b1d4e6f3c8a9d2b5f8e3a9c8b5f6v8a3d9}")
    private String secret;
    @Value("${jwt.expiration:86400000}")
    private long expiration;
    private Key getSigningKey() { return Keys.hmacShaKeyFor(secret.getBytes()); }
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    public String extractEmail(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody().getSubject();
    }
}""",
    "security/SecurityConfig.java": """package com.frostella.backend.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // Relaxed for local dev
        return http.build();
    }
}"""
}

for path, content in dtos.items():
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Backend scaffolding completed successfully.")
