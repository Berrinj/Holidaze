import { Outlet } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";

function Layout() {
  return (
    <>
      <Header />
      <main className="bg-main-img bg-cover bg-no-repeat border-x border-mineshaft min-h-screen p-0 md:p-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
