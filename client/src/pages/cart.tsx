import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus, ArrowRight, CheckCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { toast } = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [, setLocation] = useLocation();

  const handleCheckout = () => {
    const user = localStorage.getItem("kwikmedi_user");
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with checkout.",
        variant: "destructive",
      });
      setTimeout(() => setLocation("/login"), 1500);
      return;
    }
    setShowConfirmation(true);
  };

  const confirmOrder = () => {
    const user = JSON.parse(localStorage.getItem("kwikmedi_user") || "{}");
    toast({
      title: "Order Confirmed! 🎉",
      description: `Your order has been placed. We'll deliver to +91 ${user.phone}`,
    });
    clearCart();
    setShowConfirmation(false);
    setTimeout(() => setLocation("/"), 2000);
  };

  if (showConfirmation) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-6 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="h-24 w-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Order Confirmed!</h1>
        <p className="text-slate-500 max-w-md">
          Your order has been successfully placed. You'll receive delivery updates on your registered mobile number.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md w-full">
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Order Total:</span>
              <span className="font-bold">₹{(total * 1.05).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Estimated Delivery:</span>
              <span className="font-bold">24-48 hours</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <Button onClick={confirmOrder} size="lg">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-6">
        <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="h-10 w-10 text-slate-300" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Your Cart is Empty</h1>
        <p className="text-slate-500">Looks like you haven't added anything yet.</p>
        <Link href="/medicines">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Shopping Cart ({items.length} items)</h1>
      
      <div className="grid lg:grid-cols-[1fr_350px] gap-8">
        
        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-20 w-20 bg-slate-50 rounded-md p-2 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  <div className="text-primary font-bold mt-1">₹{item.price}</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-md">
                    <button 
                      className="p-2 hover:bg-slate-50 text-slate-500"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      className="p-2 hover:bg-slate-50 text-slate-500"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg border-b pb-4">Order Summary</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Delivery Fee</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax (5%)</span>
                  <span className="font-medium">₹{(total * 0.05).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-primary">₹{(total * 1.05).toFixed(2)}</span>
              </div>

              <Button className="w-full h-12 text-base mt-4" onClick={handleCheckout}>
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
