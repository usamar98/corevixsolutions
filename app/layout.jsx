import "./globals.css";

export const metadata = {
  title: "Corevix Solutions | Websites, AI Automation, and Smart Dashboards",
  description:
    "Corevix Solutions helps companies grow with website development, website fixing, AI automation, AI systems, and smart business dashboards.",
  openGraph: {
    title: "Corevix Solutions",
    description:
      "Website development, website fixing, AI automation, AI systems, and smart dashboards for growing companies.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
