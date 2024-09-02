import Image from "next/image";

const paymentProviderImages = [
  { img: "https://www.visa.com.au/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg" },
  { img: "https://raw.githubusercontent.com/stripe/stripe-android/master/assets/stripe_logo_slate_small.png" },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT_nmAoh6j8aoWZ6o09afwjKfFknwtjg30EdCTKD-6FBwgxfT4uJ8dWB1qyq96-vqayTk&usqp=CAU",
  },
  {
    img: "https://e7.pngegg.com/pngimages/530/165/png-clipart-logo-mastercard-pentagram-flat-design-brand-mastercard-text-trademark.png",
  },
];

const PaymentInfo = () => {
  return (
    <div className="bg-accent/40 divide-y-2 rounded-md border text-sm font-semibold uppercase *:p-4">
      <div className="flex items-center justify-evenly gap-2">
        {paymentProviderImages.map(({ img }, i) => (
          <Image
            width={40}
            height={40}
            key={i}
            className="size-9 object-contain object-center"
            src={img}
            alt="Payment Provider Image"
          />
        ))}
      </div>
      <span className="block text-center">Guaranteed safe & secure checkout</span>
    </div>
  );
};

export default PaymentInfo;
