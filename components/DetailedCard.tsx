import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DetailedCard() {
  return (
    <Card className="w-full max-w-164">
      <CardHeader>
        <CardTitle>Dettagli sulle Tasse</CardTitle>
        <CardDescription>
          Scheda con tutti i dati dettagliati sulle tasse.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          {/* DATI DI PARTENZA x3 */}
          <div className="space-y-2">
            <h4 className="text-base font-semibold text-foreground">
              Dati di Partenza
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="ral-detailed">RAL</Label>
                <Input
                  id="ral-detailed"
                  type="text"
                  placeholder="30000"
                  readOnly
                  aria-readonly="true"
                  className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="inps">INPS</Label>
                <Input
                  id="inps"
                  type="text"
                  placeholder="30000"
                  readOnly
                  aria-readonly="true"
                  className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="imponibile">Imponibile</Label>
                </div>
                <Input
                  id="imponibile"
                  type="text"
                  placeholder="1000"
                  readOnly
                  aria-readonly="true"
                  className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
                />
              </div>
            </div>
          </div>

          {/* IRPEF x3 */}
          <div className="space-y-2">
            <h4 className="text-base font-semibold text-foreground">
              Dettagli IRPEF
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="lordo">Lordo</Label>
                <Input
                  id="lordo"
                  type="text"
                  placeholder="30000"
                  readOnly
                  aria-readonly="true"
                  className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="detrazione">Detrazione</Label>
                <Input
                  id="detrazione"
                  type="text"
                  placeholder="30000"
                  readOnly
                  aria-readonly="true"
                  className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="netto">Netto</Label>
                </div>
                <Input
                  id="netto"
                  type="text"
                  placeholder="1000"
                  readOnly
                  aria-readonly="true"
                  className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
                />
              </div>
            </div>
          </div>

          {/* ADDIZIONALI x2 */}
          <div className="space-y-2">
            <h4 className="text-base font-semibold text-foreground">
              Addizionali
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="addizionali-regionali">
                    Addizionali Regionali
                  </Label>
                </div>
                <Input
                  id="addizionali-regionali"
                  type="text"
                  placeholder="3000"
                  readOnly
                  aria-readonly="true"
                  className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="addizionali-comunali">
                    Addizionali Comunali
                  </Label>
                </div>
                <Input
                  id="addizionali-comunali"
                  type="text"
                  placeholder="1000"
                  readOnly
                  aria-readonly="true"
                  className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
                />
              </div>
            </div>
          </div>

          {/* ALIQUOTE x3 */}
          <div className="space-y-2">
            <h4 className="text-base font-semibold text-foreground">
              Aliquote
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="aliquota-media-fiscale">
                  Aliquota Media Fiscale
                </Label>
                <Input
                  id="aliquota-media-fiscale"
                  type="text"
                  placeholder="30000"
                  readOnly
                  aria-readonly="true"
                  className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="aliquota-media-contributiva">
                  Aliquota Media Contributiva
                </Label>
                <Input
                  id="aliquota-media-contributiva"
                  type="text"
                  placeholder="30000"
                  readOnly
                  aria-readonly="true"
                  className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="aliquota-media-complessiva">
                  Aliquota Media Complessiva
                </Label>
                <Input
                  id="aliquota-media-complessiva"
                  type="text"
                  placeholder="30000"
                  readOnly
                  aria-readonly="true"
                  className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
                />
              </div>
            </div>
          </div>

          {/* RIASSUNTO x1 */}
          <div className="space-y-2">
            <h4 className="text-base font-semibold text-foreground">
              Riassunto
            </h4>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="totale-trattenute">Totale Trattenute</Label>
                <Input
                  id="totale-trattenute"
                  type="text"
                  placeholder="-"
                  readOnly
                  aria-readonly="true"
                  className="cursor-default caret-transparent focus-visible:ring-0 focus-visible:border-input"
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
