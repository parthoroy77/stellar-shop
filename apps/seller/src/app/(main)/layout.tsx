import { FC, ReactNode } from "react";

const HomeLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <main>{children}</main>;
};

export default HomeLayout;
