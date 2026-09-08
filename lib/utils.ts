import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function formatPrice(p: number) { return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(p); }
export function formatDate(d: Date | string) { return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(typeof d === 'string' ? new Date(d) : d); }
