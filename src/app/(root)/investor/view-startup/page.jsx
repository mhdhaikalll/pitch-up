"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogClose,
} from "@/components/ui/dialog"
import { X, Play } from "lucide-react"

const startupsData = [
    {
        id: 1,
        name: "TechNova Solutions",
        team: "TechNova Team",
        description: "AI-powered analytics platform for small businesses. We help companies make data-driven decisions with our easy-to-use dashboard and predictive insights engine.",
        fullDescription: "TechNova Solutions is revolutionizing how small businesses approach data analytics. Our platform combines machine learning algorithms with intuitive visualization tools to provide actionable insights. Founded by former Google engineers, we've already helped over 500 businesses increase their revenue by an average of 23%.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
        video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        industries: ["AI", "Analytics", "SaaS"],
    },
    {
        id: 2,
        name: "GreenLeaf Energy",
        team: "GreenLeaf Founders",
        description: "Sustainable energy solutions for urban areas. Our solar panel technology is 40% more efficient than traditional alternatives while being more affordable.",
        fullDescription: "GreenLeaf Energy is on a mission to make renewable energy accessible to everyone. Our proprietary solar technology uses advanced materials that capture more sunlight while reducing manufacturing costs. We're currently deployed in 15 cities with plans to expand globally.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop",
        video: null,
        industries: ["CleanTech", "Energy", "Sustainability"],
    },
    {
        id: 3,
        name: "HealthBridge",
        team: "HealthBridge Collective",
        description: "Telemedicine platform connecting rural patients with specialists. Breaking down geographical barriers to quality healthcare access.",
        fullDescription: "HealthBridge is transforming healthcare delivery in underserved communities. Our platform connects patients in rural areas with board-certified specialists through high-quality video consultations. We've facilitated over 50,000 consultations and reduced average diagnosis time by 60%.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
        video: null,
        industries: ["HealthTech", "Telemedicine", "Social Impact"],
    },
    {
        id: 4,
        name: "EduSpark",
        team: "EduSpark Academy",
        description: "Gamified learning platform for K-12 students. Making education fun and engaging through interactive games and challenges.",
        fullDescription: "EduSpark reimagines education for the digital generation. Our platform uses game mechanics and adaptive learning algorithms to personalize each student's journey. Teachers report a 45% increase in student engagement and a 30% improvement in test scores.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
        video: null,
        industries: ["EdTech", "Gaming", "K-12"],
    },
    {
        id: 5,
        name: "FinFlow",
        team: "FinFlow Labs",
        description: "Personal finance management for millennials. Smart budgeting, investing, and savings tools all in one beautiful app.",
        fullDescription: "FinFlow makes personal finance simple and accessible. Our app uses AI to analyze spending patterns, suggest savings opportunities, and automate investments. With over 2 million users, we've helped our community save a collective $500 million.",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop",
        video: null,
        industries: ["FinTech", "Personal Finance", "Mobile"],
    },
]

const InvestmentPage = () => {
    const [selectedStartup, setSelectedStartup] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleViewStartup = (startup) => {
        setSelectedStartup(startup)
        setIsDialogOpen(true)
    }

    return (
        <div className="p-4 sm:p-6">
            {/* Page Header */}
            <div className="mb-6 space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">Browse Startups</h1>
                <p className="text-sm text-muted-foreground">Discover innovative startups and investment opportunities.</p>
            </div>

            <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="space-y-4 pr-4">
                    {startupsData.map((startup) => (
                        <Card key={startup.id} className="overflow-hidden border hover:shadow-lg transition-all duration-200 group">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                    {/* Image */}
                                    <div className="md:w-1/4 aspect-video md:aspect-[4/3] relative bg-muted overflow-hidden">
                                        <img
                                            src={startup.image}
                                            alt={startup.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="md:w-3/4 p-4 sm:p-5 flex flex-col">
                                        <div className="flex-1 space-y-3">
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
                                                    Startup
                                                </p>
                                                <h2 className="text-lg font-bold tracking-tight">{startup.name}</h2>
                                            </div>

                                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                                {startup.description}
                                            </p>

                                            <div className="flex flex-wrap gap-1.5">
                                                {startup.industries.map((industry, index) => (
                                                    <Badge key={index} variant="secondary" className="text-xs font-medium">
                                                        {industry}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-4">
                                            <Button
                                                size="sm"
                                                className="bg-uitm-teal hover:bg-uitm-teal-dark text-white transition-all duration-200 hover:shadow-md"
                                                onClick={() => handleViewStartup(startup)}
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>

            {/* Startup Details Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0">
                    <DialogClose className="absolute right-4 top-4 rounded-full bg-background/80 backdrop-blur-sm p-1.5 opacity-70 ring-offset-background transition-opacity hover:opacity-100 z-10 border">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </DialogClose>

                    {selectedStartup && (
                        <div className="space-y-0">
                            {/* Media Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {/* Image */}
                                <div className="aspect-video bg-muted overflow-hidden relative">
                                    <img
                                        src={selectedStartup.image}
                                        alt={selectedStartup.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Video Placeholder */}
                                <div className="aspect-video bg-muted flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                                            <Play className="h-8 w-8 text-white ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Startup Details */}
                            <div className="p-5 sm:p-6 space-y-4">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Team</p>
                                    <h2 className="text-xl font-bold tracking-tight">{selectedStartup.team}</h2>
                                </div>

                                <div className="bg-muted/50 rounded-lg p-4">
                                    <p className="font-semibold text-lg mb-2">{selectedStartup.name}</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedStartup.fullDescription}</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                                    <Button
                                        variant="outline"
                                        className="border-uitm-teal text-uitm-teal hover:bg-uitm-teal/10"
                                        onClick={() => setIsDialogOpen(false)}
                                    >
                                        Offer Mentorship
                                    </Button>
                                    <Button
                                        className="bg-uitm-teal hover:bg-uitm-teal-dark text-white"
                                        onClick={() => setIsDialogOpen(false)}
                                    >
                                        Propose Investment
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default InvestmentPage
