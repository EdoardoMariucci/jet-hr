"use client";

import React from "react";
import { InfoDock } from "@/components/Dock";
import ContextDialog from "@/components/Dialogs/ContextDialog";
import LegislationDialog from "@/components/Dialogs/LegislationDialog";

type OpenDialog = null | "context" | "legislation";

export default function DialogController() {
  const [open, setOpen] = React.useState<OpenDialog>(null);

  return (
    <>
      <InfoDock
        onOpenContext={() => setOpen("context")}
        onOpenLegislation={() => setOpen("legislation")}
      />
      <ContextDialog
        from="bottom"
        showCloseButton
        open={open === "context"}
        onOpenChange={(v) => setOpen(v ? "context" : null)}
      />
      <LegislationDialog
        from="bottom"
        showCloseButton
        open={open === "legislation"}
        onOpenChange={(v) => setOpen(v ? "legislation" : null)}
      />
    </>
  );
}
