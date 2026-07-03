import { useState } from "react";
import { ArrowLeft, CreditCard, Wallet, Truck, CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Checkout({ darkMode, onNavigate }) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
  });

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const card = darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100";
  const text = darkMode ? "text-white" : "text-slate-800";
  const subtext = darkMode ? "text-slate-400" : "text-slate-500";
  const inputClass = darkMode
    ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
    : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400";

  const deliveryFee = cartTotal >= 50 ? 0 : 5;
  const tax = cartTotal * 0.1;
  const finalTotal = cartTotal + deliveryFee + tax;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className={`text-xl font-bold mb-2 ${text}`}>Your cart is empty!</h2>
        <button
          onClick={() => onNavigate("products")}
          className="mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl"
        >
          Browse Products
        </button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>
        <h1 className={`text-3xl font-black mb-3 ${text}`}>Order Placed! 🎉</h1>
        <p className={`text-sm mb-2 ${subtext}`}>Thank you, {form.fullName || "Customer"}!</p>
        <p className={`text-sm mb-8 ${subtext}`}>
          Your order total of <span className="font-bold text-orange-500">${finalTotal.toFixed(2)}</span> has been confirmed.
          You will receive a confirmation shortly.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => onNavigate("home")}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Back */}
      <button
        onClick={() => onNavigate("cart")}
        className={`flex items-center gap-2 mb-6 text-sm font-medium ${darkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"}`}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </button>

      <h1 className={`text-2xl font-bold mb-6 ${text}`}>Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {[
          { num: 1, label: "Shipping" },
          { num: 2, label: "Payment" },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${step === s.num ? "bg-orange-500 text-white" : step > s.num ? "bg-emerald-100 text-emerald-700" : darkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"}`}>
              {step > s.num ? <CheckCircle className="w-4 h-4" /> : s.num}
              {s.label}
            </div>
            {i === 0 && <div className={`w-8 h-0.5 ${step > 1 ? "bg-emerald-400" : darkMode ? "bg-slate-700" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Form */}
        <div className="lg:col-span-2">
          <div className={`rounded-2xl border p-6 ${card}`}>

            {step === 1 && (
              <>
                <div className="flex items-center gap-2 mb-5">
                  <Truck className="w-5 h-5 text-orange-500" />
                  <h2 className={`font-semibold ${text}`}>Shipping Information</h2>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className={`text-sm font-semibold block mb-1.5 ${text}`}>Full Name</label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={update("fullName")}
                      placeholder="Muhammad Mursal"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 ${inputClass}`}
                    />
                  </div>
                  <div>
                    <label className={`text-sm font-semibold block mb-1.5 ${text}`}>Phone Number</label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+92 300 1234567"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 ${inputClass}`}
                    />
                  </div>
                  <div>
                    <label className={`text-sm font-semibold block mb-1.5 ${text}`}>Delivery Address</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={update("address")}
                      placeholder="House #, Street, Area"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 ${inputClass}`}
                    />
                  </div>
                  <div>
                    <label className={`text-sm font-semibold block mb-1.5 ${text}`}>City</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={update("city")}
                      placeholder="Faisalabad"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 ${inputClass}`}
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (form.fullName && form.phone && form.address && form.city) {
                      setStep(2);
                    }
                  }}
                  className="w-full mt-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all"
                >
                  Continue to Payment
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex items-center gap-2 mb-5">
                  <CreditCard className="w-5 h-5 text-orange-500" />
                  <h2 className={`font-semibold ${text}`}>Payment Method</h2>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  {[
                    { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Pay securely with your card" },
                    { id: "cod", label: "Cash on Delivery", icon: Wallet, desc: "Pay when you receive your order" },
                  ].map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                          paymentMethod === method.id
                            ? "border-orange-500 bg-orange-50"
                            : darkMode ? "border-slate-700 bg-slate-700/30" : "border-slate-200"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${paymentMethod === method.id ? "bg-orange-500 text-white" : darkMode ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-500"}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${paymentMethod === method.id ? "text-orange-600" : text}`}>{method.label}</p>
                          <p className={`text-xs ${subtext}`}>{method.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === "card" && (
                  <div className="flex flex-col gap-4 mb-6">
                    <input
                      type="text"
                      placeholder="Card Number (demo)"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 ${inputClass}`}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 ${inputClass}`}
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 ${inputClass}`}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className={`px-5 py-3.5 rounded-xl font-semibold text-sm ${darkMode ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-700"}`}
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all"
                  >
                    Place Order — ${finalTotal.toFixed(2)}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className={`rounded-2xl border p-5 sticky top-24 ${card}`}>
            <h2 className={`font-bold mb-4 ${text}`}>Order Summary</h2>

            <div className="flex flex-col gap-3 mb-4 max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0 ${item.bgColor}`}>
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${text}`}>{item.name}</p>
                    <p className={`text-xs ${subtext}`}>Qty: {item.quantity}</p>
                  </div>
                  <p className={`text-xs font-semibold ${text}`}>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className={`border-t pt-3 flex flex-col gap-2 ${darkMode ? "border-slate-700" : "border-slate-100"}`}>
              <div className="flex justify-between text-sm">
                <span className={subtext}>Subtotal</span>
                <span className={text}>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={subtext}>Delivery</span>
                <span className="text-emerald-500 font-semibold">{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={subtext}>Tax</span>
                <span className={text}>${tax.toFixed(2)}</span>
              </div>
              <div className={`flex justify-between pt-2 border-t ${darkMode ? "border-slate-700" : "border-slate-100"}`}>
                <span className={`font-bold ${text}`}>Total</span>
                <span className="font-black text-lg text-orange-500">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}