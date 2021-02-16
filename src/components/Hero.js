import { Link } from "react-router-dom";

const Hero = ({ userToken }) => {
    return (
        <>
            <div className="hero">
                <span></span>
                <div className="hero--card">
                    <div>
                        Prêts à faire du tri dans vos placards ?
                        {userToken ? (
                            <Link to="/publish">Commencer à vendre</Link>
                        ) : (
                            <Link to="/login">Commencer à vendre</Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="card_responsive">
                Prêts à faire du tri dans vos placards ?
                {userToken ? (
                    <Link to="/publish">Commencer à vendre</Link>
                ) : (
                    <Link to="/login">Commencer à vendre</Link>
                )}
            </div>
        </>
    );
};

export default Hero;
