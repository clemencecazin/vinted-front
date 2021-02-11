import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = ({ userToken, setUser }) => {
    return (
        <header>
            <div className="header--container">
                <div className="header--logo">
                    <img src={logo} alt="Logo Vinted" />
                </div>

                <input
                    className="search-input"
                    type="search"
                    placeholder="Rechercher des articles"
                ></input>
                {userToken ? (
                    <button onClick={() => setUser(null)}>
                        Se déconnecter
                    </button>
                ) : (
                    <>
                        <div className="login-signup">
                            <Link
                                className="header--button-login-signup"
                                to="/login"
                            >
                                Se connecter
                            </Link>
                            <Link
                                className="header--button-login-signup"
                                to="/signup"
                            >
                                S'inscrire
                            </Link>
                        </div>

                        <button className="header--button-sold">
                            Vends tes articles
                        </button>
                    </>
                )}
            </div>
        </header>
        // Si on a un userToken le bouton se Déconnecter apparait sinon c'est Se connecter et s'inscrire
    );
};

export default Header;
