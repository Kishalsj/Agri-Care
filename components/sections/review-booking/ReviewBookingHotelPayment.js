import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// import within project
import HotelCheckoutForm from "./ReviewBookingHotelCheckoutForm";

function HotelPayment({
	requestFormat,
	setBookingFailedOnParent,
	setBookingLoaded,
	setBookingConfirmedOnParent
}) {
	const [stripePromise, setStripePromise] = useState(null);
	const [clientSecret, setClientSecret] = useState("");
	const Currency = "USD";

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_AXIOS_URL}/config`)
			.then(async (r) => {
				const { publishableKey } = await r.json();
				setStripePromise(loadStripe(publishableKey));
			})
			.catch((error) => console.error("Error fetching config:", error));
	}, []);
	// setBookingConfirmedOnParent(true);
	// For booking failed, the text should be like this in the Box "
	//   <Next line>. "

	useEffect(() => {
		const price = Math.ceil(requestFormat.Amount);
		fetch(`${process.env.NEXT_PUBLIC_AXIOS_URL}/create-payment-intent`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				price: price * 100,
				currency: Currency,
				customer_name: `${requestFormat.billingData.firstname} ${requestFormat.billingData.lastName}`,
				customer_email: requestFormat.billingData.email,
			}),
		})
			.then(async (result) => {
				var { clientSecret } = await result.json();
				setClientSecret(clientSecret);
			})
			.catch(async (error) => {
				console.error("Fetch create payment intent error: ", error);
			});
	}, []);

	return (
		<>
			{clientSecret !== "" && stripePromise && (
				<Elements stripe={stripePromise} options={{ clientSecret }}>
					<HotelCheckoutForm
						clientSecret={clientSecret}
						setBookingFailedOnParent={setBookingFailedOnParent}
						setBookingLoaded={setBookingLoaded}
						setBookingConfirmedOnParent={setBookingConfirmedOnParent}
						requestFormat={requestFormat}
					/>
				</Elements>
			)}
		</>
	);
}

export default HotelPayment;
