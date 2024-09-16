import { Button } from "@ui/index";
import Image from "next/image";
import Link from "next/link";

export default function () {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 p-5">
      <Image
        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
        alt="404 Image"
        width={500}
        height={500}
      />
      <h3 className="text-center text-xl lg:w-[50%]">
        The page you are looking for could not be found. The link to this address may be outdated or we may have moved
        the since you last bookmarked it.
      </h3>
      <Link href={"/"}>
        <Button>Back To Home</Button>
      </Link>
    </div>
  );
}
