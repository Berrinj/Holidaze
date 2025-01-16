import { handleSignup } from "../../../api/handlers/handleSignup.mjs";

function SignupModal() {
  return (
    <div>
      <h2>Sign Up</h2>
      <form id="signup" onSubmit={handleSignup}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="role">Choose your role</label>
        <select id="role" name="role">
          <option value="customer">Customer</option>
          <option value="venue-manager">Venue Manager</option>
        </select>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <label htmlFor="bio">Bio</label>
        <textarea id="bio" name="bio" />
        <label htmlFor="avatar">Avatar</label>
        <input type="url" id="avatar" name="avatar" />
        <label htmlFor="avatar-alt">Avatar Alt Text</label>
        <input type="text" id="avatar-alt" name="avatar-alt" />
        <label htmlFor="banner">Banner</label>
        <input type="url" id="banner" name="banner" />
        <label htmlFor="banner-alt">banner Alt Text</label>
        <input type="text" id="banner-alt" name="banner-alt" />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupModal;
