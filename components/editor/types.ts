export interface BaseProps {
  className: string
  [key: string]: unknown
}
export type OrNull<T> = T | null