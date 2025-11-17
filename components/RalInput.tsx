import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RALInput() {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="email">RAL</Label>
      <Input type="text" id="ral" placeholder="Inserisci RAL" />
    </div>
  );
}
