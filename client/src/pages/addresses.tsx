import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, MapPin, Check, Plus, Home } from "lucide-react";
import { getAddresses, deleteAddress, setDefaultAddress, saveAddress, Address } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const loadAddresses = () => {
    setAddresses(getAddresses());
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleDelete = (id: string) => {
    deleteAddress(id);
    loadAddresses();
    toast({ title: "Address deleted" });
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddress(id);
    loadAddresses();
    toast({ title: "Default address updated" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAddress = () => {
    if (!formData.name || !formData.addressLine || !formData.pincode) {
      toast({ title: "Please fill required fields", variant: "destructive" });
      return;
    }

    saveAddress({
      ...formData,
      isDefault: addresses.length === 0 // First one is default
    });
    
    loadAddresses();
    setIsDialogOpen(false);
    setFormData({
      name: "",
      phone: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
    });
    toast({ title: "Address added successfully" });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Addresses</h1>
          <p className="text-slate-500">Manage your delivery addresses</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input name="phone" value={formData.phone} onChange={handleInputChange} maxLength={10} />
              </div>
              <div className="space-y-2">
                <Label>Address Line</Label>
                <Input name="addressLine" value={formData.addressLine} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input name="city" value={formData.city} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label>Pincode</Label>
                  <Input name="pincode" value={formData.pincode} onChange={handleInputChange} maxLength={6} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input name="state" value={formData.state} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label>Landmark</Label>
                  <Input name="landmark" value={formData.landmark} onChange={handleInputChange} />
                </div>
              </div>
              <Button onClick={handleAddAddress} className="mt-4">Save Address</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-lg border border-dashed">
          <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <MapPin className="h-8 w-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">No Addresses Saved</h3>
          <p className="text-slate-500 mb-6">Add an address to speed up your checkout.</p>
          <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Add Address</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <Card key={addr.id} className={`relative ${addr.isDefault ? "border-primary bg-primary/5" : ""}`}>
              {addr.isDefault && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg font-medium">
                  Default
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center border shrink-0">
                    <Home className="h-5 w-5 text-slate-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-slate-900">{addr.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {addr.addressLine}<br/>
                      {addr.landmark && <span className="text-slate-500">Near {addr.landmark}, </span>}
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-sm font-medium text-slate-900 pt-1">Phone: {addr.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mt-6 pt-4 border-t">
                  {!addr.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => handleSetDefault(addr.id)}>
                      Set as Default
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 ml-auto" onClick={() => handleDelete(addr.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
