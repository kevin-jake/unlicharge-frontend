// Logic for price computing

export const computeTotalPrice = (batteryPrice, bmsPrice, abPrice) => {
  const sum = +batteryPrice + +bmsPrice + +abPrice;
  if (sum) return sum;
};
