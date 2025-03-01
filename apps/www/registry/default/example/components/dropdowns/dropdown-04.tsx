// Dependencies: pnpm install lucide-react

import {
  Bolt,
  ChevronDown,
  CopyPlus,
  Files,
  Layers2,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DropdownDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Grouped items
          <ChevronDown
            className="-me-1 ms-2 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CopyPlus
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bolt
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            Edit
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Layers2
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            Group
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Files
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            Clone
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <Trash size={16} strokeWidth={2} aria-hidden="true" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
