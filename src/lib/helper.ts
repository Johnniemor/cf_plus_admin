export function minuteToHour(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

export function padToTwoDigits(num: number) {
  return num.toString().padStart(2, '0');
}

export function createDebouncedTimeout() {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (callback: () => void, delayInSeconds: number): void {
    if (timer) clearTimeout(timer);
    timer = setTimeout(callback, delayInSeconds * 1000); // Convert seconds to milliseconds
  };
}

export function parseCustomDate(date: string, time: string) {
  const [day, month, year] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes);
}

export function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  const visiblePart = localPart.slice(0, 3);
  return `${visiblePart}****@${domain}`;
}

export function getSecondsCooldown(date: Date) {
  const targetDate = +new Date(date);
  const now = +new Date();

  const milliseconds = targetDate - now;
  const diffSeconds = Math.floor(milliseconds / 1000);
  return diffSeconds;
}
