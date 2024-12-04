// "use client"

import React, { Suspense } from "react";
import { DesktopSidebar } from "./sidebar";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { AuthProvider } from "../components/AuthProvider";
import { HeaderNav } from "../components/dashboard/HeaderNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        // <Provider>
        <AuthProvider>
            <SidebarProvider>
            
                <Suspense key={Date.now()} fallback={<h1>Loading feed...</h1>}>
                    <DesktopSidebar />
                    <SidebarTrigger />
                </Suspense>
                
                <main className="flex min-h-screen w-full flex-col">
                    <div className="flex flex-col sm:gap-4 sm:py sm:pl-14">
                        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 justify-end my-2">
                            <HeaderNav />
                        </header>
                    </div>
                    
                    {children}
                </main>
            </SidebarProvider>
        </AuthProvider>
        // </Provider>
    );
}