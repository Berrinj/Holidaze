import { Outlet } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";

function Layout() {
  return (
    <>
      <Header />
      <main className="bg-main-img bg-cover bg-no-repeat border-y border-mineshaft p-0 md:p-8 grow w-full">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
