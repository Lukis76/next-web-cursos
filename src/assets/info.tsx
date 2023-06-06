import { FC, SVGProps } from "react";

interface ISVGProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const SvgInfo: FC<ISVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 12 12"
    width={`${props.size || 3}rem`}
    height={`${props.size || 3}rem`}
    fillOpacity={0}
    {...props}
  >
    <path
      stroke="#f87171"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.763 3.386c.683-.598 1.791-.598 2.475 0 .683.598.683 1.568 0 2.166-.12.104-.251.19-.391.257C6.412 6.02 6 6.392 6 6.875v.438M11.25 6A5.25 5.25 0 1 1 .75 6a5.25 5.25 0 0 1 10.5 0ZM6 9.063h.004v.004H6v-.005Z"
    />
  </svg>
);
