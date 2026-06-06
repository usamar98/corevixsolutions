import Script from "next/script";
import VisitorTracker from "./VisitorTracker";
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
      <body>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2739228723124475');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2739228723124475&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
