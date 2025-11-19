import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  type DialogContentProps,
} from "@/components/animate-ui/components/radix/dialog";

interface DialogsProps {
  from: DialogContentProps["from"];
  showCloseButton: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ContextDialog({
  from,
  showCloseButton,
  open,
  onOpenChange,
}: DialogsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent
          from={from}
          showCloseButton={showCloseButton}
          className="sm:max-w-[700px]"
        >
          <DialogHeader>
            <DialogTitle>Contesto e Assunzioni</DialogTitle>
            <DialogDescription>
              Elenco delle semplificazioni e assunzioni per il calcolo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid">
              {/* <Label htmlFor="name-1">Name</Label> */}• Lavoratore
              dipendente, impiegato a tempo indeterminato nel settore privato.{" "}
              <br />
              • Residente a Milano.
              <br />
              • Nessuna agevolazione particolare.
              <br />
              • L&apos;unico reddito percepito è il RAL inserito.
              <br />• Rapporto di lavoro per tutto l&apos;anno.
              <br />• 13 mensilità considerate.
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
