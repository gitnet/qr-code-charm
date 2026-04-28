import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link2 } from "lucide-react";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function UrlInput({ value, onChange }: UrlInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="url" className="text-sm font-medium">
        Enter a link
      </Label>
      <div className="relative">
        <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 h-12"
        />
      </div>
    </div>
  );
}