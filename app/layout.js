import React from "react";
import "./globals.css";

export const metadata = {
  title: "Unsere Camino-Packliste",
  description:
    "Interaktive Packliste für zwei Personen auf dem Camino Portugués von Porto nach Santiago de Compostela.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  referrer: "no-referrer",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d5f5a",
};

export default function RootLayout({ children }) {
  return React.createElement(
    "html",
    { lang: "de" },
    React.createElement(
      "body",
      null,
      children,
      React.createElement("script", { src: "/app.js", defer: true })
    )
  );
}
