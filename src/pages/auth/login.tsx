export default function Login() {
  return (
    <form>
      {/* Add form fields here */}
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      {/* Submit button */}
      <button type="submit">Log In</button>
    </form>
  );
}
