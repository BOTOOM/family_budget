"use client";

import { ReactElement } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function CustomDialog({
  title,
  children,
  setShowModal,
}: {
  title: string;
  children: ReactElement;
  setShowModal: Function;
}) {
  //   const path = usePathname().replace(`/${lng}`, "");

  return (
    <Dialog open onOpenChange={() => setShowModal(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
