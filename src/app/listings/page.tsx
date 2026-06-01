"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Truck, Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function ListingsPage() {
  const [listings, setListings] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    fetchListings();
  }, [filters]);

  const fetchListings = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.city) params.append("city", filters.city);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

      const res = await fetch(`/api/listings?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to fetch listings");
      }
      const data = await res.json();
      setListings(data);
    } catch (err) {
      setError("Erreur lors du chargement des annonces");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold text-red-600">Beef Market</span>
              </Link>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link href="/listings" className="text-gray-600 hover:text-gray-900">
                Annonces
              </Link>
              <Link href="/sell" className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700">
                Vendre
              </Link>
            </div>
            <div className="flex items-center md:order-none md:ml-4">
              {/* Cart icon */}
              <Link href="/cart" className="relative">
                <svg className="h-6 w-6 text-gray-600 hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.737 1.707H17m0 0a2 2 0 1000 4 2 2 0 000-4zm0 0a2 2 0 114 0 2 2 0 01-4 0z"></path>
                </svg>
              </Link>
              {/* User avatar placeholder */}
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <span className="sr-only">User</span>
                  <Image
                    src="/placeholder.jpg"
                    alt=""
                    className="h-8 w-8 rounded-full"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Filters */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Annonces de bœuf
          </h1>
          <div className="grid gap-4 sm:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville
              </label>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                placeholder="Toutes les villes"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix min (FCFA/kg)
              </label>
              <input
                type="number"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix max (FCFA/kg)
              </label>
              <input
                type="number"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                placeholder="10000"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchListings}
                className="flex h-10 items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Filtrer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-center py-8">Chargement...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-8">{error}</p>
          ) : listings.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Aucune annonce trouvée. Essayez de modifier vos filtres.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listings/${listing.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      {listing.images && listing.images[0] ? (
                        <Image
                          src={listing.images[0]}
                          alt={listing.title}
                          className="h-48 w-full object-cover"
                          width={400}
                          height={300}
                        />
                      ) : (
                        <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Image non disponible</span>
                        </div>
                      )}
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {listing.city}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {listing.title}
                      </h3>
                      <p className="mt-2 text-red-600 font-bold">
                        {listing.price.toLocaleString()} FCFA/kg
                      </p>
                      <p className="mt-1 text-gray-500 text-sm">
                        {listing.weightKg} kg disponible
                      </p>
                      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{listing.seller?.city || "Ville inconnue"}</span>
                        </div>
                        <div className="flex items-center">
                          <Truck className="h-4 w-4 mr-1" />
                          <span>Livraison possible</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}