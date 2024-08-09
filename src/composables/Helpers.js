export function useHelpers() {
  const formatPrice = (price) => {
    return price.toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  }

  return { formatPrice };
}