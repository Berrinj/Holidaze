import { Outlet } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";

/**
 * the layout component that wraps the Header, Outlet and Footer components
 * @returns {JSX.Element} - the layout of the website
 */

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
