import LoginModal from "./Login";
import SignUpModal from "./SignUp";

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
