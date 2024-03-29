const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const kiloformat = (num, unit) => {
  if (unit === "A") {
    return num.toFixed(2) + " " + unit;
  }
  if (unit === "mAh") {
    return numberWithCommas(num.toFixed(0)) + " " + unit;
  }
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(3).replace(/\.0$/, "") + " G" + unit;
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(3).replace(/\.0$/, "") + " M" + unit;
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(3).replace(/\.0$/, "") + " k" + unit;
  }
  return num.toFixed(2) + " " + unit;
};

export { numberWithCommas, kiloformat };
