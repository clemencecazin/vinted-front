import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ description, price }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState("");
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            setDisabled(true);

            // Récup les données bancaire saisies
            const cardElements = elements.getElement(CardElement);

            // Requête à l'API Stripe pour envoyer les infos et récupérer le token
            const stripeResponse = await stripe.createToken(cardElements, {
                name: "l'id de l'acheteur",
            }); // Faire un Cookie.get de l'ID du user
            console.log(stripeResponse);
            console.log(stripeResponse.token.id);

            const stripeToken = stripeResponse.token.id;

            // Requête à l'API pour effectuer la transaction
            const response = await axios.post(
                "https://project-vinted.herokuapp.com/payment",
                {
                    stripeToken: stripeToken,
                    description: description,
                    price: price,
                }
            );
            console.log(response.status);

            // Si c'est OK
            if (response.status === 200) {
                setSucceeded("Paiement validé ! Merci pour votre commande !");
            }

            console.log(response.status);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className="checkout">
            <form onSubmit={handleSubmit}>
                <p>Résumé de la commande</p>
                <div>
                    <span>Commande : </span>
                    <span>{price} €</span>
                </div>

                <p>
                    Il ne vous reste plus qu'une étape pour vous offrir
                    <strong> {description}</strong>. Vous allez payer
                    <strong> {price} €</strong>
                </p>

                <CardElement className="cardElement" />
                <button disabled={disabled} type="submit">
                    Acheter
                </button>
            </form>
            <span className="success">{succeeded}</span>
        </div>
    );
};

export default CheckoutForm;
