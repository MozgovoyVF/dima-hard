import cn from "clsx";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  className,
  ...rest
}: PropsWithChildren<TypeButton>) {
  return <button {...rest}>{children}</button>;
}
