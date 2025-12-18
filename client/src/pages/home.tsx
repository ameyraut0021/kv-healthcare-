import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowRight, ShieldCheck, Clock, Headset, Star, Phone } from "lucide-react";
import { categories, medicines, labTests, testimonials, assets } from "@/lib/mockData";
import { useCart } from "@/lib/cart-context";
import { Link } from "wouter";

export default function Home() {
  const { addToCart } = useCart();
  const popularMedicines = medicines.slice(0, 5);
  const recommendedTests = labTests.slice(0, 6);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white min-h-[500px] flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 animate-in slide-in-from-left duration-700">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-[1.1]">
              Your Complete Healthcare Solution
            </h1>
            <p className="text-xl text-blue-100 max-w-lg">
              Medicines and Lab Tests – all in one place.
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm font-medium text-blue-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Genuine Medicines
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Fast Delivery
              </div>
              <div className="flex items-center gap-2">
                <Headset className="h-5 w-5 text-primary" />
                24/7 Support
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/medicines">
                <Button size="lg" className="h-12 px-8 rounded-full text-base font-semibold bg-white text-blue-900 hover:bg-blue-50 border-none">
                  Browse Medicines
                </Button>
              </Link>
              <Link href="/lab-tests">
                <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-base font-semibold border-white/30 text-white hover:bg-white/10 hover:text-white">
                  Book Lab Test
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden md:block relative animate-in fade-in zoom-in duration-1000 delay-200">
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img 
                  src={assets.hero} 
                  alt="Doctor with medicine" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/medicines">
            <div className="group cursor-pointer bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-between">
              <div>
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <span className="text-2xl font-bold">+</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Medicines</h3>
                <p className="text-slate-500 mb-4 max-w-xs">Order prescription and OTC medicines with doorstep delivery.</p>
                <span className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Browse Medicines <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              <div className="w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
            </div>
          </Link>

          <Link href="/lab-tests">
            <div className="group cursor-pointer bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-between">
              <div>
                <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <span className="text-2xl font-bold">⚗️</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Lab Tests</h3>
                <p className="text-slate-500 mb-4 max-w-xs">Book diagnostic tests with home sample collection.</p>
                <span className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Book Test <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              <div className="w-24 h-24 bg-purple-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
            </div>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900">Medicine Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/medicines?category=${cat.name}`}>
              <div className="group relative h-40 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex items-end">
                  <span className="text-white font-semibold text-lg">{cat.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended Package */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-100">
          <div className="space-y-4 max-w-xl">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase">
              Recommended Packages
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Home Sample Collection
            </h2>
            <p className="text-slate-600">
              Book diagnostic tests with home sample collection. Get accurate results and digital reports delivered to your email.
            </p>
            <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-700 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                Home Collection
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                Quick Results
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                NABL Accredited
              </div>
            </div>
            <Link href="/lab-tests">
              <Button size="lg" className="mt-4">
                Book Test
              </Button>
            </Link>
          </div>
          <div className="hidden md:block w-1/3">
             <img src={assets.lab} alt="Lab Test" className="w-full h-auto rounded-lg shadow-lg rotate-3 hover:rotate-0 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* Popular Medicines */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Popular Medicines</h2>
          <Link href="/medicines">
            <a className="text-primary font-medium hover:underline">View all</a>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {popularMedicines.map((medicine) => (
            <Card key={medicine.id} className="group overflow-hidden border-slate-100 hover:border-primary/20 hover:shadow-lg transition-all">
              <div className="relative aspect-square bg-slate-50 p-4 flex items-center justify-center">
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
              <CardContent className="p-4">
                <div className="text-xs text-slate-500 mb-1">{medicine.category}</div>
                <h3 className="font-semibold text-slate-900 mb-1 truncate" title={medicine.name}>
                  {medicine.name}
                </h3>
                <div className="text-xs text-slate-400 mb-3">{medicine.description}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-lg text-slate-900">₹{medicine.price}</span>
                  <Button size="sm" onClick={() => addToCart(medicine)}>
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recommended Lab Test Packages */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Recommended Test Packages</h2>
          <Link href="/lab-tests">
            <a className="text-primary font-medium hover:underline">View all</a>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedTests.map((test) => (
            <Link key={test.id} href={`/lab-tests?test=${test.id}`}>
              <Card className="group overflow-hidden border-slate-100 hover:border-primary/20 hover:shadow-lg transition-all cursor-pointer">
                <div className="relative h-40 bg-slate-50 flex items-center justify-center overflow-hidden">
                  <img 
                    src={test.image} 
                    alt={test.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <CardContent className="p-4">
                  <div className="text-xs text-primary font-medium mb-2 uppercase tracking-wide">{test.category}</div>
                  <h3 className="font-semibold text-slate-900 mb-2">{test.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">{test.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">₹{test.price}</span>
                    <Button size="sm" variant="outline">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 bg-slate-50/50 py-16 rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">What Our Customers Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <Card key={t.id} className="border-none shadow-sm bg-white">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}`} 
                    />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.city}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Support CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-white border rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-900">Need Help?</h2>
            <p className="text-slate-600">Our healthcare experts are available 24/7 to assist you with your orders and queries.</p>
            <Button size="lg" className="gap-2">
              <Phone className="h-4 w-4" /> Contact Support
            </Button>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
             <img src="https://illustrations.popsy.co/teal/customer-support.svg" alt="Support" className="h-48 w-auto" />
          </div>
        </div>
      </section>

    </div>
  );
}
