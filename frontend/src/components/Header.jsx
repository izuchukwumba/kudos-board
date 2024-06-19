import "../styles/Header.css";
import logo from "../assets/kudos-logo.png";

function Header() {
  return (
    <header id="header">
      <img src={logo} alt="logo" id="logo" />
      <div id="app-name">Kudos Board</div>
      <img src={logo} alt="logo" id="logo" />
    </header>
  );
}

export default Header;
