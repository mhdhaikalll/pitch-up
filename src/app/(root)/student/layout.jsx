import { SidebarMain } from "@/components/main-sidebar"
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { student } from "@/data/sidebarData";
import { ModeToggle } from "@/components/theme-toggle";

export const iframeHeight = "800px"


export default function LayoutStudent({ children }) {
  
  const data = student;

  return (
    <SidebarProvider>
      <SidebarMain data={data} />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
          <SidebarTrigger className="-ml-1 hover:bg-muted transition-colors rounded-md" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <span className="w-full flex justify-end">
            <ModeToggle /> 
          </span>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
