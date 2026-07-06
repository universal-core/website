import React from "react";
import clsx from "clsx";

/* UniversalCore "Core Seal" — octagon ward enclosing a diamond core.
   Violet ward/diamond, light-blue core + nodes. Geometry only.
   Ported from universalcore-design/logo.js → seal(). */

const OCT = "29,21.7 21.7,29 10.3,29 3,21.7 3,10.3 10.3,3 21.7,3 29,10.3";

type MarkProps = {
  size?: number;
  className?: string;
  violet?: string;
  faint?: string;
  accent?: string;
};

export const CoreSealIcon = ({
  size = 30,
  className,
  violet = "#a78bf5",
  faint = "rgba(167,139,245,0.34)",
  accent = "#5fc4ec",
}: MarkProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
  >
    <polygon points={OCT} stroke={faint} strokeWidth="1.4" />
    <polygon
      points="16,6.4 25.6,16 16,25.6 6.4,16"
      stroke={violet}
      strokeWidth="1.5"
    />
    <polygon points="16,11.4 20.6,16 16,20.6 11.4,16" fill={accent} />
    <circle cx="16" cy="3" r="1" fill={accent} />
    <circle cx="16" cy="29" r="1" fill={accent} />
    <circle cx="3" cy="16" r="1" fill={accent} />
    <circle cx="29" cy="16" r="1" fill={accent} />
  </svg>
);

type LogoProps = {
  className?: string;
  markSize?: number;
};

/* Mark + wordmark lockup for the header/footer. */
export const CoreSealLogo = ({ className, markSize = 30 }: LogoProps) => (
  <span className={clsx("flex items-center gap-2.5", className)}>
    <CoreSealIcon size={markSize} />
    <span
      className={clsx(
        "font-display",
        "text-[19px] font-semibold leading-none",
        "tracking-[0.3px]",
        "text-gray-0",
      )}
    >
      Universal<b className="font-bold text-refine-purple">Core</b>
    </span>
  </span>
);
