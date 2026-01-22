"use client"

import * as React from "react"
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
      <SidebarHeader className="p-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs text-gray-400 uppercase tracking-wide">Welcome</span>
          <Avatar className="h-16 w-16 rounded-full border-2 border-[#00BFA5]">
            <AvatarImage src={data?.user?.avatar} alt={data?.user?.name} />
            <AvatarFallback className="rounded-full bg-[#00BFA5] text-white">
              {data?.user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-center leading-tight">
            <span className="font-semibold text-white">{data?.user?.name}</span>
            <p className="text-xs text-gray-400">{data?.user?.email}</p>
          </div>
        </div>
        <Separator className="mt-4 !bg-white/20" />
      </SidebarHeader>

      {/* Navigation Label */}
      <div className="px-4 py-2">
        <span className="text-xs text-gray-500 uppercase tracking-wider">Navigation</span>
      </div>

      {/* Navigation Items */}
      <SidebarContent className="px-2">
        <SidebarMenu>
          {data?.navMain?.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.item && item.item.length > 0 ? (
                // Has submenu - parent is still navigable, chevron toggles submenu
                <Collapsible defaultOpen={item.isActive} className="group/collapsible">
                  <div className="flex items-center">
                    <SidebarMenuButton
                      asChild
                      className="h-12 flex-1 px-4 font-medium uppercase tracking-wide text-white hover:bg-white/10 hover:text-uitm-teal"
                    >
                      <a href={item.url}>
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-12 w-10 text-white hover:bg-white/10 hover:text-uitm-teal">
                        <ChevronDown className="h-5 w-5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <SidebarMenuSub className="border-l-2 border-uitm-teal/30 ml-4">
                      {item.item.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild className="text-gray-300 hover:text-uitm-teal hover:bg-white/5">
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
                  className="h-12 justify-between px-4 font-medium uppercase tracking-wide text-white hover:bg-white/10 hover:text-uitm-teal"
                >
                  <a href={item.url}>
                    <span>{item.title}</span>
                    <ChevronRight className="h-5 w-5" />
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Logout Button Footer */}
      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          className="w-full gap-2 border-white/30 bg-transparent text-white hover:bg-red-500/20 hover:text-red-400 hover:border-red-400/50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
