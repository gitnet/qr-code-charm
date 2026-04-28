import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Download, QrCode } from "lucide-react";

interface QRPreviewProps {
  url: string;
  logo: string | null;
}

export function QRPreview({ url, logo }: QRPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!url) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      setReady(false);
      return;
    }

    QRCode.toCanvas(canvas, url, {
      width: 480,
      margin: 2,
      errorCorrectionLevel: "H",
      color: { dark: "#1a1033", light: "#ffffff" },
    })
      .then(() => {
        if (logo) {
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            const size = canvas.width * 0.22;
            const x = (canvas.width - size) / 2;
            const y = (canvas.height - size) / 2;
            const pad = size * 0.12;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(x - pad, y - pad, size + pad * 2, size + pad * 2);
            ctx.drawImage(img, x, y, size, size);
            setReady(true);
          };
          img.src = logo;
        } else {
          setReady(true);
        }
      })
      .catch(() => setReady(false));
  }, [url, logo]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative aspect-square w-full max-w-sm rounded-2xl border border-border bg-card p-4 flex items-center justify-center"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {url ? (
          <canvas ref={canvasRef} className="h-full w-full rounded-lg" />
        ) : (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <QrCode className="h-16 w-16 opacity-30" />
            <p className="text-sm">Your QR code will appear here</p>
          </div>
        )}
      </div>
      <Button
        onClick={handleDownload}
        disabled={!ready}
        size="lg"
        className="w-full max-w-sm h-12"
        style={ready ? { background: "var(--gradient-hero)" } : undefined}
      >
        <Download className="mr-2 h-4 w-4" />
        Download PNG
      </Button>
    </div>
  );
}