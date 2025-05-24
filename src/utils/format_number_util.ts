const NumberFormatter = (format: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'KIP' }).format(format);

export default NumberFormatter;