import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Home, Clock, ShieldCheck, Microscope } from "lucide-react";
import { labTests } from "@/lib/mockData";
import { useCart } from "@/lib/cart-context";

export default function LabTests() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");

  const filteredTests = labTests.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      
      {/* Header */}
      <div className="space-y-6 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Lab Tests & Health Checkups</h1>
        <p className="text-slate-500 text-lg">
          Book diagnostic tests with home sample collection and get digital reports.
          Trusted by thousands of families.
        </p>
        
        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input 
            placeholder="Search tests, health packages..." 
            className="pl-10 h-14 text-base rounded-full shadow-md border-slate-200 focus:border-primary focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Feature Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-full shadow-sm text-blue-600">
            <Home className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900">Home Sample Collection</h3>
            <p className="text-slate-600 text-sm">Our certified phlebotomist will visit your home to collect samples safely.</p>
          </div>
        </div>
        <div className="flex gap-4 text-sm font-medium text-slate-600">
          <div className="flex items-center gap-1"><Clock className="h-4 w-4 text-primary" /> Quick Results</div>
          <div className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-primary" /> NABL Accredited</div>
        </div>
      </div>

      {/* Test Categories Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Popular Tests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-all border-slate-100 overflow-hidden">
              <div className="flex h-full">
                <div className="w-1/3 bg-slate-50 relative">
                   <img src={test.image} className="absolute inset-0 w-full h-full object-cover" alt={test.name} />
                </div>
                <CardContent className="w-2/3 p-5 flex flex-col">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{test.category}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{test.name}</h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">{test.description}</p>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="font-bold text-lg">₹{test.price}</span>
                    <Button size="sm" onClick={() => addToCart(test)}>
                      Book
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Packages Teaser */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center space-y-6">
        <Microscope className="h-12 w-12 mx-auto text-primary" />
        <h2 className="text-3xl font-bold">Full Body Health Packages</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Comprehensive health checkups starting at just ₹999. Includes Vitamin Profile, Thyroid, Liver Function, and more.
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-none">
          View All Packages
        </Button>
      </div>

    </div>
  );
}
