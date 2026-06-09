import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Deterministic number formatter (comma thousands separators) so server and
// client render identical strings regardless of the runtime locale. Avoids
// hydration mismatches caused by Number.prototype.toLocaleString().
export function formatNumber(value: number): string {
  const rounded = Math.round(value)
  const isNegative = rounded < 0
  const digits = Math.abs(rounded).toString()
  const withCommas = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return isNegative ? `-${withCommas}` : withCommas
}
