import { useParams } from "react-router-dom";

const Offer = () => {
    const { id } = useParams();
    console.log(id);

    return <div>Coucou</div>;
};

export default Offer;
