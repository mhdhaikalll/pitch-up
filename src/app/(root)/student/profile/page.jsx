
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { 
    GraduationCap, 
    BookOpen, 
    Calendar, 
    Mail, 
    Users, 
    Building2,
    Pencil,
    Rocket,
    MapPin,
    Phone,
    Globe,
    Target,
    DollarSign,
    TrendingUp,
    X,
    Save,
    Linkedin
} from "lucide-react"

const studentData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@stanford.edu",
    phone: "+1 (555) 123-4567",
    avatar: "https://i.pravatar.cc/150?img=1",
    university: "Stanford University",
    location: "Stanford, California",
    course: "Bachelor of Science in Computer Science",
    semester: "6th Semester",
    expectedGraduation: "May 2027",
    gpa: "3.85",
    startupGroup: {
        name: "TechNova Solutions",
        role: "Co-Founder & CEO",
        description: "AI-powered analytics platform for small businesses",
        fullDescription: "TechNova Solutions is revolutionizing how small businesses leverage data. Our AI-powered analytics platform provides actionable insights, predictive analytics, and automated reporting - all designed specifically for small business owners who want enterprise-level intelligence without the complexity or cost.",
        industry: "Technology / SaaS",
        stage: "Seed Stage",
        fundingGoal: "$500,000",
        fundingRaised: "$125,000",
        founded: "March 2025",
        website: "www.technovasolutions.com",
        pitch: "We help small businesses make data-driven decisions with AI that's simple, affordable, and powerful.",
        members: 4,
        status: "Active",
        teamMembers: [
            {
                id: 1,
                name: "Sarah Johnson",
                role: "Co-Founder & CEO",
                avatar: "https://i.pravatar.cc/150?img=1",
                email: "sarah.johnson@stanford.edu",
                linkedin: "linkedin.com/in/sarahjohnson",
                bio: "Computer Science student with a passion for AI and entrepreneurship."
            },
            {
                id: 2,
                name: "Michael Chen",
                role: "Co-Founder & CTO",
                avatar: "https://i.pravatar.cc/150?img=11",
                email: "michael.chen@stanford.edu",
                linkedin: "linkedin.com/in/michaelchen",
                bio: "Full-stack developer specializing in machine learning and cloud architecture."
            },
            {
                id: 3,
                name: "Emily Rodriguez",
                role: "Head of Product",
                avatar: "https://i.pravatar.cc/150?img=5",
                email: "emily.rodriguez@stanford.edu",
                linkedin: "linkedin.com/in/emilyrodriguez",
                bio: "UX designer and product strategist with experience at tech startups."
            },
            {
                id: 4,
                name: "David Kim",
                role: "Lead Developer",
                avatar: "https://i.pravatar.cc/150?img=12",
                email: "david.kim@stanford.edu",
                linkedin: "linkedin.com/in/davidkim",
                bio: "Backend engineer focused on scalable data pipelines and analytics."
            }
        ]
    },
    skills: ["Python", "Machine Learning", "React", "Data Analytics", "Leadership"],
    bio: "Passionate entrepreneur and computer science student with a focus on artificial intelligence and machine learning. Founded TechNova Solutions to help small businesses leverage data-driven insights. Winner of the Stanford Startup Challenge 2025.",
}

export default function ProfilePage() {
    const [viewStartupOpen, setViewStartupOpen] = useState(false)
    const [teamMembersOpen, setTeamMembersOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editedStartup, setEditedStartup] = useState({
        name: studentData.startupGroup.name,
        description: studentData.startupGroup.description,
        fullDescription: studentData.startupGroup.fullDescription,
        industry: studentData.startupGroup.industry,
        stage: studentData.startupGroup.stage,
        fundingGoal: studentData.startupGroup.fundingGoal,
        website: studentData.startupGroup.website,
        pitch: studentData.startupGroup.pitch,
    })

    const handleSaveStartup = () => {
        // In a real app, this would save to the backend
        console.log("Saving startup:", editedStartup)
        setIsEditing(false)
    }

    const handleCancelEdit = () => {
        setEditedStartup({
            name: studentData.startupGroup.name,
            description: studentData.startupGroup.description,
            fullDescription: studentData.startupGroup.fullDescription,
            industry: studentData.startupGroup.industry,
            stage: studentData.startupGroup.stage,
            fundingGoal: studentData.startupGroup.fundingGoal,
            website: studentData.startupGroup.website,
            pitch: studentData.startupGroup.pitch,
        })
        setIsEditing(false)
    }

    return (
        <div className="p-6 space-y-6">
            {/* Main Profile Card */}
            <Card className="bg-muted/50">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Profile Picture & Basic Info */}
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                                <AvatarImage src={studentData.avatar} alt={studentData.name} />
                                <AvatarFallback className="text-3xl">
                                    {studentData.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Pencil className="h-4 w-4" />
                                Edit Profile
                            </Button>
                        </div>

                        {/* Profile Details */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-2xl font-bold">{studentData.name}</h1>
                                <p className="text-muted-foreground">{studentData.course}</p>
                            </div>

                            <p className="text-sm text-muted-foreground">{studentData.bio}</p>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2">
                                {studentData.skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Academic Information */}
                <Card className="bg-muted/50">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-uitm-teal" />
                            Academic Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">University</p>
                                <p className="font-medium">{studentData.university}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Location</p>
                                <p className="font-medium">{studentData.location}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Course</p>
                                <p className="font-medium">{studentData.course}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Semester</p>
                                <p className="font-medium">{studentData.semester}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center gap-3">
                            <GraduationCap className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Expected Graduation</p>
                                <p className="font-medium">{studentData.expectedGraduation}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">GPA</p>
                                <p className="font-medium">{studentData.gpa} / 4.00</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="bg-muted/50">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Mail className="h-5 w-5 text-green-500" />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Email Address</p>
                                <p className="font-medium">{studentData.email}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Phone Number</p>
                                <p className="font-medium">{studentData.phone}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Startup Group Information */}
                <Card className="bg-muted/50 lg:col-span-2">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Rocket className="h-5 w-5 text-orange-500" />
                            Startup Group
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                        TN
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-lg">{studentData.startupGroup.name}</h3>
                                            <Badge className="bg-uitm-gold/10 text-uitm-gold-dark">
                                                {studentData.startupGroup.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{studentData.startupGroup.role}</p>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    {studentData.startupGroup.description}
                                </p>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <Button 
                                        variant="link" 
                                        className="p-0 h-auto text-muted-foreground hover:text-primary"
                                        onClick={() => setTeamMembersOpen(true)}
                                    >
                                        {studentData.startupGroup.members} Team Members
                                    </Button>
                                </div>
                            </div>

                            <div className="flex md:flex-col gap-2">
                                <Button 
                                    variant="outline" 
                                    className="flex-1"
                                    onClick={() => setViewStartupOpen(true)}
                                >
                                    View Startup
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* View Startup Modal */}
            <Dialog open={viewStartupOpen} onOpenChange={(open) => {
                setViewStartupOpen(open)
                if (!open) setIsEditing(false)
            }}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                    TN
                                </div>
                                <div>
                                    <DialogTitle className="text-xl">
                                        {isEditing ? (
                                            <Input
                                                value={editedStartup.name}
                                                onChange={(e) => setEditedStartup({ ...editedStartup, name: e.target.value })}
                                                className="font-bold"
                                            />
                                        ) : (
                                            studentData.startupGroup.name
                                        )}
                                    </DialogTitle>
                                    <DialogDescription className="flex items-center gap-2">
                                        <Badge className="bg-uitm-gold/10 text-uitm-gold-dark">
                                            {studentData.startupGroup.status}
                                        </Badge>
                                        <span>{studentData.startupGroup.stage}</span>
                                    </DialogDescription>
                                </div>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Elevator Pitch */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium flex items-center gap-2">
                                <Target className="h-4 w-4 text-uitm-teal" />
                                Elevator Pitch
                            </Label>
                            {isEditing ? (
                                <Textarea
                                    value={editedStartup.pitch}
                                    onChange={(e) => setEditedStartup({ ...editedStartup, pitch: e.target.value })}
                                    rows={2}
                                />
                            ) : (
                                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                                    `{studentData.startupGroup.pitch}`
                                </p>
                            )}
                        </div>

                        {/* Full Description */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">About</Label>
                            {isEditing ? (
                                <Textarea
                                    value={editedStartup.fullDescription}
                                    onChange={(e) => setEditedStartup({ ...editedStartup, fullDescription: e.target.value })}
                                    rows={4}
                                />
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    {studentData.startupGroup.fullDescription}
                                </p>
                            )}
                        </div>

                        {/* Key Details Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Building2 className="h-3 w-3" />
                                    Industry
                                </Label>
                                {isEditing ? (
                                    <Input
                                        value={editedStartup.industry}
                                        onChange={(e) => setEditedStartup({ ...editedStartup, industry: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-sm font-medium">{studentData.startupGroup.industry}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" />
                                    Stage
                                </Label>
                                {isEditing ? (
                                    <Input
                                        value={editedStartup.stage}
                                        onChange={(e) => setEditedStartup({ ...editedStartup, stage: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-sm font-medium">{studentData.startupGroup.stage}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />
                                    Funding Goal
                                </Label>
                                {isEditing ? (
                                    <Input
                                        value={editedStartup.fundingGoal}
                                        onChange={(e) => setEditedStartup({ ...editedStartup, fundingGoal: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-sm font-medium">{studentData.startupGroup.fundingGoal}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />
                                    Raised So Far
                                </Label>
                                <p className="text-sm font-medium text-green-600">{studentData.startupGroup.fundingRaised}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Founded
                                </Label>
                                <p className="text-sm font-medium">{studentData.startupGroup.founded}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Globe className="h-3 w-3" />
                                    Website
                                </Label>
                                {isEditing ? (
                                    <Input
                                        value={editedStartup.website}
                                        onChange={(e) => setEditedStartup({ ...editedStartup, website: e.target.value })}
                                    />
                                ) : (
                                    <a href={`https://${studentData.startupGroup.website}`} className="text-sm font-medium text-uitm-teal hover:underline">
                                        {studentData.startupGroup.website}
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Team Preview */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium flex items-center gap-2">
                                <Users className="h-4 w-4 text-purple-500" />
                                Team Members
                            </Label>
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {studentData.startupGroup.teamMembers.slice(0, 4).map((member) => (
                                        <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                                            <AvatarImage src={member.avatar} alt={member.name} />
                                            <AvatarFallback className="text-xs">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-muted-foreground"
                                    onClick={() => {
                                        setViewStartupOpen(false)
                                        setTeamMembersOpen(true)
                                    }}
                                >
                                    View all {studentData.startupGroup.members} members →
                                </Button>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        {isEditing ? (
                            <div className="flex gap-2 w-full">
                                <Button variant="outline" className="flex-1" onClick={handleCancelEdit}>
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </Button>
                                <Button className="flex-1 bg-uitm-gold hover:bg-uitm-gold-dark text-black" onClick={handleSaveStartup}>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </div>
                        ) : (
                            <Button className="w-full bg-uitm-teal hover:bg-uitm-teal-dark" onClick={() => setIsEditing(true)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit Startup
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Team Members Modal */}
            <Dialog open={teamMembersOpen} onOpenChange={setTeamMembersOpen}>
                <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-purple-500" />
                            Team Members
                        </DialogTitle>
                        <DialogDescription>
                            {studentData.startupGroup.name} • {studentData.startupGroup.members} members
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {studentData.startupGroup.teamMembers.map((member) => (
                            <div key={member.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                                <Avatar className="h-14 w-14 border-2 border-background">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold">{member.name}</h4>
                                        {member.name === studentData.name && (
                                            <Badge variant="secondary" className="text-xs">You</Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-uitm-teal">{member.role}</p>
                                    <p className="text-xs text-muted-foreground">{member.bio}</p>
                                    <div className="flex items-center gap-4 pt-2">
                                        <a href={`mailto:${member.email}`} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                                            <Mail className="h-3 w-3" />
                                            {member.email}
                                        </a>
                                        <a href={`https://${member.linkedin}`} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                                            <Linkedin className="h-3 w-3" />
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" className="w-full" onClick={() => setTeamMembersOpen(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
