import loader from "../assets/loader.png";

const Loader = () => {
    return (
        <div className="loader">
            <img src={loader} alt="loader" />
            <p>En cours de chargement...</p>
        </div>
    );
};

export default Loader;
