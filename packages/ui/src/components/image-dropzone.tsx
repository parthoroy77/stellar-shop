"use client";

import { cn } from "@ui/lib/utils";
import { ClassValue } from "class-variance-authority/types";
import { Upload, X } from "lucide-react";
import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";

interface FileWithPreview extends File {
  preview: string;
}

interface ImageDropzoneProps {
  onFilesChange: (files: FileWithPreview | FileWithPreview[] | null) => void;
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  maxSize?: number; // in bytes
  containerClassNames?: ClassValue;
}

export const ImageDropzone: FC<ImageDropzoneProps> = ({
  onFilesChange,
  multiple = false,
  maxFiles = 5,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  containerClassNames,
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  }, []);

  const handleFiles = useCallback(
    (fileList: FileList) => {
      const newFiles = Array.from(fileList)
        .filter((file) => file.type.startsWith("image/"))
        .filter((file) => file.size <= maxSize)
        .map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

      if (newFiles.length === 0) {
        setError("No valid image files selected");
        return;
      }

      setFiles((prevFiles) => {
        let updatedFiles: FileWithPreview[];
        if (multiple) {
          updatedFiles = [...prevFiles, ...newFiles].slice(0, maxFiles);
        } else {
          updatedFiles = [newFiles[0]!];
        }
        onFilesChange(multiple ? updatedFiles : updatedFiles[0]!);
        return updatedFiles;
      });
      setError(null);

      // Reset the input field to allow re-upload of same file
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [multiple, maxFiles, maxSize, onFilesChange]
  );

  const handleBrowse = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles]
  );

  const removeFile = useCallback(
    (fileToRemove: FileWithPreview) => {
      setFiles((prevFiles) => {
        const updatedFiles = prevFiles.filter((file) => file !== fileToRemove);
        onFilesChange(multiple ? updatedFiles : null);
        return updatedFiles;
      });
      URL.revokeObjectURL(fileToRemove.preview);

      // Reset the input field after removal
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [onFilesChange, multiple]
  );

  const fileCountText = useMemo(() => `${files.length} file${files.length !== 1 ? "s" : ""} selected`, [files.length]);

  return (
    <div>
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "rounded-lg border border-dashed p-4 transition-colors",
          isDragging ? "border-primary bg-accent" : "hover:border-primary border-gray-300",
          containerClassNames
        )}
      >
        <div className="space-y-3">
          {files.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {files.map((file, index) => (
                <div key={file.name + index} className={cn("group relative", !multiple && "col-span-3")}>
                  <img
                    src={file.preview}
                    alt={`Preview ${index + 1}`}
                    className="mx-auto h-24 w-fit rounded-md object-cover"
                    onLoad={() => URL.revokeObjectURL(file.preview)}
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(file)}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <Upload className="mx-auto size-8 text-gray-400" />
              <p className="text-accent-foreground text-xs">Drag and drop your images here.</p>
              <p className="text-xs text-gray-500">or</p>
            </div>
          )}
          <div className="flex justify-center">
            <Button type="button" variant={"accent"} onClick={handleBrowse} className="font-normal" size={"sm"}>
              {files.length > 0 && multiple ? "Add More Images" : "Browse Images"}
            </Button>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          name="file"
          accept={accept}
          onChange={handleFileInputChange}
          className="hidden"
          multiple={multiple}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">{fileCountText}</p>
          <ul className="mt-2 space-y-1">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between text-xs text-gray-500">
                <span className="max-w-[80%] truncate">{file.name}</span>
                <span>{(file.size / 1024).toFixed(1)} KB</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
