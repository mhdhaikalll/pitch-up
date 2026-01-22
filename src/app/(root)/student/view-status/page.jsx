
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { 
    Users, 
    FileText, 
    Clock,
    DollarSign,
    MessageSquare,
    Award,
    CheckCircle,
    X
} from "lucide-react"

// Dummy data for stats
const statusStats = [
    { label: "Mentorship", count: 5, icon: Users },
    { label: "Proposals", count: 2, icon: FileText },
    { label: "Pending", count: 4, icon: Clock },
]

// Dummy data for recent activities
const recentActivities = [
    {
        id: 1,
        type: "proposal",
        title: "New Proposals",
        description: "Bob Investor proposed RM 50,000 for 5% equity",
        avatar: "https://i.pravatar.cc/150?img=8",
        name: "Bob Investor",
        actionLabel: "view",
        details: {
            amount: "RM 50,000",
            equity: "5%",
            terms: "Investment will be released in two tranches: 60% upon signing, 40% upon reaching 1,000 users milestone.",
            date: "January 20, 2026"
        }
    },
    {
        id: 2,
        type: "message",
        title: "Mentor Message",
        description: "Alice replied to 'Market Research'.",
        avatar: "https://i.pravatar.cc/150?img=5",
        name: "Alice Chen",
        actionLabel: "reply",
        details: {
            message: "Great progress on the market research! I've reviewed your competitive analysis and have some suggestions. Let's schedule a call to discuss the positioning strategy.",
            topic: "Market Research",
            date: "January 19, 2026"
        }
    },
    {
        id: 3,
        type: "endorsement",
        title: "Endorsement",
        description: "You received a skill endorsement from Peer Reviewer.",
        avatar: "https://i.pravatar.cc/150?img=12",
        name: "Peer Reviewer",
        actionLabel: null,
        details: {
            skill: "Data Analytics",
            endorser: "Michael Torres",
            date: "January 18, 2026"
        }
    },
    {
        id: 4,
        type: "proposal",
        title: "New Proposals",
        description: "Sarah Capital offered RM 100,000 for 8% equity",
        avatar: "https://i.pravatar.cc/150?img=9",
        name: "Sarah Capital",
        actionLabel: "view",
        details: {
            amount: "RM 100,000",
            equity: "8%",
            terms: "Full investment upon signing with board observer seat.",
            date: "January 17, 2026"
        }
    },
    {
        id: 5,
        type: "message",
        title: "Mentor Message",
        description: "Dr. Lee sent feedback on your pitch deck.",
        avatar: "https://i.pravatar.cc/150?img=15",
        name: "Dr. Lee",
        actionLabel: "reply",
        details: {
            message: "Your pitch deck is coming along nicely. I suggest adding more details about your go-to-market strategy on slide 8.",
            topic: "Pitch Deck Review",
            date: "January 16, 2026"
        }
    },
]

export default function ViewStatusPage() {
    const [selectedActivity, setSelectedActivity] = useState(null)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [replyDialogOpen, setReplyDialogOpen] = useState(false)
    const [replyText, setReplyText] = useState("")

    const handleViewProposal = (activity) => {
        setSelectedActivity(activity)
        setViewDialogOpen(true)
    }

    const handleReplyMessage = (activity) => {
        setSelectedActivity(activity)
        setReplyDialogOpen(true)
    }

    const handleSendReply = () => {
        console.log("Sending reply to:", selectedActivity?.name, "Message:", replyText)
        setReplyText("")
        setReplyDialogOpen(false)
    }

    const getActivityIcon = (type) => {
        switch (type) {
            case "proposal":
                return <DollarSign className="h-5 w-5 text-green-500" />
            case "message":
                return <MessageSquare className="h-5 w-5 text-uitm-teal" />
            case "endorsement":
                return <Award className="h-5 w-5 text-yellow-500" />
            default:
                return null
        }
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <h1 className="text-xl font-semibold">Activity Status & Timeline</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {statusStats.map((stat) => (
                    <Card key={stat.label} className="bg-muted/50">
                        <CardContent className="p-6 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold">{stat.count}</span>
                            <span className="text-sm text-muted-foreground">{stat.label}</span>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <Card className="bg-muted/50">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {recentActivities.map((activity) => (
                        <div 
                            key={activity.id} 
                            className="flex items-center gap-4 p-4 rounded-lg bg-muted/70"
                        >
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={activity.avatar} alt={activity.name} />
                                <AvatarFallback>
                                    {activity.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                                <h4 className="font-medium">{activity.title}</h4>
                                <p className="text-sm text-muted-foreground">{activity.description}</p>
                            </div>

                            {activity.actionLabel && (
                                <Button 
                                    variant="secondary" 
                                    size="sm"
                                    onClick={() => {
                                        if (activity.actionLabel === "view") {
                                            handleViewProposal(activity)
                                        } else if (activity.actionLabel === "reply") {
                                            handleReplyMessage(activity)
                                        }
                                    }}
                                >
                                    {activity.actionLabel}
                                </Button>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* View Proposal Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={selectedActivity?.avatar} alt={selectedActivity?.name} />
                                <AvatarFallback>
                                    {selectedActivity?.name?.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <DialogTitle>{selectedActivity?.name}</DialogTitle>
                                <DialogDescription>Investment Proposal</DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Investment Amount</p>
                                <p className="font-semibold text-green-600">{selectedActivity?.details?.amount}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Equity Offered</p>
                                <p className="font-semibold">{selectedActivity?.details?.equity}</p>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Terms & Conditions</p>
                            <p className="text-sm">{selectedActivity?.details?.terms}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Proposal Date</p>
                            <p className="text-sm">{selectedActivity?.details?.date}</p>
                        </div>
                    </div>

                    <DialogFooter className="flex flex-row gap-2 sm:justify-end">
                        <Button 
                            variant="destructive" 
                            onClick={() => setViewDialogOpen(false)}
                        >
                            <X className="h-4 w-4 mr-2" />
                            Decline
                        </Button>
                        <Button 
                            className="bg-uitm-gold hover:bg-uitm-gold-dark text-black"
                            onClick={() => setViewDialogOpen(false)}
                        >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Accept
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reply Message Dialog */}
            <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={selectedActivity?.avatar} alt={selectedActivity?.name} />
                                <AvatarFallback>
                                    {selectedActivity?.name?.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <DialogTitle>Reply to {selectedActivity?.name}</DialogTitle>
                                <DialogDescription>
                                    Re: {selectedActivity?.details?.topic}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="bg-muted/50 p-3 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Original Message:</p>
                            <p className="text-sm">{selectedActivity?.details?.message}</p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">Your Reply:</p>
                            <Textarea
                                placeholder="Type your reply..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                rows={4}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={() => setReplyDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            className="bg-uitm-teal hover:bg-uitm-teal-dark"
                            onClick={handleSendReply}
                        >
                            Send Reply
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
