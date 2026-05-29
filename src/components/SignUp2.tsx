"use client"
import * as React from "react";
import { useState } from "react";
import { LogIn, Lock, Mail, Check } from "lucide-react";

type Props = {};

export const SignUp2: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [animating, setAnimating] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const startSignupFlow = (via: string = "email") => {
    if (animating) return;

    // Basic validation for email signup
    if (via === "email") {
      if (!email || !password) {
        setError("Por favor ingresa correo y contraseña.");
        return;
      }
      if (!validateEmail(email)) {
        setError("Ingresa una dirección de correo válida.");
        return;
      }
    }

    setError("");
    setAnimating(true);

    // Animation: show a brief success animation then redirect to /paywall
    setTimeout(() => {
      // Redirect to paywall (to be implemented)
      try {
        window.location.href = "/paywall";
      } catch (e) {
        // fallback
        console.log("Redirecting to /paywall");
      }
    }, 1000);
  };

  const handleSocial = (provider: string) => {
    // Normally initiate OAuth flow here. For demo, animate then redirect.
    startSignupFlow(provider);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white rounded-xl z-1 p-6">
      <div className="w-full max-w-sm bg-gradient-to-b from-sky-50/60 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-blue-50 text-black relative overflow-hidden">
        {/* decorative soft radial */}
        <div className="absolute -left-20 -top-24 w-72 h-72 rounded-full bg-gradient-to-br from-sky-100/60 to-transparent blur-3xl opacity-60 pointer-events-none"></div>

        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-lg">
          <LogIn className="w-7 h-7 text-black" />
        </div>

        <h2 className="text-2xl font-semibold mb-2 text-center"> Crear cuenta </h2>
        <p className="text-gray-500 text-sm mb-6 text-center"> Crea tu cuenta para empezar a usar la plataforma y acceder a características premium. </p>

        <div className="w-full flex flex-col gap-3 mb-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              placeholder="Correo electrónico"
              type="email"
              value={email}
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock className="w-4 h-4" />
            </span>
            <input
              placeholder="Contraseña"
              type="password"
              value={password}
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full flex justify-end items-center gap-3">
            {error && <div className="text-sm text-red-500 text-left">{error}</div>}
            <button className="text-xs hover:underline font-medium"> ¿Olvidaste tu contraseña? </button>
          </div>
        </div>

        <button
          onClick={() => startSignupFlow("email")}
          disabled={animating}
          className="w-full bg-gradient-to-b from-gray-700 to-gray-900 text-white font-medium py-2 rounded-xl shadow hover:brightness-105 cursor-pointer transition mb-4 mt-2 disabled:opacity-60"
        >
          Crear cuenta
        </button>

        {/* O separator stylized */}
        <div className="flex items-center w-full my-2">
          <div className="flex-grow border-t border-dashed border-gray-200"></div>

          <div className="mx-3">
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm transform transition-all hover:scale-110">
              <span className="text-xs font-semibold text-gray-500">O</span>
            </div>
          </div>

          <div className="flex-grow border-t border-dashed border-gray-200"></div>
        </div>

        <div className="flex gap-3 w-full justify-center mt-2">
          <button
            onClick={() => handleSocial("google")}
            className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow"
            aria-label="Sign up with Google"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleSocial("facebook")}
            className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow"
            aria-label="Sign up with Facebook"
          >
            <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleSocial("apple")}
            className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow"
            aria-label="Sign up with Apple"
          >
            <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-6 h-6" />
          </button>
        </div>

        {/* Success overlay animation */}
        {animating && (
          <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl transform animate-pop">
              <Check className="w-8 h-8 text-white" />
            </div>
            <div className="text-sm font-semibold">Creando cuenta…</div>
          </div>
        )}

        <style jsx>{`
          @keyframes pop {
            0% { transform: scale(0.6); opacity: 0 }
            60% { transform: scale(1.05); opacity: 1 }
            100% { transform: scale(1); }
          }
          .animate-pop { animation: pop 700ms cubic-bezier(.2,.9,.3,1) both; }
        `}</style>
      </div>
    </div>
  );
};

export default SignUp2;
