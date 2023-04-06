const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const kiloformat = (num, unit) => {
  if (unit === "A") {
    return num + " " + unit;
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
  return num + " " + unit;
};

export { numberWithCommas, kiloformat };
