function useCurrency() {
  function format(nominal: any, currency: string) {
    let amount = typeof nominal == "string" ? parseFloat(nominal) : nominal;
    return `${currency}  
      ${amount.toFixed(2).replace(/./g, function (c: any, i: any, a: any) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
      })}`;
  }
  return { format };
}
export { useCurrency };
