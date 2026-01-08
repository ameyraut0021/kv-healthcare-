import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Filter, X, Pill, Droplets, Bandage, Stethoscope } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useLocation } from "wouter";

const categories = [
  { id: "pharma", name: "PHARMACEUTICAL MEDICINE", icon: Pill },
  { id: "iv", name: "IV FLUIDS & SOLUTIONS", icon: Droplets },
  { id: "consumables", name: "MEDICAL CONSUMABLES & DISPOSABLES", icon: Bandage },
  { id: "surgical", name: "SURGICAL & DIAGNOSTIC PRODUCTS", icon: Stethoscope }
];

const medicines = [
  // 1. PHARMACEUTICAL MEDICINE (15 medicines)
{
  id: "pharma-1",
  name: "Paracetamol 500mg Tablets",
  category: "PHARMACEUTICAL MEDICINE",
  description: "...",
  price: 45,
  discount: 10,
  image: "/pharmaceutical-medicine/paracetamol.png"
},

 {
  id: "pharma-2",
  name: "Ceftriaxone Sodium 1g Injection",
  category: "PHARMACEUTICAL MEDICINE",
  description: "Third generation cephalosporin antibiotic injection",
  price: 125,
  discount: 8,
  image: "/pharmaceutical-medicine/ceftriaxone-sodium.png"
},

{
  id: "pharma-3",
  name: "Human Insulin 30/70 100IU/ml",
  category: "PHARMACEUTICAL MEDICINE",
  description: "Biphasic human insulin for diabetes management",
  price: 285,
  discount: 0,
  image: "/pharmaceutical-medicine/human-insulin.png"
},
{
  id: "pharma-4",
  name: "Heparin Sodium 5000IU Injection",
  category: "PHARMACEUTICAL MEDICINE",
  description: "Anticoagulant injection for thrombosis prevention",
  price: 95,
  discount: 5,
  image: "/pharmaceutical-medicine/heparin-sodium.png"
},
{
  id: "pharma-5",
  name: "Omeprazole 20mg Capsules",
  category: "PHARMACEUTICAL MEDICINE",
  description: "Proton pump inhibitor for acid reflux and ulcers",
  price: 68,
  discount: 12,
  image: "/pharmaceutical-medicine/Omeprazole.png" // <-- add correct extension
},
  {
    id: "pharma-6", name: "Amlodipine 5mg Tablets", category: "PHARMACEUTICAL MEDICINE",
    description: "Calcium channel blocker for hypertension", price: 35, discount: 0,
    image: "/pharmaceutical-medicine/amlodipine.png"
  },
  {
    id: "pharma-7", name: "Metformin 500mg Tablets", category: "PHARMACEUTICAL MEDICINE",
    description: "First line oral antidiabetic medication", price: 28, discount: 15,
    image: "/pharmaceutical-medicine/Metformin.png"
  },
  {
    id: "pharma-8", name: "Ciprofloxacin 500mg Tablets", category: "PHARMACEUTICAL MEDICINE",
    description: "Fluoroquinolone antibiotic for infections", price: 52, discount: 10,
    image: "/pharmaceutical-medicine/Ciprofloxacin.png"
  },
  {
    id: "pharma-9", name: "Losartan 50mg Tablets", category: "PHARMACEUTICAL MEDICINE",
    description: "Angiotensin receptor blocker for blood pressure", price: 65, discount: 8,
    image: "/pharmaceutical-medicine/Losartan.png"
  },
  {
    id: "pharma-10", name: "Atorvastatin 20mg Tablets", category: "PHARMACEUTICAL MEDICINE",
    description: "Statin for cholesterol management", price: 98, discount: 20,
    image: "/pharmaceutical-medicine/atorvastatin.png"
  },
  {
    id: "pharma-11", name: "Pantoprazole 40mg Injection", category: "PHARMACEUTICAL MEDICINE",
    description: "PPI injection for GERD and ulcers", price: 145, discount: 5,
    image: "/pharmaceutical-medicine/Pantoprazole.png"
  },
  {
    id: "pharma-12", name: "Furosemide 40mg Tablets", category: "PHARMACEUTICAL MEDICINE",
    description: "Loop diuretic for edema and hypertension", price: 32, discount: 0,
    image: "/pharmaceutical-medicine/Furosemide.png"
  },
  {
    id: "pharma-13", name: "Dexamethasone 4mg Injection", category: "PHARMACEUTICAL MEDICINE",
    description: "Corticosteroid for inflammation and allergies", price: 25, discount: 10,
    image: "/pharmaceutical-medicine/Dexamethasone.png"
  },
  {
    id: "pharma-14", name: "Azithromycin 500mg Tablets", category: "PHARMACEUTICAL MEDICINE",
    description: "Macrolide antibiotic for respiratory infections", price: 135, discount: 15,
    image: "/pharmaceutical-medicine/Azithromycin.png"
  },
  {
    id: "pharma-15", name: "Amoxicillin + Clavulanic Acid 625mg", category: "PHARMACEUTICAL MEDICINE",
    description: "Broad spectrum antibiotic with beta-lactamase inhibitor", price: 165, discount: 12,
    image: "/pharmaceutical-medicine/amoxicillin-clavulanic-acid.png"
  },

  // 2. IV FLUIDS & SOLUTIONS (6 medicines)
  {
    id: "iv-1", name: "Normal Saline (0.9% NaCl) 500ml", category: "IV FLUIDS & SOLUTIONS",
    description: "Isotonic sodium chloride solution for hydration", price: 65, discount: 5,
     image: "/iv-fluids-solutions/normal-saline-0-9-nacl.png"
  },
  {
    id: "iv-2", name: "Ringer's Lactate 500ml", category: "IV FLUIDS & SOLUTIONS",
    description: "Balanced electrolyte solution for fluid resuscitation", price: 78, discount: 0,
    image: "/iv-fluids-solutions/ringers-lactate-electrolyte-solution.png"
  },
  {
    id: "iv-3", name: "Dextrose 5% (Glucose Solution) 500ml", category: "IV FLUIDS & SOLUTIONS",
    description: "Hypertonic glucose solution for energy", price: 55, discount: 8,
    image: "/iv-fluids-solutions/dextrose-5-percent-glucose-solution.png"
  },
  {
    id: "iv-4", name: "DNS (Dextrose Normal Saline) 500ml", category: "IV FLUIDS & SOLUTIONS",
    description: "Dextrose 5% in 0.9% normal saline", price: 72, discount: 10,
    image: "/iv-fluids-solutions/dns-dextrose-normal-saline.png"
  },
  {
    id: "iv-5", name: "Mannitol 20% 100ml", category: "IV FLUIDS & SOLUTIONS",
    description: "Osmotic diuretic for cerebral edema", price: 195, discount: 5,
    image: "/iv-fluids-solutions/mannitol-20-percent-hyperosmotic-solution.png"
  },
  {
    id: "iv-6", name: "Plasma Expander (Colloid Solution) 500ml", category: "IV FLUIDS & SOLUTIONS",
    description: "Hydroxyethyl starch solution for volume expansion", price: 450, discount: 0,
    image: "/iv-fluids-solutions/plasma-expander-colloid-solution.png"
  },

  // 3. MEDICAL CONSUMABLES & DISPOSABLES (10 medicines)
  {
    id: "consumables-1", name: "Syringe (2 ml - 10 ml) Pack of 10", category: "MEDICAL CONSUMABLES & DISPOSABLES",
    description: "Sterile disposable syringes with needle", price: 85, discount: 15,
    image: "/medical-consumables-disposables/syringe-disposable.png"

  },
  {
    id: "consumables-2", name: "Gloves (Nitrile / Latex) Box of 100", category: "MEDICAL CONSUMABLES & DISPOSABLES",
    description: "Examination and surgical gloves powder-free", price: 650, discount: 20,
    image: "/medical-consumables-disposables/gloves-nitrile-latex.png"

  },
  {
    id: "consumables-3", name: "IV Cannula (20G) Box of 50", category: "MEDICAL CONSUMABLES & DISPOSABLES",
    description: "Intravenous catheter with injection port", price: 1250, discount: 12,
    image: "/medical-consumables-disposables/iv-cannula-20g.png"

  },
  {
    id: "consumables-4", name: "Surgical Mask (3-Ply / N95) Pack of 50", category: "MEDICAL CONSUMABLES & DISPOSABLES",
    description: "Disposable face masks for infection control", price: 350, discount: 25,
    image: "/medical-consumables-disposables/surgical-mask-3ply-n95.png"

  },
  {
    id: "consumables-5", name: "Bandage (Cotton / Crepe) 10cm x 4m", category: "MEDICAL CONSUMABLES & DISPOSABLES",
    description: "Elastic adhesive bandage for wound dressing", price: 95, discount: 10,
    image: "/medical-consumables-disposables/bandage-cotton-crepe.png"

  },
  {
    id: "consumables-6", name: "Gauze Swab (Sterile 10×10 cm) Pack of 50", category: "MEDICAL CONSUMABLES & DISPOSABLES",
    description: "Absorbent sterile gauze for wound cleaning", price: 220, discount: 8,
    image: "/medical-consumables-disposables/gauze-swab-10x10.png"
 
  },
  {
    id: "consumables-7", name: "Catheter (Foley / Nelaton) 16Fr", category: "MEDICAL CONSUMABLES & DISPOSABLES",
    description: "Sterile urinary catheters latex/silicone", price: 145, discount: 5,
    image: "/medical-consumables-disposables/catheter-foley-nelaton-16fr.png"

  },
  {
    id: "consumables-8", name: "Infusion Set (Air vented) Pack of 10", category: "MEDICAL CONSUMABLES & DISPOSABLES",
    description: "IV administration set with roller clamp", price: 280, discount: 15,
    image: "/medical-consumables-disposables/infusion-set-air-vented.png"

  },
  {
    id: "consumables-9", name: "Face Shield (Anti-fog) Pack of 10", category: "MEDICAL CONSUMABLES & DISPOSABLES",
    description: "Reusable protective face shield", price: 450, discount: 10,
    image: "/medical-consumables-disposables/face-shield-anti-fog.png"

  },
  {
    id: "consumables-10", name: "Surgical Drapes (Sterile) 120x150cm", category: "MEDICAL CONSUMABLES & DISPOSABLES",
    description: "Disposable sterile surgical drapes", price: 1850, discount: 5,
    image: "/medical-consumables-disposables/surgical-drapes-sterile.png"

  },

  // 4. SURGICAL & DIAGNOSTIC PRODUCTS (10 medicines)
  {
    id: "surgical-1", name: "Surgical Blades (No. 10, 11, 15) Pack of 10", category: "SURGICAL & DIAGNOSTIC PRODUCTS",
    description: "Sterile disposable carbon steel blades", price: 220, discount: 15,
    image: "/surgical-diagnostic-products/surgical-blades.png"

  },
  {
    id: "surgical-2", name: "Sutures (Absorbable / Non-Absorbable) 2-0", category: "SURGICAL & DIAGNOSTIC PRODUCTS",
    description: "Synthetic absorbable and non-absorbable sutures", price: 1250, discount: 10,
    image: "/surgical-diagnostic-products/sutures-absorbable-nonabsorbable.png"

  },
  {
    id: "surgical-3", name: "BP Monitor (Digital)", category: "SURGICAL & DIAGNOSTIC PRODUCTS",
    description: "Automatic arm blood pressure monitor", price: 2499, discount: 20,
    image: "/surgical-diagnostic-products/bp-monitor-digital-manual.png"

  },
  {
    id: "surgical-4", name: "Glucometer (With 50 strips)", category: "SURGICAL & DIAGNOSTIC PRODUCTS",
    description: "Blood glucose monitoring system kit", price: 1899, discount: 25,
    image: "/surgical-diagnostic-products/glucometer-with-strips.png"

  },
  {
    id: "surgical-5", name: "Thermometer (Digital)", category: "SURGICAL & DIAGNOSTIC PRODUCTS",
    description: "Fast reading digital thermometer", price: 299, discount: 15,
    image: "/surgical-diagnostic-products/thermometer-digital.png"

  },
  {
    id: "surgical-6", name: "Otoscope (Diagnostic)", category: "SURGICAL & DIAGNOSTIC PRODUCTS",
    description: "Pocket otoscope with reusable specula", price: 3500, discount: 10,
    image: "/surgical-diagnostic-products/otoscope-diagnostic.png"

  },
  {
    id: "surgical-7", name: "Stethoscope (Dual Head)", category: "SURGICAL & DIAGNOSTIC PRODUCTS",
    description: "Littmann style cardiology stethoscope", price: 2850, discount: 8,
    image: "/surgical-diagnostic-products/stethoscope.png"

  },
  {
    id: "surgical-8", name: "Pulse Oximeter (Finger tip)", category: "SURGICAL & DIAGNOSTIC PRODUCTS",
    description: "SpO2 and pulse rate monitor", price: 1299, discount: 18,
    image: "/surgical-diagnostic-products/pulse-oximeter-finger.png"

  },
  {
    id: "surgical-9", name: "ECG Machine (3 Channel)", category: "SURGICAL & DIAGNOSTIC PRODUCTS",
    description: "Portable 3 channel electrocardiograph", price: 28500, discount: 5,
    image: "/surgical-diagnostic-products/ecg-machine.png"

  },
  {
    id: "surgical-10", name: "Nebulizer (Compressor)", category: "SURGICAL & DIAGNOSTIC PRODUCTS",
    description: "Home use compressor nebulizer machine", price: 2450, discount: 12,
    image: "/surgical-diagnostic-products/nebulizer.png"

  }
];

export default function Medicines() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialCategory = decodeURIComponent(
  searchParams.get("category") || ""
);


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
          Browse our wide range of prescription and over-the-counter medicines sourced directly from manufacturers.
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

      <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
        
        {/* Filters Sidebar */}
        <div className="hidden md:block space-y-6 sticky top-24">
          <div className="flex items-center gap-2 font-semibold text-slate-900 pb-4 border-b border-slate-200">
            <Filter className="h-4 w-4" /> Categories
          </div>
          
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer group" onClick={() => toggleCategory(cat.name)}>
                <Checkbox 
                  id={`cat-${cat.id}`} 
                  checked={selectedCategories.includes(cat.name)}
                />
                <div className="flex items-center gap-2 flex-1">
                  <cat.icon className="h-4 w-4 text-slate-500 group-hover:text-primary" />
                  <Label 
                    htmlFor={`cat-${cat.id}`}
                    className="text-sm font-medium text-slate-900 cursor-pointer group-hover:text-primary"
                  >
                    {cat.name}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="space-y-6">
          {/* Active Filters Mobile */}
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 md:hidden">
              {selectedCategories.map(cat => (
                <Badge key={cat} variant="secondary" className="px-3 py-1 gap-1 text-xs">
                  {cat}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-500" 
                    onClick={() => toggleCategory(cat)}
                  />
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-8 px-3"
                onClick={() => setSelectedCategories([])}
              >
                Clear all
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedicines.map((medicine) => (
              <Card key={medicine.id} className="group overflow-hidden border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all flex flex-col h-full">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 p-3 flex items-center justify-center overflow-hidden">
                  {medicine.discount > 0 && (
                    <Badge variant="destructive" className="absolute top-3 left-3 z-10 shadow-lg">
                      {medicine.discount}% OFF
                    </Badge>
                  )}
                  <img 
                    src={medicine.image} 
                    alt={medicine.name} 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-all duration-300"
                  />
                </div>
                <CardContent className="p-5 flex-1 flex flex-col pt-0">
                  <Badge className="w-fit text-xs mb-2">{medicine.category}</Badge>
                  <h3 className="font-bold text-slate-900 text-base mb-2 leading-tight group-hover:text-primary transition-colors">
                    {medicine.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex-1 mb-4 line-clamp-2">{medicine.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-xl text-slate-900">₹{medicine.price}</span>
                    <Button 
                      size="sm" 
                      className="px-4 h-10"
                      onClick={() => addToCart(medicine)}
                    >
                      Add Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMedicines.length === 0 && (
            <div className="col-span-full text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <Search className="h-16 w-16 text-slate-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No products found</h3>
              <p className="text-slate-500 mb-8">Try adjusting your search or filters</p>
              <Button 
                variant="outline" 
                onClick={() => {setSearch(""); setSelectedCategories([])}}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
