import { useState } from "react";
import { UrlInput } from "./UrlInput";
import { LogoUpload } from "./LogoUpload";
import { QRPreview } from "./QRPreview";

export function QRGenerator() {
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState<string | null>(null);

  return (
    <div
      className="rounded-3xl border border-border bg-card p-6 md:p-10"
      style={{ boxShadow: "var(--shadow-glow)" }}
    >
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <UrlInput value={url} onChange={setUrl} />
          <LogoUpload logo={logo} onLogoChange={setLogo} />
        </div>
        <QRPreview url={url} logo={logo} />
      </div>
    </div>
  );
}