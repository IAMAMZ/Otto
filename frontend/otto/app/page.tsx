"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Car, FileText, PenTool } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-red-300">
        {/* Subtle background element */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent"></div>

        {/* Glowing Orb Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 bg-red-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-2xl">
          <h1 className="text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
            Otto
          </h1>

          <p className="mt-4 text-xl font-bold text-red-700 leading-relaxed">
            Redefining Automotive Engineering with AI Innovation
          </p>

          <div className="mt-10">
            <Link
              href="/manufacturing-cell"
              className="inline-flex items-center px-6 py-5 bg-red-600 text-gray-100 font-semibold rounded-md hover:bg-red-400 transition-colors duration-300"
            >
              Start Learning
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-300">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-12 text-gray-700">
            Essential Tools
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-gray-200 p-6 rounded-lg border border-gray-800 hover:bg-red-100 hover:border-red-700 transition-colors duration-300">
              <Car className="w-6 h-6 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Visualize</h3>
              <p className="text-gray-700 text-sm">
                Explore 3D automotive designs with our advanced viewer.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gray-200 p-6 rounded-lg border border-gray-800 hover:bg-red-100 hover:border-red-700 transition-colors duration-300">
              <PenTool className="w-6 h-6 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Create</h3>
              <p className="text-gray-700 text-sm">
                Sketch your designs with precision drawing tools.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gray-200 p-6 rounded-lg border border-gray-800 hover:bg-red-100 hover:border-red-700 transition-colors duration-300">
              <FileText className="w-6 h-6 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Analyze</h3>
              <p className="text-gray-700 text-sm">
                Review technical specifications with document analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Ready to get started?
          </h2>
          <p className="text-gray-400 mb-8">
            Experience the future of automotive engineering today.
          </p>
          <Link
            href="/car-view"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-gray-100 font-semibold rounded-md hover:bg-red-400 transition-colors duration-300"
          >
            Start Creating
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-300 py-8 text-center border-t border-gray-800">
        <p className="text-gray-500 text-sm">© 2025 Otto. All rights reserved.</p>
      </footer>
    </div>
  );
}