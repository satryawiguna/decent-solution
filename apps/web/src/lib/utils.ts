/** Merge class strings, filtering out falsy values. Lightweight cn() without extra deps. */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
