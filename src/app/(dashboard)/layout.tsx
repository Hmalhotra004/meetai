import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col h-screen w-screen bg-muted">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default layout;
