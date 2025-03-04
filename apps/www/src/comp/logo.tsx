import { forwardRef } from "react";

export const Logo = forwardRef<SVGSVGElement, React.SVGAttributes<SVGElement>>(
  (props, ref) => {
    return (
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        viewBox="0 0 619.68 711.92"
        ref={ref}
        {...props}
      >
        <path
          fill="#f50537"
          d="M0,0h253.69c116.97,0,207.22,30.93,270.73,92.75,63.5,61.84,95.26,149.91,95.26,264.21s-31.08,201.22-93.25,262.71c-62.17,61.51-151.08,92.25-266.72,92.25H0V0Z"
        />
      </svg>
    );
  },
);

Logo.displayName = "Logo";
