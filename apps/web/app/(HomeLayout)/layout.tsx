import { FC, ReactNode } from "react";
import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/navbar";
import Container from "../../components/ui/container";
import QuickAccessBar from "../../components/ui/quick-access-bar";
import TopBar from "../../components/ui/top-bar";

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
