"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Send, Video, Mic } from "lucide-react"

const menteesData = [
    {
        id: 1,
        name: "Alice",
        role: "Mentee 1",
        avatar: "https://i.pravatar.cc/150?img=1",
        startup: "TechNova Solutions",
        lastMessage: "Thank you for the advice!",
        lastMessageTime: "2:30 PM",
        unread: 2,
    },
    {
        id: 2,
        name: "Bob",
        role: "Mentee 2",
        avatar: "https://i.pravatar.cc/150?img=2",
        startup: "GreenLeaf Energy",
        lastMessage: "When can we schedule our next session?",
        lastMessageTime: "Yesterday",
        unread: 0,
    },
    {
        id: 3,
        name: "Carol",
        role: "Mentee 3",
        avatar: "https://i.pravatar.cc/150?img=3",
        startup: "HealthBridge",
        lastMessage: "I've updated the pitch deck",
        lastMessageTime: "Yesterday",
        unread: 1,
    },
    {
        id: 4,
        name: "David",
        role: "Mentee 4",
        avatar: "https://i.pravatar.cc/150?img=4",
        startup: "EduSpark",
        lastMessage: "Got it, will work on that",
        lastMessageTime: "Mon",
        unread: 0,
    },
]

const conversationsData = {
    1: [
        { id: 1, sender: "Alice", message: "Hi! Thank you for accepting my mentorship request.", time: "10:00 AM", isMe: false },
        { id: 2, sender: "Me", message: "You're welcome, Alice! I'm excited to work with you on TechNova Solutions.", time: "10:05 AM", isMe: true },
        { id: 3, sender: "Alice", message: "I have some questions about our go-to-market strategy.", time: "10:10 AM", isMe: false },
        { id: 4, sender: "Me", message: "Sure, let's discuss. What specific aspects are you struggling with?", time: "10:15 AM", isMe: true },
        { id: 5, sender: "Alice", message: "Thank you for the advice!", time: "2:30 PM", isMe: false },
    ],
    2: [
        { id: 1, sender: "Bob", message: "Hello! I wanted to discuss our sustainability metrics.", time: "9:00 AM", isMe: false },
        { id: 2, sender: "Me", message: "Hi Bob! Sure, what would you like to know?", time: "9:30 AM", isMe: true },
        { id: 3, sender: "Bob", message: "When can we schedule our next session?", time: "11:00 AM", isMe: false },
    ],
    3: [
        { id: 1, sender: "Carol", message: "Hi! I've been working on the investor presentation.", time: "3:00 PM", isMe: false },
        { id: 2, sender: "Me", message: "Great! Send it over when you're ready.", time: "3:15 PM", isMe: true },
        { id: 3, sender: "Carol", message: "I've updated the pitch deck", time: "5:00 PM", isMe: false },
    ],
    4: [
        { id: 1, sender: "David", message: "Thanks for the feedback on our prototype!", time: "2:00 PM", isMe: false },
        { id: 2, sender: "Me", message: "You're making good progress. Focus on the user onboarding flow next.", time: "2:30 PM", isMe: true },
        { id: 3, sender: "David", message: "Got it, will work on that", time: "3:00 PM", isMe: false },
    ],
}

const MessagesPage = () => {
    const [selectedMentee, setSelectedMentee] = useState(menteesData[0])
    const [messages, setMessages] = useState(conversationsData)
    const [newMessage, setNewMessage] = useState("")

    const handleSelectMentee = (mentee) => {
        setSelectedMentee(mentee)
    }

    const handleSendMessage = () => {
        if (!newMessage.trim()) return

        const newMsg = {
            id: Date.now(),
            sender: "Me",
            message: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
        }

        setMessages(prev => ({
            ...prev,
            [selectedMentee.id]: [...(prev[selectedMentee.id] || []), newMsg]
        }))
        setNewMessage("")
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="p-4 h-[calc(100vh-120px)]">
            <Card className="h-full bg-muted/50 overflow-hidden">
                <div className="flex h-full">
                    {/* Left Panel - Mentee List */}
                    <div className="w-1/3 border-r flex flex-col">
                        <div className="p-4 border-b">
                            <h2 className="font-semibold">My Mentee</h2>
                        </div>
                        <ScrollArea className="flex-1">
                            {menteesData.map((mentee) => (
                                <div
                                    key={mentee.id}
                                    className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/80 transition-colors ${
                                        selectedMentee?.id === mentee.id ? 'bg-muted' : ''
                                    }`}
                                    onClick={() => handleSelectMentee(mentee)}
                                >
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={mentee.avatar} alt={mentee.name} />
                                        <AvatarFallback>{mentee.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium text-sm">{mentee.name}</p>
                                            {mentee.unread > 0 && (
                                                <span className="bg-uitm-teal text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                    {mentee.unread}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground">{mentee.role}</p>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </div>

                    {/* Right Panel - Chat Area */}
                    <div className="flex-1 flex flex-col">
                        {/* Chat Header */}
                        <div className="p-4 border-b flex items-center justify-between">
                            <h2 className="font-semibold">Chat with {selectedMentee?.name}</h2>
                            <Button variant="ghost" size="icon">
                                <Video className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {messages[selectedMentee?.id]?.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[70%] rounded-lg p-3 ${
                                                msg.isMe
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted'
                                            }`}
                                        >
                                            <p className="text-sm">{msg.message}</p>
                                            <p className={`text-xs mt-1 ${
                                                msg.isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                            }`}>
                                                {msg.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        {/* Message Input */}
                        <div className="p-4 border-t">
                            <div className="flex gap-2">
                                <div className="flex-1 relative">
                                    <Input
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="pr-10"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                                    >
                                        <Mic className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </div>
                                <Button
                                    className="bg-uitm-teal hover:bg-uitm-teal-dark text-white"
                                    onClick={handleSendMessage}
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default MessagesPage
