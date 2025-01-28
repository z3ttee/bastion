"use client";
import { isValidElement, ReactElement } from "react";
import { useController, UseControllerProps } from "react-hook-form";

export interface TextFieldProps {
  id?: string;
  /** Label of the input. When not set, will not render any label */
  label?: string | ReactElement;
  /** Component to render before input element */
  prefix?: ReactElement;
  /** Component to render after input element */
  suffix?: ReactElement;
  /** Register custom classes */
  className?: string;
  /** Register an event handler to handle event when ENTER key is pressed */
  onEnterPressed?: () => void;
}

export default function TextField<T = unknown>(props: UseControllerProps<T> & TextFieldProps) {
  const { id, label, prefix, suffix, className } = props;
  const { field } = useController(props);

  /**
   * Handle key down events.
   * This triggers for example the onEnterPressed() callback function
   */
  function _handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key.toLowerCase() === "enter" && typeof props.onEnterPressed === "function") {
      props.onEnterPressed();
    }
  }

  return (
    <div className={`inline-flex flex-col ${className ?? ""}`}>
      {isValidElement(label) && <>{label}</>}
      {label && (
        <label className="text-label mb-xss text-surface-on-variant" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="flex items-center justify-start w-full rounded-sm shadow-bordered shadow-transparent border-2 border-transparent bg-surface-container has-[:hover:not(:focus)]:bg-surface-container-high has-[:hover:not(:focus)]:border-outline-lowest has-[:focus]:bg-surface-bright has-[:focus]:border-primary has-[:focus]:shadow-primary-container-low transition-all">
        {prefix}
        <input
          {...field}
          id={id}
          className="w-full h-full flex-grow bg-transparent appearance-none p-sm outline-none text-body-sm"
          type="text"
          onKeyDown={_handleKeyDown}
          value={field.value ?? ""}
        />
        {suffix}
      </div>
    </div>
  );
}
