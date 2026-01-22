"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { 
    FileText, 
    Video, 
    Upload, 
    Plus, 
    CheckCircle,
    X
} from "lucide-react"

export default function CreateProfilePage() {
    const [pitchTitle, setPitchTitle] = useState("")
    const [pitchDescription, setPitchDescription] = useState("")
    const [pitchDeck, setPitchDeck] = useState(null)
    const [pitchVideo, setPitchVideo] = useState(null)
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [successDialogOpen, setSuccessDialogOpen] = useState(false)
    
    const pitchDeckRef = useRef(null)
    const pitchVideoRef = useRef(null)

    const handlePitchDeckUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setPitchDeck(file)
        }
    }

    const handlePitchVideoUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setPitchVideo(file)
        }
    }

    const handleSaveDraft = () => {
        console.log("Saving draft:", { pitchTitle, pitchDescription, pitchDeck, pitchVideo })
        // In a real app, this would save to the backend
    }

    const handleSubmit = () => {
        setConfirmDialogOpen(true)
    }

    const handleConfirmSubmit = () => {
        setConfirmDialogOpen(false)
        // In a real app, this would submit to the backend
        console.log("Submitting:", { pitchTitle, pitchDescription, pitchDeck, pitchVideo })
        setSuccessDialogOpen(true)
    }

    const handleSuccessClose = () => {
        setSuccessDialogOpen(false)
        // In a real app, this might redirect to another page
    }

    return (
        <div className="p-6">
            <Card className="bg-muted/50">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Upload Pitch Material</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Side - Upload Areas */}
                        <div className="flex flex-col gap-4 lg:w-1/2">
                            {/* Upload Pitch Deck */}
                            <div 
                                className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
                                onClick={() => pitchDeckRef.current?.click()}
                            >
                                <input
                                    ref={pitchDeckRef}
                                    type="file"
                                    accept=".pdf,.ppt,.pptx"
                                    className="hidden"
                                    onChange={handlePitchDeckUpload}
                                />
                                {pitchDeck ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <FileText className="h-12 w-12 text-green-500" />
                                        <p className="text-sm font-medium text-center">{pitchDeck.name}</p>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="text-muted-foreground"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setPitchDeck(null)
                                            }}
                                        >
                                            <X className="h-4 w-4 mr-1" />
                                            Remove
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <FileText className="h-12 w-12 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Upload Pitch Deck</p>
                                    </div>
                                )}
                            </div>

                            {/* Upload Pitch Video */}
                            <div 
                                className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
                                onClick={() => pitchVideoRef.current?.click()}
                            >
                                <input
                                    ref={pitchVideoRef}
                                    type="file"
                                    accept="video/*"
                                    className="hidden"
                                    onChange={handlePitchVideoUpload}
                                />
                                {pitchVideo ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <Video className="h-12 w-12 text-green-500" />
                                        <p className="text-sm font-medium text-center">{pitchVideo.name}</p>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="text-muted-foreground"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setPitchVideo(null)
                                            }}
                                        >
                                            <X className="h-4 w-4 mr-1" />
                                            Remove
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload className="h-12 w-12 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Upload Pitch Video</p>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground text-right">*maximum file only 5GB</p>
                        </div>

                        {/* Right Side - Form Fields */}
                        <div className="flex flex-col gap-4 lg:w-1/2">
                            <div className="space-y-2">
                                <Label htmlFor="pitchTitle">Pitch Title</Label>
                                <Input
                                    id="pitchTitle"
                                    placeholder="Enter your pitch title"
                                    value={pitchTitle}
                                    onChange={(e) => setPitchTitle(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2 flex-1">
                                <Label htmlFor="pitchDescription">Pitch Description</Label>
                                <Textarea
                                    id="pitchDescription"
                                    placeholder="Describe your pitch..."
                                    className="min-h-[200px] resize-none"
                                    value={pitchDescription}
                                    onChange={(e) => setPitchDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t">
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id="terms" 
                                checked={agreeTerms}
                                onCheckedChange={(checked) => setAgreeTerms(checked)}
                            />
                            <Label htmlFor="terms" className="text-sm cursor-pointer">
                                I agree to the Terms & Condition
                            </Label>
                        </div>

                        <div className="flex gap-3">
                            <Button 
                                variant="default" 
                                className="bg-uitm-teal hover:bg-uitm-teal-dark"
                                onClick={handleSaveDraft}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Save Draft
                            </Button>
                            <Button 
                                className="bg-uitm-gold hover:bg-uitm-gold-dark text-black"
                                onClick={handleSubmit}
                                disabled={!agreeTerms}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Confirmation Dialog */}
            <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-xl text-center">
                            Are you sure you want to submit?
                        </DialogTitle>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row justify-center gap-4 sm:justify-center">
                        <Button 
                            variant="destructive" 
                            className="w-24"
                            onClick={() => setConfirmDialogOpen(false)}
                        >
                            No
                        </Button>
                        <Button 
                            className="w-24 bg-uitm-gold hover:bg-uitm-gold-dark text-black"
                            onClick={handleConfirmSubmit}
                        >
                            Yes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Success Dialog */}
            <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
                <DialogContent className="max-w-md">
                    <div className="flex flex-col items-center justify-center py-8 gap-4">
                        <div className="h-16 w-16 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                            <CheckCircle className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-xl font-semibold">Submission Success!</h2>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
