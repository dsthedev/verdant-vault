import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const uppercaseFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getLocationTypeVariant = (type: string) => {
  const variants = {
    SHELF: 'orange',
    BIN: 'yellow',
    BACKROOM: 'purple',
    GREENHOUSE: 'cyan',
  } as const

  return variants[type as keyof typeof variants] || 'outline'
}
