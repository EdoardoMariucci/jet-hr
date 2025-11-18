import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RecapCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Netto Annuale e Mensile</CardTitle>
        <CardDescription>Mi sa che ti conviene trasferirti!</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="netto-annuale">Netto Annuale</Label>
              <Input
                id="netto-annuale"
                type="text"
                placeholder="30000"
                readOnly
                aria-readonly="true"
                className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="netto-mensile">Netto Mensile</Label>
              </div>
              <Input
                id="netto-mensile"
                type="text"
                placeholder="1000"
                readOnly
                aria-readonly="true"
                className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="totale-tasse">Totale Tasse</Label>
              </div>
              <Input
                id="totale-tasse"
                type="text"
                placeholder="3000"
                readOnly
                aria-readonly="true"
                className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="contributi-inps">Contributi INPS</Label>
              </div>
              <Input
                id="contributi-inps"
                type="text"
                placeholder="1000"
                readOnly
                aria-readonly="true"
                className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
