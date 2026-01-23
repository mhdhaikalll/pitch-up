"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [errors, setErrors] = useState({})

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value })
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: null })
        }
    }

    const validateForm = () => {
        const newErrors = {}
        
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required"
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required"
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }
        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }
        if (!agreeTerms) {
            newErrors.terms = "You must agree to the terms and conditions"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleRegister = (e) => {
        e.preventDefault()
        
        if (validateForm()) {
            console.log("Registration attempt:", formData)
            // In a real app, this would create an account via the backend
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4 sm:p-6 lg:p-8">
            <Card className="w-full max-w-[420px] shadow-xl border-0 bg-card/95 backdrop-blur-sm">
                <CardContent className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight">
                            Create Account
                        </h1>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Join Pitch Up and start your journey
                        </p>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={handleChange("firstName")}
                                    className={`h-11 transition-all focus:ring-2 focus:ring-uitm-teal/20 focus:border-uitm-teal ${errors.firstName ? 'border-destructive focus:ring-destructive/20' : ''}`}
                                    autoComplete="given-name"
                                />
                                {errors.firstName && (
                                    <p className="text-xs text-destructive mt-1">{errors.firstName}</p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={handleChange("lastName")}
                                    className={`h-11 transition-all focus:ring-2 focus:ring-uitm-teal/20 focus:border-uitm-teal ${errors.lastName ? 'border-destructive focus:ring-destructive/20' : ''}`}
                                    autoComplete="family-name"
                                />
                                {errors.lastName && (
                                    <p className="text-xs text-destructive mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange("email")}
                                className={`h-11 transition-all focus:ring-2 focus:ring-uitm-teal/20 focus:border-uitm-teal ${errors.email ? 'border-destructive focus:ring-destructive/20' : ''}`}
                                autoComplete="email"
                            />
                            {errors.email && (
                                <p className="text-xs text-destructive mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Min. 8 characters"
                                value={formData.password}
                                onChange={handleChange("password")}
                                className={`h-11 transition-all focus:ring-2 focus:ring-uitm-teal/20 focus:border-uitm-teal ${errors.password ? 'border-destructive focus:ring-destructive/20' : ''}`}
                                autoComplete="new-password"
                            />
                            {errors.password && (
                                <p className="text-xs text-destructive mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-1.5">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Re-enter your password"
                                value={formData.confirmPassword}
                                onChange={handleChange("confirmPassword")}
                                className={`h-11 transition-all focus:ring-2 focus:ring-uitm-teal/20 focus:border-uitm-teal ${errors.confirmPassword ? 'border-destructive focus:ring-destructive/20' : ''}`}
                                autoComplete="new-password"
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Terms & Conditions */}
                        <div className="space-y-1 pt-1">
                            <div className="flex items-start space-x-2.5">
                                <Checkbox 
                                    id="terms" 
                                    checked={agreeTerms}
                                    onCheckedChange={(checked) => {
                                        setAgreeTerms(checked)
                                        if (errors.terms) {
                                            setErrors({ ...errors, terms: null })
                                        }
                                    }}
                                    className="mt-0.5 data-[state=checked]:bg-uitm-teal data-[state=checked]:border-uitm-teal"
                                />
                                <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed text-muted-foreground">
                                    I agree to the{" "}
                                    <Link href="#" className="text-uitm-teal hover:text-uitm-teal-dark font-medium transition-colors">
                                        Terms of Service
                                    </Link>
                                    {" "}and{" "}
                                    <Link href="#" className="text-uitm-teal hover:text-uitm-teal-dark font-medium transition-colors">
                                        Privacy Policy
                                    </Link>
                                </Label>
                            </div>
                            {errors.terms && (
                                <p className="text-xs text-destructive ml-6">{errors.terms}</p>
                            )}
                        </div>

                        {/* Create Account Button */}
                        <Button 
                            type="submit" 
                            className="w-full h-11 bg-uitm-teal hover:bg-uitm-teal-dark text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-uitm-teal/25 active:scale-[0.98] mt-2"
                        >
                            Create Account
                        </Button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Already have an account?{" "}
                        <Link 
                            href="/login" 
                            className="text-uitm-teal hover:text-uitm-teal-dark font-semibold transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
