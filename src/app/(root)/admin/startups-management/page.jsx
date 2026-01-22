"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogClose,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination"
import { Search, Eye, Pencil, Trash2, X } from "lucide-react"

const startupsData = [
    { id: "ST001", name: "TechNova Solutions", email: "contact@technova.io", status: "Active", avatar: "https://i.pravatar.cc/150?img=10", description: "AI-powered analytics platform for small businesses", founder: "Sarah Johnson" },
    { id: "ST002", name: "GreenLeaf Energy", email: "info@greenleaf.com", status: "Pending", avatar: "https://i.pravatar.cc/150?img=11", description: "Sustainable energy solutions for urban areas", founder: "Michael Chen" },
    { id: "ST003", name: "HealthBridge", email: "hello@healthbridge.co", status: "Active", avatar: "https://i.pravatar.cc/150?img=12", description: "Telemedicine platform connecting rural patients with specialists", founder: "Emily Davis" },
    { id: "ST004", name: "EduSpark", email: "team@eduspark.io", status: "Active", avatar: "https://i.pravatar.cc/150?img=13", description: "Gamified learning platform for K-12 students", founder: "James Wilson" },
    { id: "ST005", name: "FinFlow", email: "support@finflow.app", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=14", description: "Personal finance management for millennials", founder: "Amanda Lee" },
    { id: "ST006", name: "AgriTech Pro", email: "contact@agritech.com", status: "Active", avatar: "https://i.pravatar.cc/150?img=15", description: "Smart farming solutions using IoT sensors", founder: "Robert Brown" },
    { id: "ST007", name: "CloudSecure", email: "info@cloudsecure.io", status: "Pending", avatar: "https://i.pravatar.cc/150?img=16", description: "Enterprise cybersecurity solutions", founder: "Lisa Wang" },
    { id: "ST008", name: "FoodieHub", email: "hello@foodiehub.co", status: "Active", avatar: "https://i.pravatar.cc/150?img=17", description: "Food delivery platform with zero-waste packaging", founder: "David Kim" },
    { id: "ST009", name: "TravelMate", email: "support@travelmate.app", status: "Active", avatar: "https://i.pravatar.cc/150?img=18", description: "AI travel planning and booking assistant", founder: "Jennifer Martinez" },
    { id: "ST010", name: "PropTech Hub", email: "info@proptechhub.com", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=19", description: "Real estate marketplace with virtual tours", founder: "Thomas Anderson" },
]

const ITEMS_PER_PAGE = 10

export default function StartupsManagementPage() {
    const [startups, setStartups] = useState(startupsData)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedItems, setSelectedItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedStartup, setSelectedStartup] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogAction, setDialogAction] = useState(null) // 'view', 'edit', 'delete'

    const filteredStartups = startups.filter(startup =>
        startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.id.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalPages = Math.ceil(filteredStartups.length / ITEMS_PER_PAGE)
    const paginatedStartups = filteredStartups.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(paginatedStartups.map(s => s.id))
        } else {
            setSelectedItems([])
        }
    }

    const handleSelectItem = (id, checked) => {
        if (checked) {
            setSelectedItems(prev => [...prev, id])
        } else {
            setSelectedItems(prev => prev.filter(item => item !== id))
        }
    }

    const handleAction = (startup, action) => {
        setSelectedStartup(startup)
        setDialogAction(action)
        setIsDialogOpen(true)
    }

    const handleConfirmAction = () => {
        if (dialogAction === 'delete' && selectedStartup) {
            setStartups(prev => prev.filter(s => s.id !== selectedStartup.id))
        }
        setIsDialogOpen(false)
        setSelectedStartup(null)
        setDialogAction(null)
    }

    const getStatusBadge = (status) => {
        const variants = {
            Active: "bg-uitm-gold/10 text-uitm-gold-dark hover:bg-uitm-gold/20",
            Pending: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
            Inactive: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
        }
        return <Badge className={variants[status] || variants.Inactive}>{status}</Badge>
    }

    const getDialogTitle = () => {
        switch (dialogAction) {
            case 'view': return 'Startup Details'
            case 'edit': return 'Edit Startup'
            case 'delete': return 'Delete Startup'
            default: return ''
        }
    }

    return (
        <div className="p-4 space-y-4">
            <Card className="bg-muted/50">
                <CardContent className="p-4">
                    {/* Search Bar */}
                    <div className="flex justify-end mb-4">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search"
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={selectedItems.length === paginatedStartups.length && paginatedStartups.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead className="w-24">ID</TableHead>
                                    <TableHead>NAME</TableHead>
                                    <TableHead>EMAIL</TableHead>
                                    <TableHead className="w-28">STATUS</TableHead>
                                    <TableHead className="w-32">ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedStartups.map((startup) => (
                                    <TableRow key={startup.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedItems.includes(startup.id)}
                                                onCheckedChange={(checked) => handleSelectItem(startup.id, checked)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">{startup.id}</TableCell>
                                        <TableCell className="font-medium">{startup.name}</TableCell>
                                        <TableCell className="text-muted-foreground">{startup.email}</TableCell>
                                        <TableCell>{getStatusBadge(startup.status)}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8"
                                                    onClick={() => handleAction(startup, 'view')}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8"
                                                    onClick={() => handleAction(startup, 'edit')}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                                    onClick={() => handleAction(startup, 'delete')}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-end mt-4">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            if (currentPage > 1) setCurrentPage(currentPage - 1)
                                        }}
                                    />
                                </PaginationItem>
                                {[...Array(Math.min(5, totalPages))].map((_, i) => (
                                    <PaginationItem key={i + 1}>
                                        <PaginationLink
                                            href="#"
                                            isActive={currentPage === i + 1}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setCurrentPage(i + 1)
                                            }}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                {totalPages > 5 && (
                                    <>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setCurrentPage(totalPages)
                                                }}
                                            >
                                                {totalPages}
                                            </PaginationLink>
                                        </PaginationItem>
                                    </>
                                )}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                                        }}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
            </Card>

            {/* Action Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                    </DialogClose>

                    {selectedStartup && (
                        <div className="flex flex-col items-center space-y-4 pt-4">
                            {/* Avatar */}
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={selectedStartup.avatar} alt={selectedStartup.name} />
                                <AvatarFallback className="text-2xl">
                                    {selectedStartup.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>

                            {/* Details */}
                            <div className="w-full space-y-3">
                                <div className="bg-muted rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Name</p>
                                    <p className="font-medium">{selectedStartup.name}</p>
                                </div>

                                <div className="bg-muted rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Founder</p>
                                    <p className="font-medium">{selectedStartup.founder}</p>
                                </div>

                                <div className="bg-muted rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Description</p>
                                    <p className="text-sm">{selectedStartup.description}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 w-full pt-2">
                                <Button
                                    className="flex-1 bg-uitm-teal hover:bg-uitm-teal-dark text-white"
                                    onClick={handleConfirmAction}
                                >
                                    {dialogAction === 'delete' ? 'Yes' : 'Yes'}
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() => setIsDialogOpen(false)}
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
