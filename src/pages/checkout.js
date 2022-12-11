import CheckoutProduct from "../Components/CheckoutProduct";
import Header from "../Components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";

import Image from "next/image";
import axios from 'axios'
import { useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { useSession } from "next-auth/react";
import { loadStripe } from '@stripe/stripe-js';
// import { data } from "autoprefixer";
const stripePromise = loadStripe(process.env.stripe_public_key);

function checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session, status } = useSession();

  const createCheckoutSession = async () => {
      const stripe = await stripePromise;

      // call the backend to create a checkout session
      const checkOutSession = await axios.post('/api/create-checkout-session',
        {
          items: items,
          email: session.user.email,
        }
      );
      
      // redirect to frontend
      const result = await stripe.redirectToCheckout({
        sessionId: checkOutSession.data.id,
      })

      if(result.error) alert(result.error.message);
  }


  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left side product detail section */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            alt="banner-image"
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is Empty"
                : "Your Shopping Basket"}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>

        {/* right side total no product section */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):
                <span className="font-bold">
                  <CurrencyFormat value={total} displayType={"text"} prefix="$"/>
                </span>
              </h2>

              <button
                onClick={createCheckoutSession}
                role="link"
                disabled={status !== "authenticated"}
                className={`button mt-5 ${
                  status !== "authenticated" &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {status !== "authenticated"
                  ? "Sign in to checkout"
                  : "Procedd to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default checkout;
