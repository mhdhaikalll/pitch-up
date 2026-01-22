"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, Send } from "lucide-react"

const startupsData = [
    { id: 1, name: "TechNova Solutions" },
    { id: 2, name: "GreenLeaf Energy" },
    { id: 3, name: "HealthBridge" },
    { id: 4, name: "EduSpark" },
    { id: 5, name: "FinFlow" },
]

const durationOptions = [
    { id: 1, value: "1 Month" },
    { id: 2, value: "3 Months" },
    { id: 3, value: "6 Months" },
    { id: 4, value: "12 Months" },
    { id: 5, value: "Ongoing" },
]

const MentorshipPage = () => {
    const [formData, setFormData] = useState({
        startupName: "",
        duration: "",
        termsAndAgreement: "",
        agreeToTerms: false,
    })
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleDraft = () => {
        console.log("Saving as draft:", formData)
        alert("Draft saved successfully!")
    }

    const handleSend = () => {
        if (!formData.agreeToTerms) {
            alert("Please agree to the Terms & Conditions")
            return
        }
        setIsConfirmDialogOpen(true)
    }

    const handleConfirmNo = () => {
        setIsConfirmDialogOpen(false)
    }

    const handleConfirmYes = () => {
        console.log("Sending mentorship offer:", formData)
        setIsConfirmDialogOpen(false)
        alert("Mentorship offer sent successfully!")
        // Reset form
        setFormData({
            startupName: "",
            duration: "",
            termsAndAgreement: "",
            agreeToTerms: false,
        })
    }

    return (
        <div className="p-6 flex justify-center items-start min-h-[calc(100vh-120px)]">
            <Card className="w-full max-w-4xl bg-muted/50">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold uppercase tracking-wide">
                        Offer Mentorship
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8 pb-8">
                    {/* Startup Name */}
                    <div className="space-y-2">
                        <Label htmlFor="startupName" className="text-sm">
                            Startup Name
                        </Label>
                        <Select
                            value={formData.startupName}
                            onValueChange={(value) => handleInputChange("startupName", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a startup" />
                            </SelectTrigger>
                            <SelectContent>
                                {startupsData.map((startup) => (
                                    <SelectItem key={startup.id} value={startup.name}>
                                        {startup.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                        <Label htmlFor="duration" className="text-sm">
                            Duration
                        </Label>
                        <Select
                            value={formData.duration}
                            onValueChange={(value) => handleInputChange("duration", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                                {durationOptions.map((option) => (
                                    <SelectItem key={option.id} value={option.value}>
                                        {option.value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Terms and Agreement */}
                    <div className="space-y-2">
                        <Label htmlFor="termsAndAgreement" className="text-sm">
                            Terms and Agreement
                        </Label>
                        <Textarea
                            id="termsAndAgreement"
                            placeholder="Enter your mentorship terms, areas of expertise, availability, expectations, and any conditions..."
                            className="min-h-[180px]"
                            value={formData.termsAndAgreement}
                            onChange={(e) => handleInputChange("termsAndAgreement", e.target.value)}
                        />
                    </div>

                    {/* Agree to Terms Checkbox */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                        />
                        <Label htmlFor="agreeToTerms" className="text-sm font-normal">
                            By submit the proposal, you`re agreeing to our Terms & Condition
                        </Label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-6">
                        <Button
                            className="bg-uitm-teal hover:bg-uitm-teal-dark text-white"
                            onClick={handleDraft}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Draft
                        </Button>
                        <Button
                            className="bg-uitm-gold hover:bg-uitm-gold-dark text-black text-white"
                            onClick={handleSend}
                        >
                            <Send className="h-4 w-4 mr-2" />
                            Send
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Confirmation Dialog */}
            <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <div className="flex flex-col items-center space-y-6 py-4">
                        <h2 className="text-xl font-semibold text-center">
                            Are you sure to send this mentorship offer?
                        </h2>

                        <div className="flex gap-4 w-full justify-center">
                            <Button
                                variant="destructive"
                                className="px-8"
                                onClick={handleConfirmNo}
                            >
                                No
                            </Button>
                            <Button
                                className="bg-uitm-gold hover:bg-uitm-gold-dark text-black text-white px-8"
                                onClick={handleConfirmYes}
                            >
                                Yes
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default MentorshipPage
