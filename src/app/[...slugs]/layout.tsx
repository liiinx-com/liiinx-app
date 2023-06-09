import { LayoutFactory } from "@/layouts/layout-factory";
import { getPageData } from "@/services";
import { ReactNode } from "react";

import AppState from "@/components/app-state";
import { StatePreloader } from "@/components/state-preloader";
import { store } from "@/store";
import { setWebpage } from "@/store/webpage.slice";
import "./globals.css";

export interface WebsiteRouteParams {
  slugs: string[];
}

interface WebsiteLayoutProps {
  children: ReactNode;
  params: WebsiteRouteParams;
}

export const generateMetadata = async ({ params }: any) => {
  // TODO: fix any
  return { title: "Create Next Apping", description: "website app" };
};

const WebsiteLayout = async ({ children, params }: WebsiteLayoutProps) => {
  const webpageData = await getPageData({ params });
  store.dispatch(setWebpage(webpageData));

  return (
    <>
      <StatePreloader webpage={webpageData} />
      <AppState>
        <LayoutFactory>{children}</LayoutFactory>
      </AppState>
    </>
  );
};

export default WebsiteLayout;
