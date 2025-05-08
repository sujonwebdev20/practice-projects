// Icons
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import { TiInfinityOutline } from "react-icons/ti";

// Sidebar components
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { SidebarHeader } from "./ui/sidebar";
import logo from "../assets/images/logo-white.png";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: IoHomeOutline,
  },
  {
    title: "Categories",
    url: "#",
    icon: BiCategoryAlt,
  },
  {
    title: "Blogs",
    url: "/blogs",
    icon: GrBlog,
  },
  {
    title: "Comments",
    url: "/comments",
    icon: FaRegComments,
  },
  {
    title: "Users",
    url: "/users",
    icon: LuUsers,
  },
];

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        <img src={logo} alt="Logo" width={120} />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        {/* Navigation group */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <hr />
        {/* Categories group*/}
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <TiInfinityOutline />
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

export default AppSidebar;
