package com.frostella.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.HashMap;

/**
 * Note: This is a placeholder mock controller for the requested Razorpay integration.
 * In production, you would include the 'com.razorpay:razorpay-java:1.4.3' maven dependency 
 * and initialize the RazorpayClient with your Key ID and Key Secret.
 */
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) {
        // MOCK: Suppose we receive total amount in the payload
        int amount = (int) data.get("amount");
        
        // Return a fake mock razorpay order_id
        String mockRazorpayOrderId = "order_" + System.currentTimeMillis();
        
        Map<String, Object> response = new HashMap<>();
        response.put("orderId", mockRazorpayOrderId);
        response.put("amount", amount);
        response.put("currency", "INR");
        return ResponseEntity.ok(response);
    }
}
