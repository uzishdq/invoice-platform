"use client";

import * as React from "react";
import {
  IconDashboard,
  IconFileDollar,
  IconFileInvoice,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-bar/nav-main";
import { NavUser } from "@/components/nav-bar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/lib/constant";
import { Session } from "next-auth";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  session: Session | null;
}

export function AppSidebar({ session, ...props }: AppSidebarProps) {
  const data = {
    user: {
      name: session?.user?.name || "John Doe",
      email: session?.user?.email || "",
      avatar: session?.user?.image || "",
    },
    navMain: [
      {
        title: "Dashboard",
        url: ROUTES.AUTH.DASHBOARD,
        icon: IconDashboard,
      },
      {
        title: "Invoices",
        url: ROUTES.AUTH.INVOICES,
        icon: IconFileInvoice,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconFileDollar className="!size-5" />
                <span className="text-base font-semibold">
                  Invoice Platfrom
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
