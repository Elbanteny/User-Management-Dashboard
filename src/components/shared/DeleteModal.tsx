import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteModalProps {
  title: string;
  description: string;
  itemName?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  description,
  itemName,
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-white border-0 shadow-lg rounded-xl">
        <DialogHeader className="pb-2 border-b border-gray-100">
          <DialogTitle className="text-red-600 font-bold text-lg">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 pt-1">
            {description}{" "}
            {itemName && (
              <span className="font-semibold text-gray-900">{itemName}</span>
            )}
            ? Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button
            variant="secondary"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full sm:w-auto"
          >
            Konfirmasi Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
