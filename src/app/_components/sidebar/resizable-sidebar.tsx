import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { Sidebar } from "./sidebar";

export const ResizableSidebar = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen w-screen overflow-hidden"
    >
      <ResizablePanel defaultSize={20} minSize={20}>
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
};
