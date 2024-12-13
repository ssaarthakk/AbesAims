import Svg, { ClipPath, Defs, G, Path } from "react-native-svg"
import { color_three } from "./Colors"

export const HomeIcon = () => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 16 16"
  >
    <Path
      fill={color_three}
      fillRule="evenodd"
      d="M6 10h4V6H6v4Zm10-4V4h-4V0h-2v4H6V0H4v4H0v2h4v4H0v2h4v4h2v-4h4v4h2v-4h4v-2h-4V6h4Z"
    />
  </Svg>
)

export const CalendarIcon = () => (
  <Svg
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke={color_three}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 10h10M7 14h5M7 3v2m10-2v2M6.2 21h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 19.48 21 18.92 21 17.8V8.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 5 18.92 5 17.8 5H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 6.52 3 7.08 3 8.2v9.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 21 5.08 21 6.2 21Z"
    />
  </Svg>
)

export const ProfileIcon = () => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
  >
    <Path
      fill={color_three}
      fillRule="evenodd"
      d="M16.563 18H3.438c-.706 0-1.228-.697-.961-1.338C3.713 13.698 6.617 12 10 12c3.384 0 6.288 1.698 7.524 4.662.267.641-.255 1.338-.961 1.338M5.917 6c0-2.206 1.832-4 4.083-4 2.252 0 4.083 1.794 4.083 4S12.252 10 10 10c-2.251 0-4.083-1.794-4.083-4m14.039 11.636c-.742-3.359-3.064-5.838-6.119-6.963 1.619-1.277 2.563-3.342 2.216-5.603-.402-2.623-2.63-4.722-5.318-5.028C7.023-.381 3.875 2.449 3.875 6c0 1.89.894 3.574 2.289 4.673-3.057 1.125-5.377 3.604-6.12 6.963C-.226 18.857.779 20 2.054 20h15.892c1.276 0 2.28-1.143 2.01-2.364"
    />
  </Svg>
)

export const BookIcon = () => (
  <Svg
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke={color_three}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 19V6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C5.52 3 6.08 3 7.2 3h9.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C20 4.52 20 5.08 20 6.2V17H6a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h14M9 7h6m-6 4h6m4 6v4"
    />
  </Svg>
)

export const CrossIcon = () => (
  <Svg
    viewBox="0 0 25 25"
    height={20}
    width={20}
  >
    <Path
      fill="#000"
      fillRule="evenodd"
      d="m18.148 12.48 5.665-5.66a4.002 4.002 0 0 0 0-5.66 3.996 3.996 0 0 0-5.665 0l-5.664 5.66L6.82 1.16a3.994 3.994 0 0 0-5.664 0 4.002 4.002 0 0 0 0 5.66l5.664 5.66-5.664 5.67a4.002 4.002 0 0 0 0 5.66 3.994 3.994 0 0 0 5.664 0l5.664-5.66 5.664 5.66a3.996 3.996 0 0 0 5.665 0 4.002 4.002 0 0 0 0-5.66l-5.665-5.67"
    />
  </Svg>
)