
"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { 
    FileText, 
    Upload, 
    CheckCircle,
    Pencil,
    ImageIcon
} from "lucide-react"

// Dummy data for pre-filled form
const initialProfileData = {
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@stanford.edu",
    contactNumber: "+1 (555) 123-4567",
    teamMembers: "Michael Chen, Emily Rodriguez, David Kim",
    avatar: "https://i.pravatar.cc/150?img=1",
    startup: {
        name: "TechNova Solutions",
        description: "AI-powered analytics platform for small businesses. We help small business owners leverage data-driven insights with enterprise-level intelligence without the complexity or cost.",
        logo: null,
    }
}

export default function UpdateProfilePage() {
    const [profileData, setProfileData] = useState(initialProfileData)
    const [successDialogOpen, setSuccessDialogOpen] = useState(false)
    const [pitchDeck, setPitchDeck] = useState(null)
    const [pitchVideo, setPitchVideo] = useState(null)
    
    const avatarRef = useRef(null)
    const startupLogoRef = useRef(null)
    const pitchDeckRef = useRef(null)
    const pitchVideoRef = useRef(null)

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setProfileData({ ...profileData, avatar: url })
        }
    }

    const handleStartupLogoChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setProfileData({ 
                ...profileData, 
                startup: { ...profileData.startup, logo: url } 
            })
        }
    }

    const handlePitchDeckUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setPitchDeck(file)
        }
    }

    const handlePitchVideoUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setPitchVideo(file)
        }
    }

    const handleUpdate = () => {
        console.log("Updating profile:", profileData)
        console.log("Pitch Deck:", pitchDeck)
        console.log("Pitch Video:", pitchVideo)
        setSuccessDialogOpen(true)
    }

    return (
        <div className="p-6 space-y-6">
            {/* Personal Information Card */}
            <Card className="bg-muted/50">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="relative">
                                <Avatar className="h-24 w-24 border-2 border-background">
                                    <AvatarImage src={profileData.avatar} alt="Profile" />
                                    <AvatarFallback className="text-2xl">
                                        {profileData.firstName[0]}{profileData.lastName[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <button 
                                    className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-background border-2 border-muted flex items-center justify-center hover:bg-muted transition-colors"
                                    onClick={() => avatarRef.current?.click()}
                                >
                                    <Pencil className="h-3 w-3" />
                                </button>
                                <input
                                    ref={avatarRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={profileData.firstName}
                                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={profileData.lastName}
                                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contactNumber">Contact Number</Label>
                                <Input
                                    id="contactNumber"
                                    value={profileData.contactNumber}
                                    onChange={(e) => setProfileData({ ...profileData, contactNumber: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="teamMembers">Team Members</Label>
                                <Input
                                    id="teamMembers"
                                    value={profileData.teamMembers}
                                    onChange={(e) => setProfileData({ ...profileData, teamMembers: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Startup Information Card */}
            <Card className="bg-muted/50">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Startup Logo Section */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="relative">
                                <div className="h-24 w-24 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center bg-muted/30">
                                    {profileData.startup.logo ? (
                                        <img 
                                            src={profileData.startup.logo} 
                                            alt="Startup Logo" 
                                            className="h-full w-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <ImageIcon className="h-10 w-10 text-muted-foreground" />
                                    )}
                                </div>
                                <button 
                                    className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-background border-2 border-muted flex items-center justify-center hover:bg-muted transition-colors"
                                    onClick={() => startupLogoRef.current?.click()}
                                >
                                    <Pencil className="h-3 w-3" />
                                </button>
                                <input
                                    ref={startupLogoRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleStartupLogoChange}
                                />
                            </div>
                        </div>

                        {/* Startup Form Fields */}
                        <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="startupName">Startup Name</Label>
                                <Input
                                    id="startupName"
                                    value={profileData.startup.name}
                                    onChange={(e) => setProfileData({ 
                                        ...profileData, 
                                        startup: { ...profileData.startup, name: e.target.value } 
                                    })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="startupDescription">Startup Description</Label>
                                <Textarea
                                    id="startupDescription"
                                    value={profileData.startup.description}
                                    onChange={(e) => setProfileData({ 
                                        ...profileData, 
                                        startup: { ...profileData.startup, description: e.target.value } 
                                    })}
                                    rows={4}
                                    className="resize-none"
                                />
                            </div>

                            {/* Upload Buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div 
                                    className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
                                    onClick={() => pitchDeckRef.current?.click()}
                                >
                                    <input
                                        ref={pitchDeckRef}
                                        type="file"
                                        accept=".pdf,.ppt,.pptx"
                                        className="hidden"
                                        onChange={handlePitchDeckUpload}
                                    />
                                    <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground">
                                        {pitchDeck ? pitchDeck.name : "Replace Pitch Deck"}
                                    </p>
                                </div>

                                <div 
                                    className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
                                    onClick={() => pitchVideoRef.current?.click()}
                                >
                                    <input
                                        ref={pitchVideoRef}
                                        type="file"
                                        accept="video/*"
                                        className="hidden"
                                        onChange={handlePitchVideoUpload}
                                    />
                                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground">
                                        {pitchVideo ? pitchVideo.name : "Replace Pitch Video"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Update Button */}
                    <div className="flex justify-end mt-6">
                        <Button 
                            className="bg-uitm-gold hover:bg-uitm-gold-dark text-black px-8"
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Success Dialog */}
            <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
                <DialogContent className="max-w-md">
                    <div className="flex flex-col items-center justify-center py-8 gap-4">
                        <div className="h-16 w-16 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                            <CheckCircle className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-xl font-semibold">Update Success!</h2>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
