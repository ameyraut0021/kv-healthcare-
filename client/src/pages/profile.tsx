import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Package, MapPin, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function Profile() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<{phone: string} | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("kwikmedi_user");
    if (!storedUser) {
      setLocation("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("kwikmedi_token");
    localStorage.removeItem("kwikmedi_user");
    setLocation("/");
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">My Account</h1>
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* User Info Card */}
          <Card className="md:col-span-1 border-primary/20 bg-primary/5">
            <CardContent className="p-6 text-center space-y-4">
              <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-primary/10">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Hello!</h2>
                <p className="text-slate-500 font-mono mt-1">+91 {user.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-slate-400" /> Saved Addresses
                </h3>
                <div className="p-4 border border-dashed rounded-lg text-center text-slate-400 text-sm">
                  No addresses saved yet.
                  <Button variant="link" className="text-primary h-auto p-0 ml-1">Add New</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-slate-400" /> Recent Orders
                </h3>
                <div className="p-4 border border-dashed rounded-lg text-center text-slate-400 text-sm">
                  No orders placed yet.
                  <Button variant="link" className="text-primary h-auto p-0 ml-1">Start Shopping</Button>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </div>
  );
}
