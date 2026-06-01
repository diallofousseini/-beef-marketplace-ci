"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Truck, Heart, MessageCircle, Phone } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/listings/${id}`);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Erreur lors du chargement de l'annonce");
      }
      const data = await res.json();
      setListing(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement de l'annonce");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = () => {
    // In a real app, we would add to cart and redirect to cart
    // For now, we'll just show an alert
    alert("Cette fonctionnalité sera bientôt disponible. Pour l'instant, contactez le vendeur directement.");
  };

  const handleContact = () => {
    setContactVisible(true);
  };

  const handleWhatsApp = () => {
    if (listing?.seller?.phone) {
      // Remove any non-digit characters and add country code if needed
      const phone = listing.seller.phone.replace(/\D/g, '');
      // Assuming Ivorian numbers start with 00 or +225, we'll just use as is for simplicity
      const whatsappUrl = `https://wa.me/${phone}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="min-h-space flex items-center justify-center">
        <p className="text-red-500 text-center">{error}</p>
        <Link href="/listings" className="mt-4 inline-block text-red-600 hover:text-red-500">
          Retour aux annonces
        </Link>
      </div>
    );
  }

  if (!listing) {
    return <div className="min-h-screen flex items-center justify-center">Annonce non trouvée</div>;
  }

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

      {/* Content */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Images */}
            <div className="space-y-4">
              {listing.images && listing.images.length > 0 ? (
                <div className="grid gap-4">
                  {/* Main image */}
                  <div className="col-span-2">
                    <Image
                      src={listing.images[0]}
                      alt={listing.title}
                      className="h-64 w-full object-cover"
                      width={800}
                      height={400}
                    />
                  </div>
                  {/* Thumbnails */}
                  {listing.images.slice(1, 4).map((img, index) => (
                    <div key={index} className="aspect-w-1 aspect-h-1">
                      <Image
                        src={img}
                        alt={listing.title}
                        className="rounded-md h-full w-full object-cover cursor-pointer hover:opacity-80"
                        width={100}
                        height={100}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-64 w-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Aucune image disponible</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
                <p className="mt-1 text-gray-500">{listing.description || "Aucune description"}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Prix</h2>
                  <p className="mt-2 text-2xl font-bold text-red-600">
                    {listing.price.toLocaleString()} FCFA/kg
                  </p>
                  <p className="text-sm text-gray-500">
                    Total pour {listing.weightKg} kg: {(listing.price * listing.weightKg).toLocaleString()} FCFA
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Poids</h2>
                  <p className="mt-2 text-xl font-bold text-gray-900">
                    {listing.weightKg} kg
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Localisation</h2>
                  <p className="mt-2 text-lg font-medium text-gray-900">
                    {listing.city}
                  </p>
                  {listing.seller?.latitude && listing.seller?.longitude ? (
                    <div className="mt-2">
                      <Link
                        href={`/map?lat=${listing.seller.latitude}&lng=${listing.seller.longitude}&name=${encodeURIComponent(listing.seller.name || "Vendeur")}`}
                        className="text-sm text-red-600 hover:text-red-500"
                      >
                        Voir sur la carte
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations sur le vendeur</h2>
                <div className="flex items-start space-x-4">
                  {listing.seller?.image ? (
                    <Image
                      src={listing.seller.image}
                      alt="Vendeur"
                      className="h-12 w-12 rounded-full"
                      width={48}
                      height={48}
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">👤</span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{listing.seller?.name || "Nom non disponible"}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {listing.seller?.city || "Ville non disponible"}
                    </p>
                    <div className="mt-2 flex items-center space-x-3">
                      <button
                        onClick={handleContact}
                        className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contacter
                      </button>
                      <a
                        href={`tel:${listing.seller?.phone}`}
                        className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Appeler
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact modal */}
              {contactVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-96 max-w-md">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Contacter le vendeur</h2>
                    <p className="mb-4">
                      Vous pouvez contacter {listing.seller?.name || "le vendeur"} par téléphone ou WhatsApp.
                    </p>
                    <div className="space-y-3">
                      <a
                        href={`tel:${listing.seller?.phone}`}
                        className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Appeler par téléphone
                      </a>
                      <button
                        onClick={handleWhatsApp}
                        className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Envoyer un message WhatsApp
                      </button>
                    </div>
                    <button
                      onClick={() => setContactVisible(false)}
                      className="mt-4 w-full text-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-6 pt-5 border-t border-gray-200 flex justify-end space-x-3">
              <Link
                href="/listings"
                className="flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Retour aux annonces
              </Link>
              <button
                onClick={handleBuy}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Acheter maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}