import Image from "next/image";
import Link from "next/link";
import { ArrowUpCircle, MapPin, Truck, Heart } from "lucide-react";

export default function Home() {
  // In a real app, fetch from database
  const featuredListings = [
    {
      id: "1",
      title: "Bœuf de qualité supérieure",
      price: 5000, // FCFA per kg
      weightKg: 20,
      city: "Abidjan",
      image: "/placeholder.jpg",
    },
    {
      id: "2",
      title: "Viande de bœuf fraîche",
      price: 4500,
      weightKg: 15,
      city: "Bouaké",
      image: "/placeholder.jpg",
    },
  ];

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

      {/* Hero */}
      <section className="bg-red-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl">
            Achetez et vendez du bœuf frais en Côte d'Ivoire
          </h1>
          <p className="mt-4 text-center text-gray-600 sm:text-lg">
            Trouvez les meilleures offres de viande de bœuf près de chez vous.
          </p>
          <div className="mt-8 flex justify-center sm:justify-start">
            <form className="flex w-full max-w-xl">
              <input
                type="text"
                placeholder="Rechercher par ville, prix, ou poids..."
                className="flex-1 rounded-l-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                type="submit"
                className="flex-shrink-0 rounded-r-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Rechercher
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Annonces populaires
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredListings.map((listing) => (
              <Link
                key={listing.id}
                href={`/listings/${listing.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <Image
                      src={listing.image}
                      alt={listing.title}
                      className="h-48 w-full object-cover"
                      width={400}
                      height={300}
                    />
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
                        <span>{listing.city}</span>
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
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Comment ça marche ?
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-md bg-red-50 flex items-center justify-center">
                  <ArrowUpCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">
                Vendez votre bœuf
              </h3>
              <p className="mt-2 text-gray-600">
                Publiez vos annonces avec photos, prix et poids en quelques clics.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-md bg-red-50 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">
                Trouvez près de chez vous
              </h3>
              <p className="mt-2 text-gray-600">
                Recherchez par ville, prix ou poids pour trouver la meilleure offre.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-md bg-red-50 flex items-center justify-center">
                  <Truck className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">
                Achetez en toute confiance
              </h3>
              <p className="mt-2 text-gray-600">
                Paiement sécurisé à la livraison ou par mobile money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-12 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Prêt à commencer ?
          </h2>
          <p className="mb-6 text-gray-600">
            Rejoignez nuestra communauté de vendeurs et d'acheteurs de bœuf en Côte d'Ivoire.
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/sell"
              className="flex-1 rounded-md bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-700"
            >
              Commencer à vendre
            </Link>
            <Link
              href="/listings"
              className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Voir les annonces
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}