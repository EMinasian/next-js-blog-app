import { ButtonHTMLAttributes } from "react"

export type ButtonVariant = "primary" | "secondary" | "ghost"

type GetButtonClassNameOptions = {
  variant?: ButtonVariant
  active?: boolean
  className?: string
}

/**
 * Shared button visual style, exposed as a class-name helper so non-button
 * elements (e.g. a Next.js <Link />) can render with the exact same look.
 */
export function getButtonClassName({
  variant = "secondary",
  active = false,
  className = "",
}: GetButtonClassNameOptions = {}): string {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"

  const variants: Record<ButtonVariant, string> = {
    primary:
      "border-foreground bg-foreground text-background hover:opacity-90",
    secondary:
      "border-border bg-surface text-foreground hover:bg-subtle-accent",
    ghost:
      "border-transparent bg-transparent text-foreground hover:bg-subtle-accent",
  }

  const activeClass = active
    ? "border-foreground bg-foreground text-background hover:opacity-90"
    : variants[variant]

  return [base, activeClass, className].filter(Boolean).join(" ")
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  active?: boolean
}

export default function Button({
  variant = "secondary",
  active = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClassName({ variant, active, className })}
      {...props}
    />
  )
}
