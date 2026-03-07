import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function OrderConfirmation() {
  const location = useLocation();
  const orderId = location.state?.orderId || "UNKNOWN";

  return (
    <div className="py-24 px-4 max-w-3xl mx-auto text-center">
      <div className="w-24 h-24 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8">
        <span className="text-5xl">🎉</span>
      </div>
      <h1 className="text-5xl font-heading text-accent mb-4">Order Confirmed!</h1>
      <p className="text-xl text-accent opacity-80 mb-8">
        Thank you for ordering from Frostella. Your sweet treats will be on their way soon!
      </p>
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-10 inline-block">
        <p className="text-sm text-accent opacity-70 mb-1">Order Reference ID</p>
        <p className="text-2xl font-bold text-primary">#{orderId}</p>
      </div>
      <div>
        <Link to="/menu" className="bg-accent text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
          Return to Menu
        </Link>
      </div>
    </div>
  );
}
