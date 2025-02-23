import LoginModal from "components/Modals/Login";
import SignUpModal from "components/Modals/Signup";

/**
 * Display login and sign up modals based on user interaction
 * @param {boolean} isLoginOpen - the state of the login modal
 * @param {function} setLoginOpen - a function to toggle the login modal
 * @param {boolean} isSignUpOpen - the state of the sign up modal
 * @param {function} setSignUpOpen - a function to toggle the sign up modal
 * @returns {JSX.Element} - a JSX Element that displays login and sign up modals
 */

function AuthModals({
  isLoginOpen,
  setLoginOpen,
  isSignUpOpen,
  setSignUpOpen,
}) {
  const toggleLogin = () => {
    setLoginOpen(!isLoginOpen);
    setSignUpOpen(false);
  };

  const toggleSignUp = () => {
    setSignUpOpen(!isSignUpOpen);
    setLoginOpen(false);
  };

  return (
    <div>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={toggleLogin}
        onToggleSignUp={toggleSignUp}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={toggleSignUp}
        onToggleLogin={toggleLogin}
      />
    </div>
  );
}

export default AuthModals;
