"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronDown, LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function SidebarMain({ data, ...props }) {
  const router = useRouter()

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user")
    // Redirect to login page
    router.push("/login")
  }

  return (
    <Sidebar
      className="h-svh !bg-[#1a252f] [&_*]:!border-white/10"
      style={{
        '--sidebar': '#1a252f',
        '--sidebar-foreground': '#ffffff',
        '--sidebar-accent': 'rgba(255, 255, 255, 0.1)',
        '--sidebar-accent-foreground': '#00BFA5',
        '--sidebar-border': 'rgba(255, 255, 255, 0.1)',
      }}
      {...props}
    >
      {/* User Profile Header */}
      <SidebarHeader className="p-5 pb-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Welcome back</span>
          <Avatar className="h-18 w-18 rounded-full border-2 border-[#00BFA5] shadow-lg shadow-[#00BFA5]/20 transition-transform hover:scale-105">
            <AvatarImage src={data?.user?.avatar} alt={data?.user?.name} />
            <AvatarFallback className="rounded-full bg-[#00BFA5] text-white text-lg font-semibold">
              {data?.user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-center leading-tight space-y-0.5">
            <span className="font-semibold text-white text-base">{data?.user?.name}</span>
            <p className="text-xs text-gray-400 truncate max-w-[180px]">{data?.user?.email}</p>
          </div>
        </div>
        <Separator className="mt-5 !bg-white/10" />
      </SidebarHeader>

      {/* Navigation Label */}
      <div className="px-5 pt-2 pb-1">
        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Navigation</span>
      </div>

      {/* Navigation Items */}
      <SidebarContent className="px-3">
        <SidebarMenu className="space-y-1">
          {data?.navMain?.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.item && item.item.length > 0 ? (
                // Has submenu - parent is still navigable, chevron toggles submenu
                <Collapsible defaultOpen={item.isActive} className="group/collapsible">
                  <div className="flex items-center">
                    <SidebarMenuButton
                      asChild
                      className="h-11 flex-1 px-4 font-medium text-sm tracking-wide text-white/90 hover:bg-white/10 hover:text-[#00BFA5] rounded-lg transition-all duration-200"
                    >
                      <a href={item.url}>
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-11 w-10 text-white/70 hover:bg-white/10 hover:text-[#00BFA5] rounded-lg transition-all duration-200">
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="animate-accordion-down">
                    <SidebarMenuSub className="border-l-2 border-[#00BFA5]/30 ml-4 mt-1 space-y-0.5">
                      {item.item.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild className="text-sm text-gray-400 hover:text-[#00BFA5] hover:bg-white/5 rounded-md py-2 transition-all duration-200">
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                // No submenu - regular link
                <SidebarMenuButton
                  asChild
                  className="h-11 justify-between px-4 font-medium text-sm tracking-wide text-white/90 hover:bg-white/10 hover:text-[#00BFA5] rounded-lg transition-all duration-200"
                >
                  <a href={item.url}>
                    <span>{item.title}</span>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Logout Button Footer */}
      <SidebarFooter className="p-4 mt-auto">
        <Button 
          variant="ghost" 
          className="w-full h-11 gap-2.5 bg-white/5 text-white/80 border border-white/10 hover:bg-red-500/15 hover:text-red-400 hover:border-red-400/30 rounded-lg transition-all duration-200 font-medium text-sm"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
