import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Link to="/login">Se connecter</Link>
            <Link to="/signup">S'inscrire</Link>
        </header>
    );
};

export default Header;
