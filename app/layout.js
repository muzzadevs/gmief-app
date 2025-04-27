import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "GMIEF",
  description: "Gestor de Ministerios de la Iglesia Evangélica Filadelfia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
