import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      toast({ title: "Invalid Phone", description: "Please enter a valid 10-digit number", variant: "destructive" });
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      toast({ title: "OTP Sent", description: "Your OTP is 123456" });
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (otp === "123456") {
        localStorage.setItem("kwikmedi_token", "fake_token");
        localStorage.setItem("kwikmedi_user", JSON.stringify({ phone }));
        toast({ title: "Welcome back!", description: "You have successfully logged in." });
        setLocation("/profile");
      } else {
        toast({ title: "Invalid OTP", description: "Please try again.", variant: "destructive" });
      }
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid md:grid-cols-2">
      {/* Left Banner */}
      <div className="hidden md:flex flex-col justify-center p-12 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-4xl font-bold">+</span>
          </div>
          <h1 className="text-4xl font-bold font-display leading-tight">
            Your Health, <br/> Delivered.
          </h1>
          <p className="text-lg opacity-90 max-w-md">
            Access all your healthcare needs in one place. Fast, reliable, and secure.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center p-6 bg-slate-50">
        <Card className="w-full max-w-md shadow-xl border-none">
          <CardContent className="p-8 pt-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {step === "phone" ? "Welcome back" : "Verify OTP"}
              </h2>
              <p className="text-slate-500 text-sm">
                {step === "phone" 
                  ? "Sign in using your mobile number to continue" 
                  : `Enter the 6-digit code sent to ${phone}`
                }
              </p>
            </div>

            {step === "phone" ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Phone Number</label>
                  <div className="flex">
                    <span className="flex items-center justify-center px-4 border rounded-l-md bg-slate-50 text-slate-500 text-sm font-medium">
                      +91
                    </span>
                    <Input 
                      type="tel" 
                      placeholder="98765 43210" 
                      className="rounded-l-none h-12"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Send OTP
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">One Time Password</label>
                  <Input 
                    type="text" 
                    placeholder="• • • • • •" 
                    className="h-12 text-center text-lg tracking-widest"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <div className="flex justify-between text-xs mt-2">
                    <span className="text-slate-500">Didn't receive code?</span>
                    <button type="button" className="text-primary font-medium hover:underline" onClick={() => setStep("phone")}>
                      Change Number
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Verify & Login
                </Button>
              </form>
            )}
            
            <p className="text-xs text-center text-slate-400 mt-8">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
