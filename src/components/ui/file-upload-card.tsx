"use client";

import * as React from "react";
import { UploadCloud, X, CheckCircle2, Trash2, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export interface UploadedFile {
  id: string;
  file: File;
  progress: number; // 0-100
  status: "uploading" | "completed" | "error";
  previewUrl?: string; // NUEVO: URL para la previsualización de la imagen
}

interface FileUploadCardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDragStart"
  | "onDragEnd"
  | "onDrag"
> {
  files: UploadedFile[];
  onFilesChange: (files: File[]) => void;
  onFileRemove: (id: string) => void;
  onClose?: () => void;
}

export const FileUploadCard = React.forwardRef<HTMLDivElement, FileUploadCardProps>(
  ({ className, files = [], onFilesChange, onFileRemove, onClose, ...props }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files)
        .filter((f) => f.type.startsWith("image/"))
        .slice(0, 1);

      if (droppedFiles && droppedFiles.length > 0) {
        onFilesChange(droppedFiles);
      }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || [])
        .filter((f) => f.type.startsWith("image/"))
        .slice(0, 1);

      if (selectedFiles.length > 0) {
        onFilesChange(selectedFiles);
      }

      if (e.target) {
        e.target.value = "";
      }
    };

    const triggerFileSelect = () => fileInputRef.current?.click();

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 KB";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    const fileItemVariants = {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    };

    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        className={cn(
          "w-full max-w-lg bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden",
          className,
        )}
        {...props}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100">
                <ImageIcon className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Subir imagen</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Sube una foto de tu carta o un pantallazo.
                </p>
              </div>
            </div>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-10 h-10 bg-gray-50 hover:bg-gray-100"
                onClick={onClose}
              >
                <X className="w-5 h-5 text-gray-600" />
              </Button>
            )}
          </div>

          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
            className={cn(
              "border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors duration-200 cursor-pointer",
              isDragging
                ? "border-[#34d399] bg-emerald-50"
                : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50",
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
            <p className="font-semibold text-gray-700 text-lg">Toca aquí para elegir tu foto</p>
            <p className="text-sm text-gray-400 mt-2">(Solo aceptamos imágenes: JPEG, PNG)</p>
            <Button variant="outline" className="mt-6 pointer-events-none rounded-xl font-medium">
              Buscar en galería
            </Button>
          </div>
        </div>

        {files.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <ul className="space-y-4">
              <AnimatePresence>
                {files.map((file) => (
                  <motion.li
                    key={file.id}
                    variants={fileItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    layout
                    /* CORRECCIÓN: flex, gap-4, y min-w-0 interno para que no se desborde */
                    className="flex items-center gap-4 bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100"
                  >
                    {/* NUEVO: Contenedor de la miniatura */}
                    <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                      {file.previewUrl ? (
                        <img
                          src={file.previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-bold text-gray-400">IMG</span>
                      )}
                    </div>

                    {/* Contenedor del texto (min-w-0 fuerza a que el truncate funcione) */}
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-gray-900 truncate">
                        {file.file.name}
                      </p>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        {file.status === "uploading" && (
                          <span>
                            {formatFileSize((file.file.size * file.progress) / 100)} /{" "}
                            {formatFileSize(file.file.size)}
                          </span>
                        )}
                        {file.status === "completed" && (
                          <span>{formatFileSize(file.file.size)}</span>
                        )}
                        <span className="text-gray-300">•</span>
                        <span
                          className={cn(
                            { "text-[#34d399] font-medium": file.status === "uploading" },
                            { "text-emerald-600 font-medium": file.status === "completed" },
                          )}
                        >
                          {file.status === "uploading" ? `Subiendo...` : "¡Listo!"}
                        </span>
                      </div>
                      {file.status === "uploading" && (
                        <Progress value={file.progress} className="h-2 mt-2 bg-gray-100" />
                      )}
                    </div>

                    {/* Botones de acción alineados a la derecha */}
                    <div className="flex items-center gap-1 shrink-0">
                      {file.status === "completed" && (
                        <CheckCircle2 className="w-6 h-6 text-[#34d399] mr-1 hidden sm:block" />
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full w-10 h-10 hover:bg-red-50 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          onFileRemove(file.id);
                        }}
                      >
                        {file.status === "completed" ? (
                          <Trash2 className="w-5 h-5" />
                        ) : (
                          <X className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        )}
      </motion.div>
    );
  },
);
FileUploadCard.displayName = "FileUploadCard";
