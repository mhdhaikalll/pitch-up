"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Video, Mic } from "lucide-react"

const contactsData = [
    {
        id: 1,
        name: "Michael Chen",
        role: "Investor",
        company: "Tech Ventures Capital",
        avatar: "https://i.pravatar.cc/150?img=11",
        lastMessage: "Looking forward to our meeting!",
        lastMessageTime: "2:30 PM",
        unread: 2,
    },
    {
        id: 2,
        name: "James Wilson",
        role: "Mentor",
        company: "Wilson Capital Partners",
        avatar: "https://i.pravatar.cc/150?img=12",
        lastMessage: "Great progress on the pitch deck",
        lastMessageTime: "Yesterday",
        unread: 0,
    },
    {
        id: 3,
        name: "Robert Brown",
        role: "Investor",
        company: "Brown Investments LLC",
        avatar: "https://i.pravatar.cc/150?img=13",
        lastMessage: "Can you send the financial projections?",
        lastMessageTime: "Yesterday",
        unread: 1,
    },
    {
        id: 4,
        name: "Lisa Wang",
        role: "Mentor",
        company: "Harvard Business School",
        avatar: "https://i.pravatar.cc/150?img=14",
        lastMessage: "Let me know if you need more guidance",
        lastMessageTime: "Mon",
        unread: 0,
    },
    {
        id: 5,
        name: "David Kim",
        role: "Investor",
        company: "Kim Ventures",
        avatar: "https://i.pravatar.cc/150?img=15",
        lastMessage: "Interesting concept, let's discuss further",
        lastMessageTime: "Sun",
        unread: 0,
    },
]

const conversationsData = {
    1: [
        { id: 1, sender: "Michael Chen", message: "Hi! I reviewed your startup pitch and I'm very interested in TechNova Solutions.", time: "10:00 AM", isMe: false },
        { id: 2, sender: "Me", message: "Thank you so much, Mr. Chen! I'm excited to discuss this opportunity.", time: "10:05 AM", isMe: true },
        { id: 3, sender: "Michael Chen", message: "Can you tell me more about your revenue model?", time: "10:10 AM", isMe: false },
        { id: 4, sender: "Me", message: "Of course! We use a SaaS subscription model with three tiers...", time: "10:15 AM", isMe: true },
        { id: 5, sender: "Michael Chen", message: "Looking forward to our meeting!", time: "2:30 PM", isMe: false },
    ],
    2: [
        { id: 1, sender: "James Wilson", message: "Hello! I've accepted your mentorship request.", time: "9:00 AM", isMe: false },
        { id: 2, sender: "Me", message: "Thank you so much for taking the time to mentor me!", time: "9:30 AM", isMe: true },
        { id: 3, sender: "James Wilson", message: "I've reviewed your pitch deck. Let's schedule a call to discuss improvements.", time: "10:00 AM", isMe: false },
        { id: 4, sender: "Me", message: "That would be great! I'm available tomorrow afternoon.", time: "10:30 AM", isMe: true },
        { id: 5, sender: "James Wilson", message: "Great progress on the pitch deck", time: "3:00 PM", isMe: false },
    ],
    3: [
        { id: 1, sender: "Robert Brown", message: "Your sustainable energy concept caught my attention.", time: "11:00 AM", isMe: false },
        { id: 2, sender: "Me", message: "Thank you! We're passionate about making clean energy accessible.", time: "11:15 AM", isMe: true },
        { id: 3, sender: "Robert Brown", message: "Can you send the financial projections?", time: "2:00 PM", isMe: false },
    ],
    4: [
        { id: 1, sender: "Lisa Wang", message: "Hi! I'm excited to help guide your EdTech startup.", time: "1:00 PM", isMe: false },
        { id: 2, sender: "Me", message: "Thank you, Professor Wang! I have so many questions.", time: "1:30 PM", isMe: true },
        { id: 3, sender: "Lisa Wang", message: "Let's start with your market validation strategy.", time: "2:00 PM", isMe: false },
        { id: 4, sender: "Me", message: "We've conducted surveys with 500 teachers and parents.", time: "2:30 PM", isMe: true },
        { id: 5, sender: "Lisa Wang", message: "Let me know if you need more guidance", time: "4:00 PM", isMe: false },
    ],
    5: [
        { id: 1, sender: "David Kim", message: "I saw your hardware prototype demo. Impressive work!", time: "10:00 AM", isMe: false },
        { id: 2, sender: "Me", message: "Thank you! We've been working on it for 18 months.", time: "10:15 AM", isMe: true },
        { id: 3, sender: "David Kim", message: "Interesting concept, let's discuss further", time: "11:00 AM", isMe: false },
    ],
}

const StudentMessagesPage = () => {
    const [selectedContact, setSelectedContact] = useState(contactsData[0])
    const [messages, setMessages] = useState(conversationsData)
    const [newMessage, setNewMessage] = useState("")

    const handleSelectContact = (contact) => {
        setSelectedContact(contact)
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
            [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg]
        }))
        setNewMessage("")
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const getRoleBadgeColor = (role) => {
        return role === "Investor" 
            ? "bg-uitm-gold/10 text-uitm-gold-dark hover:bg-uitm-gold/20" 
            : "bg-uitm-teal/10 text-uitm-teal hover:bg-uitm-purple/20"
    }

    return (
        <div className="p-4 h-[calc(100vh-120px)]">
            <Card className="h-full bg-muted/50 overflow-hidden">
                <div className="flex h-full">
                    {/* Left Panel - Contacts List */}
                    <div className="w-1/3 border-r flex flex-col">
                        <div className="p-4 border-b">
                            <h2 className="font-semibold">My Connections</h2>
                        </div>
                        <ScrollArea className="flex-1">
                            {contactsData.map((contact) => (
                                <div
                                    key={contact.id}
                                    className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/80 transition-colors ${
                                        selectedContact?.id === contact.id ? 'bg-muted' : ''
                                    }`}
                                    onClick={() => handleSelectContact(contact)}
                                >
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={contact.avatar} alt={contact.name} />
                                        <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="font-medium text-sm truncate">{contact.name}</p>
                                            {contact.unread > 0 && (
                                                <span className="bg-uitm-teal text-white text-xs rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
                                                    {contact.unread}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge className={`text-xs ${getRoleBadgeColor(contact.role)}`}>
                                                {contact.role}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </div>

                    {/* Right Panel - Chat Area */}
                    <div className="flex-1 flex flex-col">
                        {/* Chat Header */}
                        <div className="p-4 border-b flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold">Chat with {selectedContact?.name}</h2>
                                <p className="text-xs text-muted-foreground">{selectedContact?.company}</p>
                            </div>
                            <Button variant="ghost" size="icon">
                                <Video className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {messages[selectedContact?.id]?.map((msg) => (
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

export default StudentMessagesPage
