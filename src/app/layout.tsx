import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard de Análise Jurídica",
  description: "Sistema de análise e monitoramento de processos jurídicos trabalhistas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased font-sans text-slate-900">
        {children}
      </body>
    </html>
  );
}
