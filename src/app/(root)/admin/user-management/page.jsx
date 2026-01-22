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

const usersData = [
    { id: "USR001", name: "Sarah Johnson", email: "sarah.j@university.edu", status: "Active", type: "Student", avatar: "https://i.pravatar.cc/150?img=1", company: "Stanford University", bio: "Final year Computer Science student with a passion for AI and machine learning." },
    { id: "USR002", name: "Michael Chen", email: "m.chen@techventures.com", status: "Active", type: "Investor", avatar: "https://i.pravatar.cc/150?img=2", company: "Tech Ventures Capital", bio: "Angel investor focused on early-stage tech startups with 10+ years experience." },
    { id: "USR003", name: "Emily Davis", email: "emily.d@startup.io", status: "Pending", type: "Student", avatar: "https://i.pravatar.cc/150?img=3", company: "MIT", bio: "Biomedical Engineering student working on affordable diagnostic tools." },
    { id: "USR004", name: "James Wilson", email: "jwilson@capital.vc", status: "Active", type: "Investor", avatar: "https://i.pravatar.cc/150?img=4", company: "Wilson Capital Partners", bio: "Managing Partner specializing in Series A and B rounds for fintech companies." },
    { id: "USR005", name: "Amanda Lee", email: "amanda.lee@edu.com", status: "Inactive", type: "Student", avatar: "https://i.pravatar.cc/150?img=5", company: "Berkeley University", bio: "MBA candidate focused on social entrepreneurship and impact investing." },
    { id: "USR006", name: "Robert Brown", email: "r.brown@invest.co", status: "Active", type: "Investor", avatar: "https://i.pravatar.cc/150?img=6", company: "Brown Investments LLC", bio: "Former tech executive turned angel investor interested in consumer tech." },
    { id: "USR007", name: "Lisa Wang", email: "lisa.w@college.edu", status: "Active", type: "Student", avatar: "https://i.pravatar.cc/150?img=7", company: "Harvard Business School", bio: "EdTech enthusiast working on AI-powered tutoring platforms." },
    { id: "USR008", name: "David Kim", email: "d.kim@ventures.com", status: "Pending", type: "Investor", avatar: "https://i.pravatar.cc/150?img=8", company: "Kim Ventures", bio: "Engineer-turned-investor with expertise in semiconductors and IoT." },
    { id: "USR009", name: "Jennifer Martinez", email: "j.martinez@uni.edu", status: "Active", type: "Student", avatar: "https://i.pravatar.cc/150?img=9", company: "UCLA", bio: "Computer Science major specializing in mobile app development." },
    { id: "USR010", name: "Thomas Anderson", email: "t.anderson@fund.co", status: "Active", type: "Investor", avatar: "https://i.pravatar.cc/150?img=20", company: "Anderson Fund", bio: "Venture capitalist with focus on real estate technology startups." },
]

const ITEMS_PER_PAGE = 10

export default function UserManagementPage() {
    const [users, setUsers] = useState(usersData)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedItems, setSelectedItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedUser, setSelectedUser] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogAction, setDialogAction] = useState(null) // 'view', 'edit', 'delete'

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(paginatedUsers.map(u => u.id))
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

    const handleAction = (user, action) => {
        setSelectedUser(user)
        setDialogAction(action)
        setIsDialogOpen(true)
    }

    const handleConfirmAction = () => {
        if (dialogAction === 'delete' && selectedUser) {
            setUsers(prev => prev.filter(u => u.id !== selectedUser.id))
        }
        setIsDialogOpen(false)
        setSelectedUser(null)
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
                                            checked={selectedItems.length === paginatedUsers.length && paginatedUsers.length > 0}
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
                                {paginatedUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedItems.includes(user.id)}
                                                onCheckedChange={(checked) => handleSelectItem(user.id, checked)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">{user.id}</TableCell>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8"
                                                    onClick={() => handleAction(user, 'view')}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8"
                                                    onClick={() => handleAction(user, 'edit')}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                                    onClick={() => handleAction(user, 'delete')}
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

                    {selectedUser && (
                        <div className="flex flex-col items-center space-y-4 pt-4">
                            {/* Avatar */}
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                                <AvatarFallback className="text-2xl">
                                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>

                            {/* Details */}
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
                                    <p className="text-xs text-muted-foreground mb-1">Bio</p>
                                    <p className="text-sm">{selectedUser.bio}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 w-full pt-2">
                                <Button
                                    className="flex-1 bg-uitm-teal hover:bg-uitm-teal-dark text-white"
                                    onClick={handleConfirmAction}
                                >
                                    Yes
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
