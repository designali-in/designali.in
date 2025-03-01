import { DesignsSidebarNav } from "@/comp/mdx/doc/sidebar-nav";

import { designsConfig } from "@/config/docs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DesignsLayoutProps {
  children: React.ReactNode;
}

export default function DesignsLayout({ children }: DesignsLayoutProps) {
  return (
    <div className="flex-1 px-6 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:gap-10">
      <div className="fixed top-24 z-30 hidden h-full w-full shrink-0 overflow-y-auto border-r border-slate-400 dark:border-slate-600 md:sticky md:block">
        <aside className="border-grid fixed hidden h-[calc(100vh-4rem)] w-full shrink-0 border-r md:sticky md:block">
          <div className="no-scrollbar h-full overflow-auto  pr-4 ">
            <DesignsSidebarNav items={designsConfig.sidebarNav} />
          </div>
        </aside>
      </div>
      {children}
    </div>
  );
}
