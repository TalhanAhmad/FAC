import type { ReactNode } from "react";

/**
 * Centered page container. The desktop design is laid out on a 1440px canvas
 * with roughly 150px side gutters, so max content width ~1140px.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-6 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
