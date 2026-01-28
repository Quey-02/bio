import type { Metadata } from "next";
import { Nunito, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import clsx from "clsx";
import styles from "./layout.module.scss";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Biography",
  description: "A biography of the author",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${nunito.variable} ${notoSansJP.variable} antialiased`}
      >
        <Theme
          accentColor="cyan"
          grayColor="slate"
          radius="large"
          scaling="95%"
        >
          <Header />
          <div className={clsx(styles["body-container"])}>{children}</div>
        </Theme>
      </body>
    </html>
  );
}
