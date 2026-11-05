const MINUTES_PER_HOUR = 60;

export function toMinutes(value: string): number {
  const [h, m] = value.split(":").map(Number);
  return h * MINUTES_PER_HOUR + m;
}

export function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
