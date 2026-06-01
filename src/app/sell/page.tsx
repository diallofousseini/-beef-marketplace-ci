"use client";

import Link from "next/link";
import Image from "next/image";

import { Upload, MapPin, Trash2, Edit3, Image as ImageIcon, Camera } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [city, setCity] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and is a seller
    // In a real app, we would check the session
    // For now, we'll allow access
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files);
    setImages(newImages);

    // Create preview URLs
    const previews: string[] = [];
    newImages.forEach((file) => {
      previews.push(URL.createObjectURL(file));
    });
    setPreviewImages(previews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    // Validate
    if (!title || !price || !weightKg || !city || images.length === 0) {
      setError("Veuillez remplir tous les champs");
      setIsLoading(false);
      return;
    }

    // In a real app, we would upload images to Cloudinary and save to database
    // For now, we'll simulate
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      setSuccess("Annonces publiée avec succès !");
      setTitle("");
      setDescription("");
      setPrice("");
      setWeightKg("");
      setCity("");
      setImages([]);
      setPreviewImages([]);

      // Redirect to listings after a short delay
      setTimeout(() => {
        router.push("/listings");
      }, 2000);
    } catch (err) {
      setError("Erreur lors de la publication. Veuillez réessayer.");
      setIsLoading(false);
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

      {/* Form */}
      <div className="py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-4 bg-red-50 text-red-500 p-4 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 bg-green-50 text-green-500 p-4 rounded-lg">
              {success}
            </div>
          )}
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Publier une annonce de bœuf
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de l'annonce
              </label>
              <input
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                placeholder="Ex: Bœuf de qualité supérieure"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optionnelle)
              </label>
              <textarea
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                rows={3}
                placeholder="Décrivez la viande, l'élevage, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix (FCFA/kg)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  placeholder="Ex: 4500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poids (kg)
                </label>
                <input
                  type="number"
                  required
                  min="0.1"
                  step="0.01"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  placeholder="Ex: 20.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville
              </label>
              <input
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                placeholder="Ex: Abidjan, Bouaké, Yamoussoukro"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images (maximum 5)
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    maxFiles={5}
                    onChange={handleImageChange}
                    className="mr-2"
                  />
                  <label htmlFor="image-upload" className="flex items-center px-3 py-2 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-100 cursor-pointer">
                    <Camera className="mr-2 h-4 w-4" />
                    Sélectionner des images
                  </label>
                </div>
                {images.length > 0 && (
                  <p className="text-xs text-gray-500">
                    {images.length} image(s) sélectionnée(s)
                  </p>
                )}
              </div>
              {previewImages.length > 0 && (
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={preview}
                        alt="Preview"
                        className="rounded-md h-36 w-full object-cover"
                        width={200}
                        height={150}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = [...images];
                          const newPreviews = [...previewImages];
                          newImages.splice(index, 1);
                          newPreviews.splice(index, 1);
                          setImages(newImages);
                          setPreviewImages(newPreviews);
                        }}
                        className="absolute top-0 right-0 flex h-6 w-6 items-center justify-center bg-red-500 text-red-100 rounded-full text-xs"
                        aria-label="Remove image"
                      >
                        <trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setPrice("");
                  setWeightKg("");
                  setCity("");
                  setImages([]);
                  setPreviewImages([]);
                }}
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                Réinitialiser
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
              >
                {isLoading ? "Publication en cours..." : "Publier l'annonce"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Helper component for file input (we'll create a simple one)
function Input({
  id,
  type,
  accept,
  multiple,
  maxFiles,
  onChange,
  className,
}: {
  id: string;
  type: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      accept={accept}
      multiple={multiple}
      onChange={(e) => {
        if (multiple && e.target.files) {
          if (maxFiles && e.target.files.length > maxFiles) {
            alert(`Vous ne pouvez sélectionner que ${maxFiles} images maximum`);
            return;
          }
        }
        onChange(e);
      }}
      className={className}
    />
  );
}