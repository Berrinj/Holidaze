import { handleLogin } from "../../../api/handlers/handleLogin.mjs";

/*not a modal yet */

function LoginModal() {
  return (
    <div>
      <h2>Login</h2>
      <form id="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginModal;
