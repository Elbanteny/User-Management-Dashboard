import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Field {
  key: string;
  label: string;
  type?: "text" | "textarea" | "select" | "email" | "password" | "number";
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

interface EntityModalProps<T extends { id: string; name: string }> {
  title: string;
  description: string;
  fields: Field[];
  data: T | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: T) => void;
  confirmText?: string;
  confirmColor?: "blue" | "red";
}

export function EntityModal<T extends { id: string; name: string }>({
  title,
  description,
  fields,
  data,
  isOpen,
  onClose,
  onSave,
  confirmText = "Simpan Perubahan",
  confirmColor = "blue",
}: EntityModalProps<T>) {
  const [prevData, setPrevData] = useState<T | null>(data);
  const [formData, setFormData] = useState<T | null>(data);

  if (data !== prevData) {
    setPrevData(data);
    setFormData(data);
  }

  if (!formData) return null;

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value } as T);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-lg rounded-xl">
        <DialogHeader className="pb-2 border-b border-gray-100">
          <DialogTitle className="text-lg font-bold text-gray-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500 pt-1">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[65vh] overflow-y-auto px-1">
          {fields.map((field) => (
            <div key={field.key} className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  className="w-full h-9 rounded-md border border-gray-200 px-3 text-sm focus:outline-none focus:border-indigo-400 transition-colors bg-white"
                  value={String(formData[field.key as keyof T] ?? "")}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                >
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-indigo-400 transition-colors"
                  value={String(formData[field.key as keyof T] ?? "")}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
        <DialogFooter className="pt-3 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button
            variant="secondary"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Batal
          </Button>
          <Button
            variant={confirmColor === "red" ? "destructive" : "default"}
            onClick={() => {
              onSave(formData);
              onClose();
            }}
            className="w-full sm:w-auto"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
