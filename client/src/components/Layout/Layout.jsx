import { Outlet } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import WhatsAppButton from "../WhatsAppButton/WhatsAppButton";

function Layout() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default Layout;