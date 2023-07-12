import { Poppins } from "next/font/google";
import localFont from "next/font/local";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const pretendard = localFont({
  src: [
    {
      path: "./font/pretendard/Pretendard-Thin.woff2",
      weight: "100",
    },
    {
      path: "./font/pretendard/Pretendard-ExtraLight.woff2",
      weight: "200",
    },
    {
      path: "./font/pretendard/Pretendard-Light.woff2",
      weight: "300",
    },
    {
      path: "./font/pretendard/Pretendard-Regular.woff2",
      weight: "400",
    },
    {
      path: "./font/pretendard/Pretendard-Medium.woff2",
      weight: "500",
    },
    {
      path: "./font/pretendard/Pretendard-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "./font/pretendard/Pretendard-Bold.woff2",
      weight: "700",
    },
    {
      path: "./font/pretendard/Pretendard-ExtraBold.woff2",
      weight: "800",
    },
    {
      path: "./font/pretendard/Pretendard-Black.woff2",
      weight: "900",
    },
  ],
});

export { poppins, pretendard };
