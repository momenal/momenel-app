const kFormatter = (num) => {
  return Math.abs(num) <= 9999
    ? num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : Math.abs(num) > 9999 && Math.abs(num) <= 999940
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.abs(num) > 999940 //999999
    ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(2) + "M"
    : Math.sign(num) * Math.abs(num);
};

export { kFormatter };
