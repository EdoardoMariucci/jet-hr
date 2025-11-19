import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  type DialogContentProps,
} from "@/components/animate-ui/components/radix/dialog";
import { Label } from "@/components/ui/label";

interface LegislationDialogProps {
  from: DialogContentProps["from"];
  showCloseButton: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function LegislationDialog({
  from,
  showCloseButton,
  open,
  onOpenChange,
}: LegislationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent
          from={from}
          showCloseButton={showCloseButton}
          className="sm:max-w-[700px]"
        >
          <DialogHeader>
            <DialogTitle>Normative Considerate</DialogTitle>
            <DialogDescription>
              Elenco delle normative e degli scaglioni considerati per il
              calcolo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid">
              <Label htmlFor="INPS" className="font-semibold">
                INPS
              </Label>
              • 9,19% della RAL.
              <Label htmlFor="IRPEF" className="font-semibold pt-8">
                Scaglioni IRPEF
              </Label>
              • 0 - 28.000€ → 23%
              <br />
              • 28.000,01 - 50.000€ → 35%
              <br />• 50.000,01€ + → 43%
              <Label htmlFor="Detrazione" className="font-semibold pt-8">
                Detrazioni per lavoro dipendente
              </Label>
              • 0 - 15.000€
              <br />
              • 15.000,01 - 28.000€
              <br />
              • 28.000,01 - 50.000€
              <br />
              • 50.000€ +
              <br />• Bonus 65€ → 25.000 - 35.000€
              <Label htmlFor="Regionali" className="font-semibold pt-8">
                Scaglioni Regione Lombardia
              </Label>
              • 0 - 15.000 € → 1,23%
              <br />
              • 15.000,01 - 28.000 € → 1,58%
              <br />
              • 28.000,01 - 50.000 € → 1,72%
              <br />• 50.000,01€ + → 1,73%
              <Label htmlFor="Comunali" className="font-semibold pt-8">
                Scaglioni Comune di Milano
              </Label>
              • 0 - 23.000€ → 0%
              <br />• 23.000,01€ + → 0,8%
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
