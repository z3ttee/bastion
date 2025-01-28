import Image from "next/image";
import { ReactElement } from "react";

export interface ServiceConnectionProps {
  /** Set component displayed on left side */
  readonly leftComponent: ReactElement;
  /** Set component displayed on right side. If not set, displays default component */
  readonly rightComponent?: ReactElement;
}

export default function ServiceConnection(props: ServiceConnectionProps) {
  const { leftComponent, rightComponent } = props;

  return (
    <div className="flex items-center justify-center gap-6xl">
      {/* Left side */}
      <div className="inline-flex items-center justify-center relative w-14 h-14">{leftComponent}</div>

      {/* Animated indicator */}
      <div className="inline-flex items-center justify-center gap-xss">
        <span
          className="inline-block w-2 h-2 bg-surface-container-highest rounded-full animate-pulse"
          style={{
            animationDelay: "0ms"
          }}></span>
        <span
          className="inline-block w-2 h-2 bg-surface-container-highest rounded-full animate-pulse"
          style={{
            animationDelay: "250ms"
          }}></span>
        <span
          className="inline-block w-2 h-2 bg-surface-container-highest rounded-full animate-pulse"
          style={{
            animationDelay: "500ms"
          }}></span>
      </div>

      {/* Right side */}
      {rightComponent ?? <Image src="/images/logo/mascot-head.png" alt="Furport Logo" width={56} height={56} />}
    </div>
  );
}
