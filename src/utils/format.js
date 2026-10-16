export const formatPrice = (value) =>
  `৳${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const discountPercent = (price, oldPrice) =>
  oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
