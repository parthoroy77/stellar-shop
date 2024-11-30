import { Button, Container } from "@repo/ui";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="py-5">
      <Container>
        <div className="flex h-14 items-center justify-between rounded-xl border px-5">
          <div className="text-sm font-medium md:text-base lg:text-xl">
            <span className="text-primary">Stellar Shop</span> | <span className="text-secondary">Seller Center</span>
          </div>
          <Link href={"/login"}>
            <Button variant={"default"} size={"sm"} className="px-5 lg:px-10">
              Join Us
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
