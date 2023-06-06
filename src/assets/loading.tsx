import { before } from "node:test";
import { CSSProperties, FC, SVGProps } from "react";

interface ISVGProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

// const csscustomstyles: CSSProperties = {
//   width: "2rem",
//   height: "2rem",
//   display: "block",
//   position: "relative",
//   backgroundColor: "#009688",
//   borderRadius: "50%",
//   background: "conic-gradient(#009688, transparent)",
//   animation: "rotate 5s linear infinite",
//   &:before {
// content:"",
//     position: "absolute",
//     borderRadius: "50%",
// }
// };

export const SpinerLoading = () => (
  <div className="relative bg-gradient-to-tr from-teal-600 to-transparent h-100 w-100 rounded-full bg-red-700 content-[''] animate-spin">
    <div className="absolute w-80 h-80 bg-gray-800 top-10 left-10 rounded-full"></div>
    <div className="absolute w-10 h-10 bg-teal-600 top-0 left-45"></div>
  </div>
);
