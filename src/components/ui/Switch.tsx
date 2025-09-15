import { HTMLAttributes } from "react";

interface SwitchProps extends Omit<HTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
}

export default function Switch({ checked, onChange, disabled, className = "", ...rest }: SwitchProps) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => !disabled && onChange(!checked)}
      disabled={!!disabled}
      className={
        "relative inline-flex h-8 w-14 items-center rounded-full transition " +
        (checked ? "bg-[#1F66D1]" : "bg-gray-300") +
        (disabled ? " opacity-50 cursor-not-allowed" : " hover:brightness-95") +
        (className ? ` ${className}` : "")
      }
      {...rest}
    >
      <span
        className={
          "inline-block h-6 w-6 transform rounded-full bg-white shadow transition" +
          (checked ? " translate-x-7" : " translate-x-1")
        }
      />
    </button>
  );
}
