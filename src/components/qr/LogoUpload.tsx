import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";

interface LogoUploadProps {
  logo: string | null;
  onLogoChange: (logo: string | null) => void;
}

export function LogoUpload({ logo, onLogoChange }: LogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => onLogoChange(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Logo (optional)</Label>
      <div className="flex items-center gap-3">
        {logo ? (
          <div className="relative h-12 w-12 rounded-lg border border-border overflow-hidden bg-muted flex items-center justify-center">
            <img src={logo} alt="Logo preview" className="h-full w-full object-contain" />
            <button
              onClick={() => onLogoChange(null)}
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              aria-label="Remove logo"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : null}
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          className="h-12 flex-1"
        >
          <Upload className="mr-2 h-4 w-4" />
          {logo ? "Change logo" : "Upload logo"}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
    </div>
  );
}