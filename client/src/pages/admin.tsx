import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getOrders, updateOrderStatus, isAdminLoggedIn, loginAdmin, logoutAdmin, Order, OrderStatus } from "@/lib/storage";
import { Lock, LogOut, Package, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [key, setKey] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAdminLoggedIn()) {
      setIsAuthenticated(true);
      loadOrders();
    }
  }, []);

  const loadOrders = () => {
    setOrders(getOrders());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(key)) {
      setIsAuthenticated(true);
      loadOrders();
      toast({ title: "Welcome back, Admin" });
    } else {
      toast({ title: "Invalid Admin Key", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setLocation("/");
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    loadOrders();
    toast({ title: "Order Status Updated" });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter Admin Key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Enter Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded flex items-center justify-center text-white font-bold">K</div>
            <span className="font-bold text-lg">Admin Dashboard</span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Orders Management</h1>
            <p className="text-slate-500">View and update customer orders</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border shadow-sm text-sm font-medium">
            Total Orders: {orders.length}
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                          <div className="text-xs text-slate-500">
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-xs text-slate-500">{order.phone}</div>
                        <div className="text-xs text-slate-500 truncate max-w-[150px]" title={order.address.city}>
                          {order.address.city}, {order.address.state}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px] text-sm truncate" title={order.items.map(i => i.name).join(", ")}>
                          {order.items.length} items
                        </div>
                      </TableCell>
                      <TableCell className="font-bold">₹{order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Select
                          defaultValue={order.status}
                          onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                        >
                          <SelectTrigger className="w-[160px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="PROCESSING">Processing</SelectItem>
                            <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                            <SelectItem value="DELIVERED">Delivered</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>
    </div>
  );
}
