import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, CheckCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { getOrders, Order } from "@/lib/storage";
import { Link } from "wouter";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const toggleOrder = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "PROCESSING": return "bg-blue-100 text-blue-800 border-blue-200";
      case "OUT_FOR_DELIVERY": return "bg-purple-100 text-purple-800 border-purple-200";
      case "DELIVERED": return "bg-green-100 text-green-800 border-green-200";
      case "CANCELLED": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="h-4 w-4" />;
      case "PROCESSING": return <Package className="h-4 w-4" />;
      case "OUT_FOR_DELIVERY": return <Truck className="h-4 w-4" />;
      case "DELIVERED": return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="h-10 w-10 text-slate-300" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">No Orders Yet</h1>
        <p className="text-slate-500 mb-6">Looks like you haven't placed any orders yet.</p>
        <Link href="/medicines">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">My Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden border-slate-200 hover:border-primary/30 transition-colors">
            <div className="p-6 cursor-pointer" onClick={() => toggleOrder(order.id)}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-slate-50 rounded-full flex items-center justify-center border text-slate-400">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg">Order #{order.id}</div>
                    <div className="text-sm text-slate-500">
                      Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-2 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.replace(/_/g, " ")}
                  </div>
                  <div className="font-bold text-xl text-slate-900">₹{order.total.toFixed(2)}</div>
                  {expandedOrder === order.id ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                </div>
              </div>

              <div className="text-sm text-slate-600 pl-[4rem]">
                 {order.items.length} items • Delivering to {order.address.city}
              </div>
            </div>

            {expandedOrder === order.id && (
              <div className="bg-slate-50 border-t p-6 animate-in slide-in-from-top-2 duration-200">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Items Ordered</h4>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-3 bg-white p-3 rounded-lg border shadow-sm">
                          <img src={item.image} alt={item.name} className="h-12 w-12 object-contain mix-blend-multiply" />
                          <div>
                            <div className="font-medium text-slate-900">{item.name}</div>
                            <div className="text-sm text-slate-500">Qty: {item.quantity} x ₹{item.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Delivery Address</h4>
                      <div className="bg-white p-4 rounded-lg border shadow-sm text-sm text-slate-600">
                        <p className="font-medium text-slate-900">{order.address.name}</p>
                        <p>{order.address.addressLine}</p>
                        <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                        <p className="mt-1">Phone: {order.address.phone}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Payment Details</h4>
                      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Subtotal</span>
                          <span>₹{order.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Tax</span>
                          <span>₹{order.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 font-bold text-slate-900">
                          <span>Total Paid</span>
                          <span>₹{order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
