export default function Register() {
  return (
    <form>
      {/* Add form fields here */}
      <input type="text" placeholder="Username" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      {/* Submit button */}
      <button type="submit">Register</button>
    </form>
  );
}
