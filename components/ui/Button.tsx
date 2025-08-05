import Link from "next/link";
import clsx from "clsx";

const baseStyles = {
  solid:
    "inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold transition-colors",
  outline:
    "inline-flex justify-center rounded-lg border py-[calc(--spacing(2)-1px)] px-[calc(--spacing(3)-1px)] text-sm transition-colors",
};

const variantStyles = {
  solid: {
    primary: "relative overflow-hidden bg-primary text-black before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-primary/90 active:text-black/80 before:transition-colors",
    white:
      "bg-white text-dark hover:bg-white/90 active:bg-white/90 active:text-dark/70",
    gray: "bg-surface text-primary-white hover:bg-surface/90 active:bg-surface active:text-primary-white/80",
  },
  outline: {
    primary: "border-primary text-primary hover:border-primary/80 active:bg-primary/10 active:text-primary/80",
    gray: "border-dark text-secondary hover:border-dark/80 active:bg-surface/10 active:text-secondary/80",
  },
};

type ButtonProps = (
  | {
      variant?: "solid";
      color?: keyof typeof variantStyles.solid;
    }
  | {
      variant: "outline";
      color?: keyof typeof variantStyles.outline;
    }
) &
  (
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, "color">
    | (Omit<React.ComponentPropsWithoutRef<"button">, "color"> & {
        href?: undefined;
      })
  );

export const Button = ({ className, ...props }: ButtonProps) => {
  props.variant ??= "solid";
  props.color ??= "primary";

  className = clsx(
    baseStyles[props.variant],
    props.variant === "outline"
      ? variantStyles.outline[props.color]
      : props.variant === "solid"
      ? variantStyles.solid[props.color]
      : undefined,
    className
  );

  return typeof props.href === "undefined" ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  );
};
