import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    // Sidebar
    <SidebarProvider>
      <AppSidebar />
      {/* Topbar */}
      <Topbar />
      <div className="w-full">
        <main className="border w-full  min-h-[calc(100vh-3rem)] pt-[4rem]">
          {/* <SidebarTrigger /> */}
          <Outlet />
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
