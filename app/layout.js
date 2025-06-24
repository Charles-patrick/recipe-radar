'use client'
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./layout/header";

const metadata = {
  title: "Recipe Radar ",
  description: "Search any recipe pf your choice here",
};

export default function RootLayout({ children }) {
  const queryClient = new QueryClient() 
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body >
          <Header />
          <main className="mt-[46px]">{children}</main>
        </body>
      </html>
    </QueryClientProvider>
  );
}
