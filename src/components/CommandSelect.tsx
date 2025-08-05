import { Button } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon } from "lucide-react";
import { ReactNode, useState } from "react";

interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;

  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;

  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  classname?: string;
}

const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  classname,
  isSearchable,
  placeholder = "Select and option",
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((op) => op.value === value);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          classname
        )}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon />
      </Button>

      <CommandResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        shouldFilter={!onSearch}
      >
        <CommandInput
          placeholder="Search..."
          onValueChange={onSearch}
        />

        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No Options Found
            </span>
          </CommandEmpty>
          {options.map((op) => {
            return (
              <CommandItem
                key={op.id}
                onSelect={() => {
                  onSelect(op.value);
                  setOpen(false);
                }}
              >
                {op.children}
              </CommandItem>
            );
          })}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};

export default CommandSelect;
