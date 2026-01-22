export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-uitm-teal/5 via-background to-uitm-navy/5 relative">
            {/* Subtle decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-uitm-teal/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-uitm-navy/10 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}
