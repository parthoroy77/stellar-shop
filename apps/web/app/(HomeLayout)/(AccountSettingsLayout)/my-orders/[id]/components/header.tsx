const Header = ({ orderId }: { orderId: string }) => {
  return (
    <div className="space-y-1 !pt-0">
      <h1 className="text-xl font-semibold">
        Order Id: <span className="text-primary font-bold">{orderId}</span>
      </h1>
      <span className="text-accent-foreground w-2/3 text-sm">
        Below, you'll find the full history of your past order along with their current status. You can track the
        progress of each order and stay updated on its delivery status or any other relevant details.
      </span>
    </div>
  );
};

export default Header;
