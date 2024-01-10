export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "gbp",
  }).format(amount);
};
