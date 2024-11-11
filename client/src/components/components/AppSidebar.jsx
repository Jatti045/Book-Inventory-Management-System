import { Home, Plus, Filter, List, Download } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Add Book",
    url: "/add-book",
    icon: Plus,
  },
  {
    title: "Filter Books",
    url: "/filter-book",
    icon: Filter,
  },
  {
    title: "Books List",
    url: "/book-list",
    icon: List,
  },
  {
    title: "Export Data",
    url: "/export",
    icon: Download,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-gradient-to-b from-amber-100 to-amber-200">
        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-900 font-semibold">
            Book Inventory Management System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  >
                  <SidebarMenuButton asChild className="hover:bg-amber-600 hover:text-white active:text-white active:bg-amber-700 text-amber-800">
                    <Link
                      to={item.url}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
