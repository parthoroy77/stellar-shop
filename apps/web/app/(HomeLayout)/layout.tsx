import Footer from "@/components/Footer/footer";
import Navbar from "@/components/Navbar/navbar";
import QuickAccessBar from "@/components/ui/quick-access-bar";
import TopBar from "@/components/ui/top-bar";
import { Container } from "@repo/ui";
import { FC, ReactNode } from "react";

const HomeLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main>
      <TopBar />
      <QuickAccessBar />
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </main>
  );
};

export default HomeLayout;
