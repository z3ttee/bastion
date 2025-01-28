import { PropsWithChildren } from "react";

export default function OrDivider(props: PropsWithChildren<unknown>) {
  const { children } = props;

  return (
    <div className="grid grid-cols-[1fr,auto,1fr] w-full items-center gap-sm my-lg">
      <div className="flex-grow h-[1px] bg-outline-lowest rounded-full"></div>
      <p className="flex-grow text-label-sm text-surface-on-variant2">{children}</p>
      <div className="flex-grow h-[1px] bg-outline-lowest rounded-full"></div>
    </div>
  );
}
