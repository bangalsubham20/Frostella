import React from 'react';

export default function About() {
  return (
    <div className="py-16 px-4 max-w-4xl mx-auto">
      <h1 className="text-5xl font-heading text-center text-accent mb-12">About Frostella</h1>
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm text-center">
        <div className="w-32 h-32 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-6xl">👩‍🍳</span>
        </div>
        <h2 className="text-3xl font-heading text-accent mb-6">Our Story</h2>
        <p className="text-lg text-accent leading-relaxed opacity-90 mb-6">
          <span className="font-semibold text-primary">Frostella</span> is a home-baked cake brand run by <span className="font-medium italic">Roshni Patra</span> in Rudrapur, Domjur, Howrah.
        </p>
        <p className="text-lg text-accent leading-relaxed opacity-90">
          We specialize in <span className="font-semibold">100% eggless cakes</span> baked fresh with high-quality ingredients. Whether it's a grand wedding or a small birthday celebration, we pour our passion for baking into every single order to make your moments sweeter and memorable.
        </p>
      </div>
    </div>
  );
}
