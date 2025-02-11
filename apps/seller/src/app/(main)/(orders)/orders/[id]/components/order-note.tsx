const OrderNote = ({ note }: { note: null | string }) => {
  return (
    <div>
      <h4 className="font-medium">Order note</h4>
      <p className="text-accent-foreground text-sm font-semibold">{note ?? "No note given!"}</p>
    </div>
  );
};

export default OrderNote;
