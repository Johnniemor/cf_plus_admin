import { useMemo, useCallback } from 'react';

export const useFormatCurrency = (
  options = {
    locale: 'de-DE',
    currency: 'LAK',
  },
) => {
  const formatter = useMemo(() => {
    return new Intl.NumberFormat(options.locale, {
      style: 'currency',
      currency: options.currency,
    });
  }, [options.locale, options.currency]);

  return useCallback(
    (amount: number) => {
      return formatter.format(amount);
    },
    [formatter],
  );
};
