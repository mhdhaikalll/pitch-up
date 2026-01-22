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
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, Send, ImageIcon } from "lucide-react"

const startupsData = [
    { id: 1, name: "TechNova Solutions" },
    { id: 2, name: "GreenLeaf Energy" },
    { id: 3, name: "HealthBridge" },
    { id: 4, name: "EduSpark" },
    { id: 5, name: "FinFlow" },
]

const pledgeTerms = `INVESTMENT PLEDGE AGREEMENT

This Investment Pledge Agreement ("Agreement") is entered into between the Investor and the Startup through the Pitch-Up platform.

1. INVESTMENT COMMITMENT
The Investor agrees to provide the stated investment amount to the selected Startup, subject to the terms and conditions outlined herein.

2. DUE DILIGENCE
The Investor acknowledges that they have conducted their own due diligence regarding the Startup and its business model, financial projections, and team capabilities.

3. RISK ACKNOWLEDGMENT
The Investor understands that startup investments carry inherent risks, including but not limited to the potential loss of the entire investment amount.

4. CONFIDENTIALITY
Both parties agree to maintain confidentiality regarding proprietary information shared during the investment process.

5. DISPUTE RESOLUTION
Any disputes arising from this Agreement shall be resolved through arbitration in accordance with the platform's dispute resolution procedures.

6. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with applicable laws and regulations.

By signing below, the Investor confirms their understanding and acceptance of these terms.`

const InvestmentPage = () => {
    const [formData, setFormData] = useState({
        startupName: "",
        amountOffered: "",
        termsAndAgreement: "",
        agreeToTerms: false,
    })
    const [isPledgeDialogOpen, setIsPledgeDialogOpen] = useState(false)
    const [hasReadTerms, setHasReadTerms] = useState(false)
    const [signatureUploaded, setSignatureUploaded] = useState(false)

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleDraft = () => {
        console.log("Saving as draft:", formData)
        // Save draft logic here
        alert("Draft saved successfully!")
    }

    const handleSubmit = () => {
        if (!formData.agreeToTerms) {
            alert("Please agree to the Terms & Conditions")
            return
        }
        setIsPledgeDialogOpen(true)
    }

    const handlePledgeSubmit = () => {
        if (!hasReadTerms) {
            alert("Please confirm that you have read the regulations and terms")
            return
        }
        console.log("Submitting investment proposal:", formData)
        setIsPledgeDialogOpen(false)
        alert("Investment proposal submitted successfully!")
        // Reset form
        setFormData({
            startupName: "",
            amountOffered: "",
            termsAndAgreement: "",
            agreeToTerms: false,
        })
        setHasReadTerms(false)
        setSignatureUploaded(false)
    }

    const handleSignatureUpload = () => {
        // Simulate signature upload
        setSignatureUploaded(true)
    }

    return (
        <div className="p-6 flex justify-center items-start min-h-[calc(100vh-120px)]">
            <Card className="w-full max-w-4xl bg-muted/50">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold uppercase tracking-wide">
                        Propose Investment
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

                    {/* Amount Offered */}
                    <div className="space-y-2">
                        <Label htmlFor="amountOffered" className="text-sm">
                            Amount Offered
                        </Label>
                        <Input
                            id="amountOffered"
                            type="text"
                            placeholder="e.g., $50,000"
                            value={formData.amountOffered}
                            onChange={(e) => handleInputChange("amountOffered", e.target.value)}
                        />
                    </div>

                    {/* Terms and Agreement */}
                    <div className="space-y-2">
                        <Label htmlFor="termsAndAgreement" className="text-sm">
                            Terms and Agreement
                        </Label>
                        <Textarea
                            id="termsAndAgreement"
                            placeholder="Enter your proposed terms, equity stake, milestones, and any conditions..."
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
                            onClick={handleSubmit}
                        >
                            <Send className="h-4 w-4 mr-2" />
                            Submit
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Pledge System Dialog */}
            <Dialog open={isPledgeDialogOpen} onOpenChange={setIsPledgeDialogOpen}>
                <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold">Pledge System</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Terms Content */}
                        <div className="bg-muted rounded-lg p-4 max-h-[200px] overflow-y-auto">
                            <pre className="text-sm whitespace-pre-wrap font-sans text-muted-foreground">
                                {pledgeTerms}
                            </pre>
                        </div>

                        {/* Read Terms Checkbox */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="hasReadTerms"
                                checked={hasReadTerms}
                                onCheckedChange={setHasReadTerms}
                            />
                            <Label htmlFor="hasReadTerms" className="text-sm font-normal">
                                I have read all the regulations and terms of the pledge system
                            </Label>
                        </div>

                        {/* E-Signature Upload Area */}
                        <div
                            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                                signatureUploaded 
                                    ? 'border-green-500 bg-green-50' 
                                    : 'border-muted-foreground/30 hover:border-muted-foreground/50'
                            }`}
                            onClick={handleSignatureUpload}
                        >
                            <ImageIcon className={`h-12 w-12 mb-2 ${signatureUploaded ? 'text-green-500' : 'text-muted-foreground'}`} />
                            <span className={`text-sm ${signatureUploaded ? 'text-green-600' : 'text-muted-foreground'}`}>
                                {signatureUploaded ? 'Signature Uploaded' : 'Insert E-Signature'}
                            </span>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-2">
                            <Button
                                className="bg-uitm-teal hover:bg-uitm-teal-dark text-white px-8"
                                onClick={handlePledgeSubmit}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default InvestmentPage
