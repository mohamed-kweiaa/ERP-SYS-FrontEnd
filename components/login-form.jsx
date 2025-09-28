"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function LoginForm({ className, ...props }) {
  const [formData, setFormData] = useState({email: "", password: ""});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlechange = (e) => {
    const {name, value} = e.target;
    setFormData((perv) => ({ ...perv, [name]: value}));
  };

  const handleLoging = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    // Simulate an API call
    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.ok) {
      // Handle successful login, e.g., redirect to dashboard
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } else {
      // Handle login error, e.g., show error message
      toast.error("Login failed");
    };

    setLoading(false);    // Handle form submission logic here

    // console.log('Form data:', formData);
    
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Login with your Credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLoging} >
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handlechange}
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handlechange}
                    placeholder="Your password"
                    type="password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/register" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* use this if case you want to add some Terms Of Service & Privacy policy of your own */}
      {/* <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */} 
    </div>
  );
}
