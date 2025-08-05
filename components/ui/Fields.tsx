import { useId } from "react";
import clsx from "clsx";

const formClasses =
  "block w-full appearance-none text-sm/6 rounded-lg border border-dark py-[calc(--spacing(2)-1px)] px-[calc(--spacing(3)-1px)] placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-surface backdrop-blur-sm";

const Label = ({ id, children }: { id: string; children: React.ReactNode }) => {
  return (
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-semibold text-primary-white"
    >
      {children}
    </label>
  );
};

export const TextField = ({
  label,
  type = "text",
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"input">, "id"> & {
  label?: string;
}) => {
  const id = useId();

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  );
};

export const SelectField = ({
  label,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"select">, "id"> & {
  label?: string;
}) => {
  const id = useId();
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, "pr-8")} />
    </div>
  );
};
