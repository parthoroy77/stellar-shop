import { TAttribute } from "@repo/utils/types";
import { Badge, Button } from "@ui/index";
import { ColumnDef } from "@ui/tanstack-table";
import { LuChevronRight, LuTrash2 } from "react-icons/lu";

export const column: ColumnDef<TAttribute>[] = [
  {
    id: "expander",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.attributeValues?.length! > 0 && (
            <button>
              <LuChevronRight size={16} />
            </button>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Attribute Name",
    cell: ({ row }) => {
      return (
        <div>
          <span className="font-medium">{row.original.name}</span>
        </div>
      );
    },
  },
  {
    id: "totalAttributes",
    header: "Total Values",
    cell: ({ row }) => {
      return (
        <div>
          <span>{row.original.attributeValues?.length || 0}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "attributeValues",
    header: "Values",
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-4">
          {row.original.attributeValues?.length! > 0 ? (
            <div className="flex items-end gap-1">
              {row.original.attributeValues?.slice(0, 5)?.map((el) => (
                <Badge variant={"accent"} key={el.id} className="border">
                  {el.value}
                </Badge>
              ))}
              {row.original.attributeValues?.length! > 3 && (
                <Badge className="-mr-3 border-none text-xs" variant={"outline"}>
                  ...more
                </Badge>
              )}
            </div>
          ) : (
            <span>No Values added yet</span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => {
      return (
        <div className="pr-3 text-end">
          <span>Actions</span>
        </div>
      );
    },

    cell: () => {
      return (
        <div className="flex justify-end">
          <Button className="flex h-fit items-center gap-2 py-1.5" variant={"destructive"}>
            <LuTrash2 size={16} />
            Delete
          </Button>
        </div>
      );
    },
  },
];
