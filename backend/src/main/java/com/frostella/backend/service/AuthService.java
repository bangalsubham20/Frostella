package com.frostella.backend.service;
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
}