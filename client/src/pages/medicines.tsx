import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Filter, X } from "lucide-react";
import { medicines, categories } from "@/lib/mockData";
import { useCart } from "@/lib/cart-context";
import { useLocation } from "wouter";

export default function Medicines() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialCategory = searchParams.get("category");

  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );

  const toggleCategory = (catName: string) => {
    setSelectedCategories(prev => 
      prev.includes(catName) 
        ? prev.filter(c => c !== catName)
        : [...prev, catName]
    );
  };

  const filteredMedicines = medicines.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(m.category);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">All Medicines</h1>
        <p className="text-slate-500 max-w-2xl">
          Browse our wide range of prescription and over-the-counter medicines. 
          Genuine products sourced directly from manufacturers.
        </p>
        
        {/* Search */}
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input 
            placeholder="Search medicines..." 
            className="pl-10 h-12 text-base rounded-full shadow-sm border-slate-200 focus:border-primary focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-8 items-start">
        
        {/* Filters Sidebar */}
        <div className="hidden md:block space-y-6 sticky top-24">
          <div className="flex items-center gap-2 font-semibold text-slate-900 pb-4 border-b">
            <Filter className="h-4 w-4" /> Filters
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-900">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`cat-${cat.id}`} 
                    checked={selectedCategories.includes(cat.name)}
                    onCheckedChange={() => toggleCategory(cat.name)}
                  />
                  <Label 
                    htmlFor={`cat-${cat.id}`}
                    className="text-sm font-normal text-slate-600 cursor-pointer hover:text-primary"
                  >
                    {cat.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="space-y-6">
          {/* Active Filters Mobile */}
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(cat => (
                <Badge key={cat} variant="secondary" className="px-3 py-1 gap-2">
                  {cat}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => toggleCategory(cat)}
                  />
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-muted-foreground h-7"
                onClick={() => setSelectedCategories([])}
              >
                Clear all
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((medicine) => (
              <Card key={medicine.id} className="group overflow-hidden border-slate-100 hover:border-primary/20 hover:shadow-lg transition-all flex flex-col">
                <div className="relative aspect-[4/3] bg-slate-50 p-4 flex items-center justify-center">
                  {medicine.discount > 0 && (
                    <Badge variant="destructive" className="absolute top-2 left-2">
                      {medicine.discount}% OFF
                    </Badge>
                  )}
                  <img 
                    src={medicine.image} 
                    alt={medicine.name} 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="text-xs text-primary font-medium mb-1">{medicine.category}</div>
                  <h3 className="font-semibold text-slate-900 mb-1" title={medicine.name}>
                    {medicine.name}
                  </h3>
                  <div className="text-xs text-slate-400 mb-4 flex-1">{medicine.description}</div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <span className="font-bold text-lg text-slate-900">₹{medicine.price}</span>
                    <Button size="sm" onClick={() => addToCart(medicine)}>
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMedicines.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed">
              <p className="text-slate-500">No medicines found matching your criteria.</p>
              <Button variant="link" onClick={() => {setSearch(""); setSelectedCategories([])}}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
