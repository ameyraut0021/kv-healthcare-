import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ShieldCheck, Package, Truck, Award } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function AboutUs() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "About Us", icon: Home },
    { id: "brand", label: "ELUMIDE", icon: Award },
    { id: "quality", label: "Quality", icon: ShieldCheck }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 min-h-screen">
      {/* Header */}
      <div className="space-y-6 text-center max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
            KR Healthcare
          </h1>
          <p className="text-xl text-slate-600 font-medium">KR Healthcare is our final flagship system</p>
        </div>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          KR Lumide patient connects USP, superior ELUMIDE represents superior products, creating value beyond generics.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
            className="gap-2 font-medium"
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - About Us */}
        <Card className="lg:col-span-1 border-slate-100 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">KR</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">About Us</h3>
            </div>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>KR Healthcare, our flagship presented ELUMIDE represents our superior products, creating value beyond generics.</p>
              <p>KR Lumide patient connects USP, superior ELUMIDE represents superior products.</p>
            </div>
          </CardContent>
        </Card>

        {/* Middle Column - Flagship Brand */}
        <Card className="lg:col-span-1 border-slate-100 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-8 text-center">
            <div className="w-28 h-28 bg-white rounded-2xl shadow-xl mx-auto mb-6 flex items-center justify-center border-4 border-white">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ELUMIDE
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Flagship Brand</h3>
            <p className="text-slate-600 text-sm mb-6">ELUMIDE - Superior quality pharmaceuticals</p>
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-blue-600">
              <ShieldCheck className="h-4 w-4" />
              <span>Trusted Worldwide</span>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Quality Assurance */}
        <Card className="lg:col-span-1 border-slate-100 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <ShieldCheck className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Quality Assurance & Compliance</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Certified on Act. It's a WHO-GMP.USFDA</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>A robot system ensures raw material to the final system.</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Pharmaceutical compliance - All US (USP or EP), pharmacopeias.</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>ICH stability testing based on all climatic zones guarantee product life through out that.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-slate-900 to-gray-900 text-white rounded-3xl p-12 text-center space-y-6">
        <Award className="h-16 w-16 mx-auto text-yellow-400" />
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted Quality Worldwide</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            KR Healthcare delivers superior ELUMIDE products with global compliance and quality assurance.
          </p>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 text-white text-lg px-12 h-14 rounded-2xl shadow-2xl">
          Explore Products
        </Button>
      </div>
    </div>
  );
}
