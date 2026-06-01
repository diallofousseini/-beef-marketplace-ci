import Image from "next/image";
import Link from "next/link";
import { Trash2, MapPin, Truck, CreditCard } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// This is a simplified cart implementation using React state.
// In a real app, you would use a state management library or server state.

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Array<any>>([]);
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: cart, 1: payment, 2: confirmation
  const [paymentMethod, setPaymentMethod] = useState<"ORANGE_MONEY" | "MTN_MONEY" | "WAVE" | "CASH_ON_DELIVERY">("CASH_ON_DELIVERY");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const total = subtotal; // In a real app, you might add taxes, delivery fee, etc.

  // Add to cart function (would be called from listing detail)
  // We'll expose a function to add to cart via a custom event or context, but for simplicity we'll just simulate.
  // In a real app, we would use a context or state management.

  // For demo, let's add a sample item if the cart is empty on mount (remove in production)
  // We'll skip this for now.

  const handleRemove = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove(index);
      return;
    }
    setCartItems(prev => {
      const newCart = [...prev];
      newCart[index] = { ...newCart[index], quantity: newQuantity };
      return newCart;
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setError("Votre panier est vide");
      return;
    }
    setCheckoutStep(1);
  };

  const handlePlaceOrder = async () => {
    setProcessing(true);
    setError(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real app, we would:
      // 1. Create an order in the database
      // 2. Clear the cart
      // 3. Redirect to order confirmation

      // For now, we'll just simulate
      setCheckoutStep(2);
      // Clear cart after a short delay to show confirmation
      setTimeout(() => {
        setCartItems([]);
        setCheckoutStep(0);
      }, 3000);
    } catch (err) {
      setError("Erreur lors du traitement du paiement. Veuillez réessayer.");
      setProcessing(false);
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
                {cartItems.length > 0 && (
                  <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-red-500 text-xs text-white rounded-full">
                    {cartItems.length}
                  </div>
                )}
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

      {/* Cart Content */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {checkoutStep === 0 ? (
            <>
              <h1 className="mb-6 text-2xl font-bold text-gray-900">
                Votre panier
              </h1>
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Votre panier est vacío. <Link href="/listings" className="font-medium text-red-600 hover:text-red-500">Continuer vos achats</Link>
                </p>
              ) : (
                <>
                  <div className="space-y-6">
                    {cartItems.map((item, index) => (
                      <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="flex p-6">
                          <div className="flex-shrink-0">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.title}
                                className="h-24 w-24 object-cover rounded"
                                width={96}
                                height={96}
                              />
                            ) : (
                              <div className="h-24 w-24 bg-gray-200 flex items-center justify-center rounded">
                                <span className="text-gray-500">Pas d'image</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4 flex-1 space-y-2">
                            <div className="flex justify-between">
                              <h3 className="font-semibold text-gray-900">{item.title}</h3>
                              <button
                                onClick={() => handleRemove(index)}
                                className="text-gray-400 hover:text-gray-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="text-sm text-gray-500">
                              {item.weightKg} kg × {item.unitPrice.toLocaleString()} FCFA/kg
                            </p>
                            <div className="flex items-center space-x-4 pt-2">
                              <button
                                onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                className="flex h-8 w-8 items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5v7"></path>
                                </svg>
                              </button>
                              <span className="text-lg font-medium">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(index, item.quantity + 1)}
                                className="flex h-8 w-8 items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v7M5 12h14"></path>
                                </svg>
                              </button>
                            </div>
                            <p className="mt-2 text-right font-semibold text-gray-900">
                              {(item.unitPrice * item.quantity).toLocaleString()} FCFA
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-4 border-t border-gray-200">
                    <div className="mb-4 flex justify-between text-lg font-semibold text-gray-900">
                      <span>Sous-total</span>
                      <span>{subtotal.toLocaleString()} FCFA</span>
                    </div>
                    {/* In a real app, you might have taxes, delivery, etc. */}
                    <div className="flex justify-between text-2xl font-bold text-red-600">
                      <span>Total</span>
                      <span>{total.toLocaleString()} FCFA</span>
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={handleCheckout}
                        className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                      >
                        Passer à la caisse
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : checkoutStep === 1 ? (
            <>
              <h1 className="mb-6 text-2xl font-bold text-gray-900">
                Paiement
              </h1>
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Méthode de paiement</h2>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        value="ORANGE_MONEY"
                        checked={paymentMethod === "ORANGE_MONEY"}
                        onChange={(e) => setPaymentMethod(e.target.value as "ORANGE_MONEY")}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <div className="flex items-center">
                        <span className="text-sm font-medium">Orange Money</span>
                      </div>
                    </label>
                    {paymentMethod === "ORANGE_MONEY" && (
                      <div className="mt-2 pl-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Numéro de téléphone Orange Money
                        </label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                          placeholder="Ex: 07 XX XX XX XX"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        value="MTN_MONEY"
                        checked={paymentMethod === "MTN_MONEY"}
                        onChange={(e) => setPaymentMethod(e.target.value as "MTN_MONEY")}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <div className="flex items-center">
                        <span className="text-sm font-medium">MTN Mobile Money</span>
                      </div>
                    </label>
                    {paymentMethod === "MTN_MONEY" && (
                      <div className="mt-2 pl-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Numéro de téléphone MTN Mobile Money
                        </label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                          placeholder="Ex: 05 XX XX XX XX"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        value="WAVE"
                        checked={paymentMethod === "WAVE"}
                        onChange={(e) => setPaymentMethod(e.target.value as "WAVE")}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <div className="flex items-center">
                        <span className="text-sm font-medium">Wave</span>
                      </div>
                    </label>
                    {paymentMethod === "WAVE" && (
                      <div className="mt-2 pl-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Numéro de téléphone Wave
                        </label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                          placeholder="Ex: 01 XX XX XX XX"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        value="CASH_ON_DELIVERY"
                        checked={paymentMethod === "CASH_ON_DELIVERY"}
                        onChange={(e) => setPaymentMethod(e.target.value as "CASH_ON_DELIVERY")}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <div className="flex items-center">
                        <span className="text-sm font-medium">Paiement à la livraison</span>
                      </div>
                    </label>
                  </div>
                </div>
                {error && (
                  <div className="bg-red-50 text-red-500 p-4 rounded-lg">
                    {error}
                  </div>
                )}
                <div className="flex justify-between">
                  <Link
                    href="/cart"
                    className="flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Retour au panier
                  </Link>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={processing}
                    className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                  >
                    {processing ? "Traitement en cours..." : "Confirmer la commande"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="mb-6 text-2xl font-bold text-gray-900">
                Commande confirmée !
              </h1>
              <p className="mb-6 text-gray-600">
                Votre commande a été passée avec succès. Un vendeur vous contactera bientôt pour la livraison.
              </p>
              <div className="space-y-4">
                <Link
                  href="/"
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Retour à l'accueil
                </Link>
                <Link
                  href="/listings"
                  className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Voir d'autres annonces
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}