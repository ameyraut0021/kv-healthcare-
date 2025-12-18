import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, CheckCircle, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(addresses.length === 0);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addAddress = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const newAddress = { ...formData, id: Date.now() };
    setAddresses([...addresses, newAddress]);
    setSelectedAddress(newAddress);
    setShowAddForm(false);
    setFormData({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: true,
    });

    toast({
      title: "Address Added",
      description: "Your delivery address has been saved.",
    });
  };

  const handlePayment = () => {
    if (!selectedAddress) {
      toast({
        title: "Error",
        description: "Please select a delivery address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setOrderConfirmed(true);
    }, 1500);
  };

  const completeOrder = () => {
    clearCart();
    setTimeout(() => setLocation("/"), 2000);
  };

  if (items.length === 0 && !orderConfirmed) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 mb-4">Your cart is empty. Please add items before checkout.</p>
        <Link href="/medicines">
          <Button>Browse Medicines</Button>
        </Link>
      </div>
    );
  }

  if (orderConfirmed) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-6 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="h-24 w-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Order Confirmed! 🎉</h1>
        <p className="text-slate-500 max-w-md">
          Your order has been successfully placed and will be delivered to your address within 24-48 hours.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md w-full">
          <div className="text-sm space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-slate-600">Order Total:</span>
              <span className="font-bold">₹{(total * 1.05).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Delivering To:</span>
              <span className="font-bold text-right">{selectedAddress?.city}</span>
            </div>
          </div>
        </div>
        <Button onClick={completeOrder} size="lg">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/cart">
        <a className="flex items-center gap-2 text-primary font-medium mb-8 hover:gap-3 transition-all">
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </a>
      </Link>

      <div className="grid lg:grid-cols-[1fr_350px] gap-8">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Step 1: Delivery Address */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 border-b pb-4">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
              <CardTitle className="text-lg">Delivery Address</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-slate-300" />
                  </div>
                  <p className="text-slate-500 mb-2">No addresses found</p>
                  <p className="text-sm text-slate-400 mb-6">You haven't added any addresses yet.</p>
                  <Button variant="outline" onClick={() => setShowAddForm(true)}>
                    Add New Address
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map(addr => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedAddress?.id === addr.id
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="font-semibold text-slate-900">{addr.name}</div>
                      <div className="text-sm text-slate-600 mt-1">{addr.address}</div>
                      <div className="text-sm text-slate-600">{addr.city}, {addr.state} {addr.pincode}</div>
                      <div className="text-sm text-slate-500 mt-2">+91 {addr.phone}</div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4" onClick={() => setShowAddForm(true)}>
                    Add Another Address
                  </Button>
                </div>
              )}

              {showAddForm && (
                <div className="mt-6 p-6 bg-slate-50 rounded-lg space-y-4">
                  <h3 className="font-semibold text-slate-900 mb-4">Add New Address</h3>
                  
                  <div>
                    <Label className="text-sm mb-2 block">Full Name *</Label>
                    <Input
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label className="text-sm mb-2 block">Phone Number *</Label>
                    <Input
                      name="phone"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      maxLength={10}
                    />
                  </div>

                  <div>
                    <Label className="text-sm mb-2 block">Address *</Label>
                    <Input
                      name="address"
                      placeholder="House No., Building Name"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm mb-2 block">City *</Label>
                      <Input
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label className="text-sm mb-2 block">State</Label>
                      <Input
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm mb-2 block">Pincode *</Label>
                    <Input
                      name="pincode"
                      placeholder="6-digit pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      maxLength={6}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={addAddress} className="flex-1">
                      Save Address
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-600">{item.name} x{item.quantity}</span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax (5%)</span>
                  <span className="font-medium">₹{(total * 0.05).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₹{(total * 1.05).toFixed(2)}</span>
              </div>

              <Button
                className="w-full h-12 mt-4"
                onClick={handlePayment}
                disabled={isSubmitting || addresses.length === 0}
              >
                {isSubmitting ? "Processing..." : "Proceed to Payment"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
