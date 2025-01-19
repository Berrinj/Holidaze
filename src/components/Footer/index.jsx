import hlogo from "assets/hlogo.png";
import { LiaCopyright } from "react-icons/lia";

function Footer() {
  return (
    <footer className="text-white bg-black flex items-center text-sm font-light flex-col p-3 text-center border-t border-mineshaft">
      <img src={hlogo} alt="Holidaze H logo" className="h-5 w-5" />
      <p>Holidaze.com</p>
      <p className="flex items-center">
        Copyright
        <LiaCopyright /> 2025
      </p>
      <p className="italic font-extralight mt-3">
        A Noroff Exam project by BerreMarte.no
      </p>
    </footer>
  );
}

export default Footer;
