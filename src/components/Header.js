import { Link } from "react-router-dom";

const Header = ({ userToken, setUser }) => {
    return (
        <header>
            {userToken ? (
                <button onClick={() => setUser(null)}>Se déconnecter</button>
            ) : (
                <>
                    <Link to="/login">Se connecter</Link>
                    <Link to="/signup">S'inscrire</Link>
                </>
            )}
        </header>
    );
};

export default Header;
