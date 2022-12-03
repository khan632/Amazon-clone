import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../Components/CheckoutProduct";
import Header from "../Components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CurrencyFormat from "react-currency-format";
import { useSession } from "next-auth/react";

function checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session, status } = useSession();
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
