import { Button } from "@ui/index";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-4 text-sm text-black">
      <svg
        width="271px"
        height="166px"
        id="Layer_1"
        enableBackground="new 0 0 512 512"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <g>
            <path d="m71.6 254.8h184.4v222.9h-184.4z" fill="#ffcf52"></path>
            <path d="m33.5 209.5h184.4l38.1 45.3h-184.4z" fill="#f9b835"></path>
            <path d="m478.5 209.5h-184.4l-38.1 45.3h184.4z" fill="#f9b835"></path>
            <path d="m256 254.8h184.4v222.9h-184.4z" fill="#fcc344"></path>
            <g fill="#f2f2f2">
              <path d="m107.5 421.6h38.8c3.1 0 5.6-2.5 5.6-5.6s-2.5-5.6-5.6-5.6h-38.8c-3.1 0-5.6 2.5-5.6 5.6s2.5 5.6 5.6 5.6z"></path>
              <path d="m146.3 435h-38.8c-3.1 0-5.6 2.5-5.6 5.6s2.5 5.6 5.6 5.6h38.8c3.1 0 5.6-2.5 5.6-5.6s-2.6-5.6-5.6-5.6z"></path>
            </g>
          </g>
          <g fill="#ff7d4a">
            <path d="m287.5 42.9c-8.1-5.8-19.1-8.6-32.5-8.6-17.3 0-30 4.2-38.1 12.4-2.3 2.4-4.4 5-6.3 7.9-2.9 4.6-3.2 10.5-.9 15.5s6.8 8.3 11.9 9.1c.5.1 1.2.1 1.8.1 5.6 0 11-3.5 13.7-9.2 1-1.8 1.9-3.5 3.2-4.7 3.7-3.9 8.4-5.9 14-5.9 5.2 0 9.3 1.4 12 4.2 2.8 2.8 4.2 6.6 4.2 11.2 0 4.9-3 9.8-9.2 15-9.7 8.4-16.1 14.5-18.7 17.7-2.6 3.1-4.5 6.6-5.8 10.3 0 .1-.1.2-.1.4-1 3.7-.1 7.6 2.2 10.5 2.2 2.9 5.5 4.5 9.1 4.5h8.2c4.9 0 9.2-3.1 10.6-7.8.3-1.2 1-2.3 1.4-3.3 1.9-3.8 6.4-8.4 13.3-14.3 9.2-7.6 15.1-13.8 18-18.8 2.8-4.9 4.2-9.9 4.2-15.1.2-13.2-5.2-23.2-16.2-31.1z"></path>
            <path d="m252.8 143.1h-4.7c-7.8 0-14.1 6.7-14.1 15s6.4 15 14.1 15h4.7c7.8 0 14.1-6.7 14.1-15s-6.4-15-14.1-15z"></path>
          </g>
        </g>
      </svg>
      <div className="flex flex-col items-center justify-center space-y-3">
        <p>Your cart is currently empty.</p>
        <Link href={"/"}>
          <Button variant={"accent"}>Return to shop</Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
