function useCurrency() {
  function format(amount: Number, currency: string) {
    return `${currency}  
      ${amount.toFixed(2).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
      })}`;
  }
  return { format };
}
export { useCurrency };
