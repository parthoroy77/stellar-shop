import Image from "next/image";

const Logo = () => {
  return <Image src={"/logo.svg"} alt="Website Logo" width={200} height={80} />;
};

export default Logo;
