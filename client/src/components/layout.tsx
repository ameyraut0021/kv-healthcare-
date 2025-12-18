import { Link, useLocation } from "wouter";
import { ShoppingCart, User, MapPin, Search, Menu, X, Phone, Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/lib/cart-context";
import { Badge } from "@/components/ui/badge";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/medicines", label: "Medicines" },
    { href: "/lab-tests", label: "Lab Tests" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-xs sm:text-sm font-medium px-4">
        <span className="flex items-center justify-center gap-2">
          <span className="animate-pulse">🚚</span>
          We are delivering medicines now! Order and get it delivered quickly.
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Location */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold font-display text-xl">
                KM
              </div>
              <span className="hidden md:inline-block font-display font-bold text-xl tracking-tight text-primary">
                KwikMedi
              </span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground border-l pl-6">
              <MapPin className="h-4 w-4 text-primary" />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Delivery to</span>
                <span className="font-medium text-foreground">Select Location</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                  location === link.href ? "text-primary font-semibold" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-foreground/80 hover:text-primary">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-[10px]">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Link href="/login">
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t p-4 space-y-4 bg-background">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`text-sm font-medium px-4 py-2 rounded-md cursor-pointer ${
                    location === link.href ? "bg-primary/10 text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold font-display">
                  KM
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-primary">
                  KwikMedi
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                KwikMedi is your trusted healthcare partner, providing medicines, doctor consultations, and lab tests all in one place for your convenience.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Return Policy</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Services</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/medicines" className="hover:text-primary transition-colors cursor-pointer">Order Medicines</Link></li>
                <li><Link href="/lab-tests" className="hover:text-primary transition-colors cursor-pointer">Book Lab Tests</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Ayurveda</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Care Plan</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Contact Us</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <a href="mailto:support@kwikmedi.com" className="hover:text-primary transition-colors">support@kwikmedi.com</a>
                </li>
                <li className="flex gap-4 mt-4">
                  <a href="#" className="h-8 w-8 rounded-full bg-white border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"><Facebook className="h-4 w-4" /></a>
                  <a href="#" className="h-8 w-8 rounded-full bg-white border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"><Linkedin className="h-4 w-4" /></a>
                  <a href="#" className="h-8 w-8 rounded-full bg-white border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"><Instagram className="h-4 w-4" /></a>
                  <a href="#" className="h-8 w-8 rounded-full bg-white border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"><Twitter className="h-4 w-4" /></a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-xs text-muted-foreground">
            <p>© 2025 KwikMedi. All rights reserved by Vishzon Pharmaceuticals Pvt. Ltd.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
