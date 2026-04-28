import { createFileRoute } from "@tanstack/react-router";
import { QRGenerator } from "@/components/qr/QRGenerator";
import { QrCode } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "QR Code Generator with Logo" },
      { name: "description", content: "Convert any link into a beautiful QR code and add your custom logo." },
    ],
  }),
});

function Index() {
  return (
    <main
      className="min-h-screen px-4 py-12 md:py-20"
      style={{ background: "var(--gradient-subtle)" }}
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <div
            className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-primary-foreground"
            style={{ background: "var(--gradient-hero)" }}
          >
            <QrCode className="h-7 w-7" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            QR Code Generator
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Turn any link into a scannable QR code. Add your logo to make it yours.
          </p>
        </header>
        <QRGenerator />
      </div>
    </main>
  );
}
