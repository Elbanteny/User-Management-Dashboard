import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";

export interface Field {
  key: string;
  label: string;
  type?: "text" | "textarea" | "select" | "email" | "password" | "number";
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface CreateModalProps {
  title: string;
  description: string;
  fields: Field[];
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: Record<string, string>) => void;
  isSubmitting?: boolean;
  submitText?: string;
  cancelText?: string;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  title,
  description,
  fields,
  isOpen,
  onClose,
  onCreate,
  isSubmitting = false,
  submitText = "Buat",
  cancelText = "Batal",
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleClose = () => {
    setFormData({});
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-lg rounded-xl">
        <DialogHeader className="pb-2 border-b border-gray-100">
          <DialogTitle className="text-lg font-bold text-gray-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500 pt-1">
            {description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 max-h-[65vh] overflow-y-auto px-1">
            {fields.map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                  {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === "select" ? (
                  <select
                    className="w-full h-9 rounded-md border border-gray-200 px-3 text-sm focus:outline-none focus:border-indigo-400 transition-colors bg-white"
                    value={formData[field.key] ?? ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    required={field.required}
                  >
                    <option value="">Pilih {field.label}</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <Textarea
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-indigo-400 transition-colors"
                    value={formData[field.key] ?? ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    required={field.required}
                    placeholder={
                      field.placeholder ||
                      `Masukkan ${field.label.toLowerCase()}`
                    }
                  />
                ) : (
                  <Input
                    type={field.type || "text"}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-indigo-400 transition-colors"
                    value={formData[field.key] ?? ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    required={field.required}
                    placeholder={
                      field.placeholder ||
                      `Masukkan ${field.label.toLowerCase()}`
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter className="pt-3 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              className="w-full sm:w-auto"
            >
              {cancelText}
            </Button>
            <Button
              type="submit"
              variant="default"
              isLoading={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Menyimpan..." : submitText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
