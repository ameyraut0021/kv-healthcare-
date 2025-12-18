import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, ArrowLeft, Loader2, MapPin } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { 
  getAddresses, 
  saveAddress, 
  createOrder, 
  getDefaultAddress, 
  Address 
} from "@/lib/storage";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  
  const [saveForFuture, setSaveForFuture] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Prefill default address
  useEffect(() => {
    const defaultAddr = getDefaultAddress();
    if (defaultAddr) {
      setFormData({
        name: defaultAddr.name,
        phone: defaultAddr.phone,
        addressLine: defaultAddr.addressLine,
        city: defaultAddr.city,
        state: defaultAddr.state,
        pincode: defaultAddr.pincode,
        landmark: defaultAddr.landmark || "",
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = "Valid phone number is required";
    if (!formData.addressLine) newErrors.addressLine = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pincode || formData.pincode.length < 6) newErrors.pincode = "Valid pincode is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the highlighted fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      // 1. Handle Address
      let finalAddress: Address;
      
      const addressData = {
        name: formData.name,
        phone: formData.phone,
        addressLine: formData.addressLine,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        landmark: formData.landmark,
        isDefault: false // Will be handled by saveAddress logic if needed
      };

      if (saveForFuture) {
        // Check if we are updating the default one or creating new
        // For simplicity, we just save as a new/updated address
        // If it matches an existing ID we would update, but here we treat form as "current address"
        // We'll just create a new entry or update if we had an ID (but we don't track ID in form state for simplicity here)
        finalAddress = saveAddress({ ...addressData, isDefault: getAddresses().length === 0 }); 
      } else {
        // Just create a temporary object for the order
        finalAddress = { ...addressData, id: "temp", isDefault: false };
      }

      // 2. Create Order
      const tax = total * 0.05;
      const order = createOrder({
        customerName: formData.name,
        phone: formData.phone,
        address: finalAddress,
        items: items,
        subtotal: total,
        deliveryFee: 0,
        tax: tax,
        total: total + tax,
      });

      // 3. Clear Cart & Show Success
      clearCart();
      setOrderConfirmed(order);
      setIsSubmitting(false);
      window.scrollTo(0, 0);
    }, 1500);
  };

  if (items.length === 0 && !orderConfirmed) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="h-10 w-10 text-slate-300" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Cart is Empty</h1>
        <p className="text-slate-500 mb-6">Please add items to your cart before checking out.</p>
        <Link href="/medicines">
          <Button size="lg">Browse Medicines</Button>
        </Link>
      </div>
    );
  }

  if (orderConfirmed) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh] max-w-2xl text-center">
        <div className="h-24 w-24 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Placed Successfully!</h1>
        <p className="text-slate-500 mb-8">
          Thank you for your order. We will deliver your medicines soon.
        </p>

        <Card className="w-full mb-8 text-left bg-slate-50/50">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between border-b pb-4">
              <span className="text-slate-600">Order ID</span>
              <span className="font-mono font-bold">{orderConfirmed.id}</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="text-slate-600">Total Amount</span>
              <span className="font-bold text-primary text-lg">₹{orderConfirmed.total.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-600 block mb-1">Delivering To</span>
              <p className="font-medium text-slate-900">
                {orderConfirmed.address.name}<br/>
                {orderConfirmed.address.addressLine}, {orderConfirmed.address.city}<br/>
                {orderConfirmed.address.state} - {orderConfirmed.address.pincode}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/orders">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Track my orders
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/cart">
        <a className="flex items-center gap-2 text-slate-500 hover:text-primary font-medium mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </a>
      </Link>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        
        {/* RIGHT SIDE (Mobile First: This is actually main content, so logically first) */}
        {/* Wait, design requested Left: Summary (Cart), Right: Address. 
            Usually checkout forms are on left and summary on right. 
            The prompt says "LEFT SIDE – Cart + Summary", "RIGHT SIDE – Delivery Address form". 
            I'll follow that structure.
        */}

        {/* LEFT COLUMN: Cart Items & Summary */}
        <div className="space-y-6 order-2 lg:order-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-2 border-b last:border-0">
                    <div className="h-16 w-16 bg-slate-50 rounded-md p-2 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 line-clamp-1">{item.name}</h4>
                      <div className="text-sm text-slate-500">Qty: {item.quantity}</div>
                      <div className="text-sm font-semibold text-primary">₹{item.price * item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-2 text-sm border-t">
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

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-bold text-lg">Total Payable</span>
                <span className="font-bold text-xl text-primary">₹{(total * 1.05).toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Address Form */}
        <div className="space-y-6 order-1 lg:order-2">
          <Card className="border-primary/20 shadow-md">
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange}
                    maxLength={10}
                    className={errors.phone ? "border-red-500" : ""}
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressLine">Address *</Label>
                  <Input 
                    id="addressLine" 
                    name="addressLine" 
                    value={formData.addressLine} 
                    onChange={handleInputChange} 
                    placeholder="House No, Building, Street"
                    className={errors.addressLine ? "border-red-500" : ""}
                  />
                  {errors.addressLine && <p className="text-xs text-red-500">{errors.addressLine}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleInputChange}
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input 
                      id="pincode" 
                      name="pincode" 
                      value={formData.pincode} 
                      onChange={handleInputChange}
                      maxLength={6}
                      className={errors.pincode ? "border-red-500" : ""}
                    />
                    {errors.pincode && <p className="text-xs text-red-500">{errors.pincode}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input 
                      id="state" 
                      name="state" 
                      value={formData.state} 
                      onChange={handleInputChange}
                      className={errors.state ? "border-red-500" : ""}
                    />
                    {errors.state && <p className="text-xs text-red-500">{errors.state}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="landmark">Landmark (Optional)</Label>
                    <Input 
                      id="landmark" 
                      name="landmark" 
                      value={formData.landmark} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="saveAddress" 
                  checked={saveForFuture}
                  onCheckedChange={(checked) => setSaveForFuture(checked as boolean)}
                />
                <Label htmlFor="saveAddress" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Save this address for future orders
                </Label>
              </div>

            </CardContent>
            <CardFooter className="bg-slate-50 border-t p-6">
              <Button 
                className="w-full h-12 text-base" 
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Placing Order...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}
