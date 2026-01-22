"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { 
    Users, 
    UserCheck, 
    GraduationCap, 
    Presentation,
    CheckCircle,
    XCircle,
    Clock,
    TrendingUp,
    TrendingDown,
    X
} from "lucide-react"

const statsData = [
    { 
        title: "Total User", 
        value: 1247, 
        icon: Users,
        trend: "+12%",
        trendUp: true,
        color: "text-grey-100"
    },
    { 
        title: "Total Verified User", 
        value: 892, 
        icon: UserCheck,
        trend: "+8%",
        trendUp: true,
        color: "text-grey-100"
    },
    { 
        title: "Total Student Registered", 
        value: 534, 
        icon: GraduationCap,
        trend: "+23%",
        trendUp: true,
        color: "text-grey-100"
    },
    { 
        title: "Total Pitch", 
        value: 89, 
        icon: Presentation,
        trend: "-3%",
        trendUp: false,
        color: "text-grey-100"
    },
]

const pieData = [
    { name: "Verified Students", value: 534, color: "#00BFA5" },
    { name: "Verified Investors", value: 245, color: "#660066" },
    { name: "Pending Verification", value: 113, color: "#FFC107" },
    { name: "Unverified", value: 355, color: "#6b7280" },
]

const pendingVerifications = [
    { 
        id: 1, 
        name: "Sarah Johnson", 
        email: "sarah.j@university.edu",
        type: "Student",
        avatar: "https://i.pravatar.cc/150?img=1",
        submittedAt: "2 hours ago",
        company: "Stanford University",
        profilePitch: "Aspiring entrepreneur with a passion for sustainable technology",
        description: "Final year Computer Science student with experience in developing mobile applications. Founded a campus recycling initiative that reduced waste by 30%. Looking to connect with investors for my upcoming green-tech startup."
    },
    { 
        id: 2, 
        name: "Michael Chen", 
        email: "m.chen@techventures.com",
        type: "Investor",
        avatar: "https://i.pravatar.cc/150?img=2",
        submittedAt: "3 hours ago",
        company: "Tech Ventures Capital",
        profilePitch: "Angel investor focused on early-stage tech startups",
        description: "10+ years of experience in venture capital with a focus on AI and machine learning startups. Previously invested in 15+ successful companies with 3 exits. Looking to mentor and fund the next generation of tech entrepreneurs."
    },
    { 
        id: 3, 
        name: "Emily Davis", 
        email: "emily.d@startup.io",
        type: "Student",
        avatar: "https://i.pravatar.cc/150?img=3",
        submittedAt: "5 hours ago",
        company: "MIT",
        profilePitch: "Healthcare innovation enthusiast",
        description: "Biomedical Engineering student working on affordable diagnostic tools for developing countries. Winner of the MIT Health Innovation Challenge 2025."
    },
    { 
        id: 4, 
        name: "James Wilson", 
        email: "jwilson@capital.vc",
        type: "Investor",
        avatar: "https://i.pravatar.cc/150?img=4",
        submittedAt: "6 hours ago",
        company: "Wilson Capital Partners",
        profilePitch: "Growth-stage investor in fintech and edtech",
        description: "Managing Partner at Wilson Capital with $50M AUM. Specializing in Series A and B rounds for financial technology and education technology companies."
    },
    { 
        id: 5, 
        name: "Amanda Lee", 
        email: "amanda.lee@edu.com",
        type: "Student",
        avatar: "https://i.pravatar.cc/150?img=5",
        submittedAt: "8 hours ago",
        company: "Berkeley University",
        profilePitch: "Social impact entrepreneur",
        description: "MBA candidate focused on social entrepreneurship. Building a platform to connect skilled volunteers with nonprofits in need."
    },
    { 
        id: 6, 
        name: "Robert Brown", 
        email: "r.brown@invest.co",
        type: "Investor",
        avatar: "https://i.pravatar.cc/150?img=6",
        submittedAt: "1 day ago",
        company: "Brown Investments LLC",
        profilePitch: "Seed investor for consumer tech",
        description: "Former tech executive turned angel investor. Interested in consumer-facing applications with viral potential."
    },
    { 
        id: 7, 
        name: "Lisa Wang", 
        email: "lisa.w@college.edu",
        type: "Student",
        avatar: "https://i.pravatar.cc/150?img=7",
        submittedAt: "1 day ago",
        company: "Harvard Business School",
        profilePitch: "EdTech innovator and future founder",
        description: "Working on an AI-powered tutoring platform that personalizes learning for K-12 students. Seeking mentorship and pre-seed funding."
    },
    { 
        id: 8, 
        name: "David Kim", 
        email: "d.kim@ventures.com",
        type: "Investor",
        avatar: "https://i.pravatar.cc/150?img=8",
        submittedAt: "2 days ago",
        company: "Kim Ventures",
        profilePitch: "Deep tech and hardware investor",
        description: "Engineer-turned-investor with expertise in semiconductors and IoT devices. Looking for hardware startups with strong IP."
    },
]

export default function Dashboard() {
    const [verifications, setVerifications] = useState(pendingVerifications)
    const [selectedUser, setSelectedUser] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleUserClick = (user) => {
        setSelectedUser(user)
        setIsDialogOpen(true)
    }

    const handleVerify = () => {
        if (selectedUser) {
            setVerifications(prev => prev.filter(item => item.id !== selectedUser.id))
            setIsDialogOpen(false)
            setSelectedUser(null)
        }
    }

    const handleReject = () => {
        if (selectedUser) {
            setVerifications(prev => prev.filter(item => item.id !== selectedUser.id))
            setIsDialogOpen(false)
            setSelectedUser(null)
        }
    }

    return (
        <div className="p-4 space-y-4">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <Card key={index} className="bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <Icon className={`h-5 w-5 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <p className="text-3xl font-bold">{stat.value.toLocaleString()}</p>
                                    <div className={`flex items-center gap-1 text-sm ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                                        {stat.trendUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                        <span>{stat.trend}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Bottom Row: Pie Chart and Pending Verification */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Pie Chart */}
                <Card className="lg:col-span-2 bg-muted/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            User Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={140}
                                    paddingAngle={3}
                                    dataKey="value"
                                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    formatter={(value) => [value.toLocaleString(), "Users"]}
                                    contentStyle={{ 
                                        backgroundColor: 'hsl(var(--card))', 
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Pending Verification List */}
                <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Pending Verification
                            </span>
                            <Badge variant="secondary">{verifications.length}</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[400px] px-4">
                            <div className="space-y-3 pb-4">
                                {verifications.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                                        <CheckCircle className="h-12 w-12 mb-2" />
                                        <p>All caught up!</p>
                                    </div>
                                ) : (
                                    verifications.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
                                            onClick={() => handleUserClick(item)}
                                        >
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={item.avatar} alt={item.name} />
                                                <AvatarFallback>
                                                    {item.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-medium truncate">{item.name}</p>
                                                    <Badge variant="outline" className="text-xs">
                                                        {item.type}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground truncate">{item.email}</p>
                                                <p className="text-xs text-muted-foreground">{item.submittedAt}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* User Verification Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                    
                    {selectedUser && (
                        <div className="flex flex-col items-center space-y-4 pt-4">
                            {/* Avatar */}
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                                <AvatarFallback className="text-2xl">
                                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>

                            {/* User Details */}
                            <div className="w-full space-y-3">
                                <div className="bg-muted rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Name</p>
                                    <p className="font-medium">{selectedUser.name}</p>
                                </div>

                                <div className="bg-muted rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Company / Institution</p>
                                    <p className="font-medium">{selectedUser.company}</p>
                                </div>

                                <div className="bg-muted rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Profile Pitch</p>
                                    <p className="font-medium">{selectedUser.profilePitch}</p>
                                </div>

                                <div className="bg-muted rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Description</p>
                                    <p className="text-sm">{selectedUser.description}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 w-full pt-2">
                                <Button 
                                    className="flex-1 bg-uitm-teal hover:bg-uitm-teal-dark text-white"
                                    onClick={handleVerify}
                                >
                                    Verify
                                </Button>
                                <Button 
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={handleReject}
                                >
                                    No
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
