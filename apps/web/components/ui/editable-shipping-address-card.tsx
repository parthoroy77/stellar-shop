import { Badge, Button } from "@ui/index";
import { LuPenLine, LuSave } from "react-icons/lu";

const EditableShippingAddressCard = () => {
  return (
    <div className="hover:bg-accent/30 relative space-y-3 rounded-lg border px-5 py-4 transition-all duration-300">
      <div className="text-accent-foreground space-y-1">
        <div>
          <Badge variant={"accent"} className="rounded-md">
            Home
          </Badge>
        </div>
        <h3 className="text-primary-foreground text-lg font-semibold">Partho Roy</h3>
        <div>
          <h4 className="text-sm font-medium">019348033802</h4>
          <h5 className="text-xs">Sukher Thikana, Nimtola, Sirajdikhan, Munshiganj, 3434</h5>
        </div>
      </div>
      <div className="absolute -top-0.5 right-2 space-x-2">
        <Button variant={"ghost"} size={"icon"} className="size-8 rounded-full border">
          <LuPenLine size={17} />
        </Button>
        <Button variant={"accent"} size={"icon"} className="size-8 rounded-full border">
          <LuSave size={17} />
        </Button>
      </div>
    </div>
  );
};

export default EditableShippingAddressCard;
