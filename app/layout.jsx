import "../assets/styles/globals.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"], // Add weights as needed
  variable: "--font-poppins", // Allows Tailwind to use this font
});

const MainLayout = ({ children }) => {
  return (
    <html className={`${poppins.variable} font-sans`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
