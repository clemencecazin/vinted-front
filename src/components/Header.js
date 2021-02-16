import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ userToken, setUser, data, setData, owner }) => {
    const [resultSearch, setresultSearch] = useState();
    const [navResp, setNavResp] = useState();

    const menu = () => {
        setNavResp(
            <div className="menu-responsive--inside">
                <button
                    onClick={() => {
                        setNavResp(<div className="hidden"></div>);
                    }}
                >
                    X
                </button>
                En chantier ! Bientôt ! 🚀🚀🚀
            </div>
        );
    };

    const search = (event) => {
        const input = event.target.value;
        // console.log(event.target.value);
        // console.log(data.offers);
        setresultSearch(input); // Stocke ce qui est tapé dans la barre de recherche
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://project-vinted.herokuapp.com/offers/?title=${resultSearch}`
                );
                // Appel des offres filtrées
                setData(response.data);

                // console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [resultSearch, setData]);
    // Valeurs appelés, resultSearch et setData

    return (
        <header>
            <div className="header--container">
                <div className="header--logo">
                    <Link to="/">
                        <img src={logo} alt="Logo Vinted" />
                    </Link>
                </div>
                <div>
                    <input
                        className="search-input"
                        type="search"
                        placeholder="Rechercher des articles"
                        onChange={search}
                    />
                    <span className="search-input-icon">
                        <FontAwesomeIcon icon="search" />
                    </span>
                </div>

                {userToken ? (
                    <>
                        <button
                            className="signout"
                            onClick={() => setUser(null)}
                        >
                            Se déconnecter
                        </button>
                        <Link to="/Publish" className="header--button-sold">
                            Vends tes articles
                        </Link>
                    </>
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
                        {/* Si l'user est idenitifié (reconnue grâce au token alors j'accède à la page publish sinon login*/}
                        <Link to="/Login" className="header--button-sold">
                            Vends tes articles
                        </Link>
                    </>
                )}

                <div
                    onClick={() => {
                        menu();
                    }}
                    className="menu_responsive"
                >
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                {userToken ? (
                    <div>{navResp}</div>
                ) : (
                    <>
                        <div>{navResp}</div>
                    </>
                )}
            </div>
        </header>
        // Si on a un userToken le bouton se Déconnecter apparait sinon c'est Se connecter et s'inscrire
    );
};

export default Header;
