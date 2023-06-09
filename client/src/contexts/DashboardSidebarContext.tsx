import { useRouter } from "next/router";
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

interface DashboardSidebarProviderProps {
  children: ReactNode;
}

interface DashboardSidebarContextType {
  sidebarShow: boolean;
  setSidebarShow: Dispatch<SetStateAction<boolean>>;
}

export const DashboardSidebarContext = createContext<DashboardSidebarContextType>(
  {} as DashboardSidebarContextType
);

export const DashboardSidebarProvider: FC<DashboardSidebarProviderProps> = ({ children }) => {
  const router = useRouter();

  const [sidebarShow, setSidebarShow] = useState<boolean>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("dashboard_sidebar") as string)
      : true
  );

  useEffect(() => {
    localStorage.setItem("dashboard_sidebar", "" + sidebarShow);
  }, [sidebarShow]);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarShow(false);
    }
  }, [router]);

  const value = { sidebarShow, setSidebarShow };

  return (
    <DashboardSidebarContext.Provider value={value}>{children}</DashboardSidebarContext.Provider>
  );
};
