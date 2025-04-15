import { getServerAuth } from "@/lib/auth-utils";
import { Button, Container } from "@repo/ui";
import Link from "next/link";
import LogoText from "../sidebar/logo-text";

const Navbar = async () => {
  const { isAuthenticated } = await getServerAuth();
  return (
    <div className="py-5">
      <Container>
        <div className="flex h-14 items-center justify-between rounded-xl">
          <div className="flex items-center gap-2 text-sm font-medium md:text-base lg:text-xl">
            <LogoText /> | <span className="text-secondary">Seller Center</span>
          </div>
          {isAuthenticated ? (
            <Link href={"/dashboard"}>
              <Button variant={"default"} size={"sm"} className="px-5 lg:px-10">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href={"/login"}>
              <Button variant={"default"} size={"sm"} className="px-5 lg:px-10">
                Join Us
              </Button>
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
