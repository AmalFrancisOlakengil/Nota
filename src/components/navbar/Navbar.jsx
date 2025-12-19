
import {Link} from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/folders">Folders</Link>
        </li>
      </ul>
    </nav>
  );
}