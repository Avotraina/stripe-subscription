"use client"

import { Calendar, Home, Inbox, Plus, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar"
import { CardFooter } from "@/src/components/ui/card"
import Link from "next/link"
// import { useEffect, useState } from "react"
import { get } from "@/app/lib/server"
import { T_Website } from "../types/website"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function DesktopSidebar() {
  const websiteSlug = useParams().websiteSlug;

  const [items, setItems] = useState<T_Website[]>([]);

  useEffect(() => {
    get<T_Website[]>('/api/website').then((res) => {
      setItems(res)
    })

  }, []);

  return (
    <Sidebar>
      <SidebarHeader className="flex">
        <div>
          <h1>WEBSITE LIST</h1>
        </div>

        <SidebarGroupAction title="Add Project">
          <Link href={'/dashboard/website/new'}>
            <Plus /> <span className="sr-only">Add new website</span>
          </Link>
        </SidebarGroupAction>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>WEBSITE LIST</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={websiteSlug == item.slug ? true : false}>
                    <Link href={`/dashboard/website/${item.slug}`}>{ item.name }</Link>
                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <CardFooter >
          {/* <Button className="w-full" variant="destructive" onClick={() => signOut()}>
            Logout
          </Button> */}
        </CardFooter>

      </SidebarFooter>
    </Sidebar>
  )
}
