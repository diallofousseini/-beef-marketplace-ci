"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // In a real app, this would call /api/auth/credentialsin
      // For now, we'll redirect to home on success
      window.location.href = "/";
    } catch (err) {
      setError("Identifiants invalides. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="/placeholder.jpg" alt="Beef Market" />
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Connectez-vous à votre compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ou
            <Link href="/auth/register" className="font-medium text-red-600 hover:text-red-500">
              créez un compte
            </Link>
          </p>
        </div>
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Se souvenir de moi
              </label>
            </div>
            <div className="text-sm">
              <a href="/auth/forgot-password" className="font-medium text-red-600 hover:text-red-500">
                Mot de passe oublié ?
              </a>
            </div>
          </div>
          <button type="submit" className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600">
            Se connecter
          </button>
          <p className="text-center">
            Pas encore de compte ?
            <Link href="/auth/register" className="font-medium text-red-600 hover:text-red-500">
              Inscrivez-vous
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}