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
        <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardContent className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            SIGN UP
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Create an account to explore Pitch Up
                        </p>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleChange("firstName")}
                                    className={`h-11 ${errors.firstName ? 'border-destructive' : ''}`}
                                />
                                {errors.firstName && (
                                    <p className="text-xs text-destructive">{errors.firstName}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={handleChange("lastName")}
                                    className={`h-11 ${errors.lastName ? 'border-destructive' : ''}`}
                                />
                                {errors.lastName && (
                                    <p className="text-xs text-destructive">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange("email")}
                                className={`h-11 ${errors.email ? 'border-destructive' : ''}`}
                            />
                            {errors.email && (
                                <p className="text-xs text-destructive">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange("password")}
                                className={`h-11 ${errors.password ? 'border-destructive' : ''}`}
                            />
                            {errors.password && (
                                <p className="text-xs text-destructive">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange("confirmPassword")}
                                className={`h-11 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-destructive">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Terms & Conditions */}
                        <div className="space-y-1">
                            <div className="flex items-start space-x-2">
                                <Checkbox 
                                    id="terms" 
                                    checked={agreeTerms}
                                    onCheckedChange={(checked) => {
                                        setAgreeTerms(checked)
                                        if (errors.terms) {
                                            setErrors({ ...errors, terms: null })
                                        }
                                    }}
                                    className="mt-0.5"
                                />
                                <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
                                    By signing up, you`re agree to our{" "}
                                    <Link href="/terms" className="text-uitm-teal hover:underline">
                                        Terms and Condition
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
                            className="w-full h-11 bg-uitm-teal hover:bg-uitm-teal-dark text-white font-medium mt-2"
                        >
                            Create an Account
                        </Button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Already have an account?{" "}
                        <Link 
                            href="/login" 
                            className="text-uitm-teal hover:underline font-medium"
                        >
                            Log In
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
