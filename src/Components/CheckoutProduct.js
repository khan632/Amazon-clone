import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import CurrencyFormat from "react-currency-format";
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

function CheckoutProduct({
  id,
  title,
  description,
  rating,
  price,
  category,
  image,
  hasPrime,
}) {

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      description,
      rating,
      price,
      category,
      image,
      hasPrime,
    };

    // push items into redux
    dispatch(addToBasket(product));
  } 

  const removeItemFromBasket = () => {
    // remove from basket
    dispatch(removeFromBasket({ id }));
  }
  return (
    <div className="grid grid-cols-5">
      {/* product image */}
      <Image
        src={image}
        alt={"product-image"}
        width={200}
        height={200}
        objectFit="contain"
      />

      {/* description of product*/}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <CurrencyFormat value={price} displayType={"text"} prefix="$" />
        <div className="flex items-center space-x-2">
          <img
            src="https://links.papareact.com/fdw"
            alt="banner"
            className="w-12"
            loading="lazy"
          />
          <p className="text-xs text-gray-600">FREE Next-day Delivery</p>
        </div>
      </div>

      {/* Right side add/remove button */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>Add to Basket</button>
        <button className="button" onClick={removeItemFromBasket}>Remove from Basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
