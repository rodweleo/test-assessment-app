
import { Home, Users } from "lucide-react"
import { Sidebar, SidebarHeader, SidebarGroupLabel, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupContent } from "./ui/sidebar"
import { NavLink } from "react-router-dom";

export const Navigation = () => {

    const items = [
        {
            title: "Home",
            url: "/",
            icon: Home,
        },
        {
            title: "Drivers",
            url: "/drivers",
            icon: Users,
        },
    ]


    return (
        <Sidebar>
            <SidebarHeader className="p-4">
                <img src="/logos/Green-Wheels-Logo_Horizontal.png" alt="GreenWheels" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="hover:bg-green-700 hover:text-white">
                                        <NavLink to={item.url} className="py-6 px-3">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}