"use client"

import * as React from "react"
import {
  IconCalendar,
  IconCalendarMonth,
  IconCalendarWeek,
  IconCamera,
  IconDashboard,
  IconDeviceCctv,
  IconFileAi,
  IconFileDescription,
  IconListDetails,
  IconSandbox,
  IconSettings,
  IconShoppingCart,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,

} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: IconListDetails,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: IconSandbox,
    },
    {
      title: "sales",
      url: "/dashboard/sales",
      icon: IconShoppingCart,
    },
    // {
    //   title: "Team",
    //   url: "#",
    //   icon: IconUsers,
    // },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
  ],
  documents: [
    {
      name: "Today's Sales",
      url: "/dashboard/sales/today",
      icon: IconCalendar,
    },
    {
      name: "Weekly Sales",
      url: "/dashboard/sales/weekly",
      icon: IconCalendarWeek,
    },
    {
      name: "Monthly Sales",
      url: "/dashboard/sales/monthly",
      icon: IconCalendarMonth,
    },
  ],
}

export function AppSidebar({...props}) {
  const {data : session} = useSession();

   //  use this to fetch user data on console By koya ^_^
  // console.log(session);

  // console.log(data.user);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconDeviceCctv className="!size-5" />
                <span className="text-base font-semibold">Sakka</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {session?.user &&<NavUser user={session?.user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
