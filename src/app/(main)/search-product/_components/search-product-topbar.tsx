import { Search } from "lucide-react";
import type { ChangeEvent } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface SearchProductTopbarProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchProductTopbar = ({ handleInputChange }: SearchProductTopbarProps) => {
  return (
    <div className="flex items-center justify-between py-4">
      <Button variant="secondary" className="rounded-full">
        Clear All
      </Button>
      <div className="relative">
        <Search className="absolute left-2 size-4 h-full" />
        <Input
          placeholder="Search products..."
          className="rounded-full pl-8"
          onChange={(e) => handleInputChange(e)}
        />
      </div>
    </div>
  );
};
