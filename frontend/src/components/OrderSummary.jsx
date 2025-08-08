import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios.js";

const stripePromise = loadStripe(
  "pk_test_51RqjpT9FZbgW1cNk2GAYaJKMLjYZ4Bch0O9cD7IBY2fj6PBleGBGru1R9gqaX8sM2VHMvCACYo9og8diw6GLoBZ300ckRUQzyc"
);

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    const stripe = await stripePromise;

    const res = await axios.post("/payments/create-checkout-session", {
      products: cart,
      couponCode: coupon ? coupon.code : null,
    });

    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log("Error:", result.error);
    }
  };

  return (
    <motion.div
      className="space-y-4 rounded-lg border-t-4 overflow-visible border-black/5 backdrop-blur-sm bg-white/30 p-4 shadow-xl transition-all duration-500 ease-in-out sm:p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-xl font-thin text-black">Order Summary</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-thin text-gray-500">Subtotal</dt>

            <dd className="text-base font-thin text-black">
              ${formattedSubtotal}
            </dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-thin text-yellow-800/90">
                Savings
              </dt>
              <dd className="text-base font-thin text-yellow-800/90">
                -${formattedSavings}
              </dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-black">
                Coupon ({coupon.code})
              </dt>
              <dd className="text-base font-medium text-black">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}

          <dl className="flex items-center justify-between gap-4 border-t border-gray-600/20 pt-2">
            <dt className="text-base fold-thin text-black">Total</dt>
            <dd className="text-base font-bold text-black">
              ${formattedTotal}
            </dd>
          </dl>
        </div>

        <motion.div
          className="flex w-full items-center justify-center rounded-lg bg-indigo-800/50 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
        >
          Checkout
        </motion.div>

        <div className="flex items-center justify-center gap-2">
          <span className="text-md font-thin text-black">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-md font-thin text-black underline hover:text-black/85 hover:no-underline"
          >
            Shop More
            {/* <MoveRight size={16} /> */}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default OrderSummary;
