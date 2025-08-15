// frontend/src/pages/AboutPage.tsx
import { Footer } from '../components/Footer';

export function AboutPage() {
  return (
    <div className="bg-white">
      {/* --- Hero Section: The "Why" --- */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
           {/* Decorative Image: Replace with a high-quality, abstract financial background */}
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop"
            alt="Abstract financial charts"
          />
          <div className="absolute inset-0 bg-gray-900 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">From Confusion to Clarity</h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            Market Mentor was born from a simple realization: the world of investing is needlessly complex. I started as a beginner, overwhelmed by jargon and data. This project is my answer—a tool designed to provide the clarity I wish I had from day one.
          </p>
        </div>
      </div>

      {/* --- Founder Section --- */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1">
             {/* Your Photo: Replace this with a professional headshot of yourself. */}
             
            <img 
              className="h-96 w-full object-cover rounded-lg shadow-xl" 
              src="/owen-headshot.jpeg" 
              alt="Owen Akers, Founder"
            />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold text-gray-900">Meet the Founder</h2>
            <p className="mt-4 text-lg text-gray-500">
              My name is Owen Akers, and I'm a software developer with a passion for making complex topics accessible. While learning to code, I found that the best way to understand something is to build with it. I applied that same philosophy to investing. Market Mentor is the result of that journey—a practical, hands-on tool that I built to help myself and others learn with confidence.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              This project isn't just a part of my portfolio; it's a testament to the idea that with the right tools, anyone can start building their financial literacy.
            </p>
          </div>
        </div>
      </div>

      {/* --- Our Values Section --- */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Core Principles</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-indigo-600">Clarity First</h3>
              <p className="mt-2 text-gray-500">We prioritize clear, simple presentation of data over clutter. No jargon, just insights.</p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-indigo-600">Education Focused</h3>
              <p className="mt-2 text-gray-500">Our goal is to empower you to learn, not just to show you numbers on a screen.</p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-indigo-600">Built on Trust</h3>
              <p className="mt-2 text-gray-500">We use reliable, industry-standard financial data to ensure you have information you can count on.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}