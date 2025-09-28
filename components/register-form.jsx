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
import axios from "axios"

export function RegisterForm({ className, ...props }) {
    const [formData, setFormData] = useState({email: "", password: "" , FirstName: "", LastName: ""});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handlechange = (e) => {
        const {name, value} = e.target;
        setFormData((perv) => ({ ...perv, [name]: value}));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // this is just for testing by Koya ^_^
        // return console.log('Form data:', formData);
        

        setLoading(true);
        
        try {
            // step 1: register with only email/password/username by koya ^_^
            const registerRes = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local/register`,
                {
                    username: formData.FirstName + formData.LastName,
                    email: formData.email,
                    password: formData.password,
                }
            )


        const jwt = registerRes.data.jwt;
        const userId = registerRes.data.user.id;

        // step 2: update the user with the FirstName and LastName by koya ^_^
        await axios.put(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users/${userId}`,
            {
                FirstName: formData.FirstName,
                LastName: formData.LastName,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        
        // step 3: let's the user login automatically after register by Koya ^_^
        const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        });

        if (!res?.error) {
            router.replace("/dashboard");
        }else {
            toast.error("Login after registration failed. Please try again.");
        }

        } catch (error) {
            console.log('Registration error:', error);
            
            toast.error(error?.response?.data?.error?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }

        
    };


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
            <CardHeader className="text-center">
            <CardTitle className="text-xl">Register</CardTitle>
            <CardDescription>
                please enter your details to create an account.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleRegister} >
                <div className="grid gap-6">
                <div className="grid gap-6">
                    <div className="grid gap-3">
                    
                    <Label htmlFor="FirstName">First Name</Label>

                    <Input 
                        id="FirstName" 
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handlechange}
                        type="text"
                        placeholder="e.g mohamed"
                        required
                    />
                    </div>
                    <div className="grid gap-3">

                    <Label htmlFor="LastName">Last Name</Label>

                    <Input 
                        id="LastName" 
                        name="LastName"
                        value={formData.LastName}
                        onChange={handlechange}
                        type="text"
                        placeholder="e.g koya"
                        required
                    />
                    </div>
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
                    {loading ? "Registering..." : "Register"}
                    </Button>
                </div>
                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="underline underline-offset-4">
                    Login
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
