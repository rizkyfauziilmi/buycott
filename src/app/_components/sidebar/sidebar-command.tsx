import { Search } from "lucide-react";
import { Button } from "~/components/ui/button";

export const SidebarCommand = () => {
  return (
    <div className="relative">
      <Search className="absolute left-2 size-4 h-full text-muted-foreground" />
      <Button
        className="w-full justify-start pl-8 text-muted-foreground"
        variant="secondary"
      >
        Search...
      </Button>
      <div className="absolute right-2 top-0 flex h-full items-center justify-center">
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
    </div>
  );
};
