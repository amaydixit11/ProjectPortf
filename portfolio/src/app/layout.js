import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Amay Dixit",
  description: "Amay Dixit - Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-cover`}
        style={
          {
            // backgroundImage: `url('/bg.png')`,
            // background: "#00022d",
            // background:
            //   "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
            // background:
            //   "radial-gradient(circle at 10% 20%, rgb(59, 149, 237) 0%, rgb(7, 91, 173) 90%)",
          }
        }
      >
        {children}
      </body>
    </html>
  );
}
