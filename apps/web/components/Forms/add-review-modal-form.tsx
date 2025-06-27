"use client";
import { addProductReview } from "@/actions/product-review";
import { useForm, zodResolver } from "@repo/utils/hook-form";
import { addProductReviewSchema, TAddProductReviewValidation } from "@repo/utils/validations";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Label,
  Rating,
  Textarea,
} from "@ui/index";
import Image from "next/image";
import type React from "react";
import { useRef, useState, useTransition } from "react";
import { IoMdClose, IoMdCloudUpload } from "react-icons/io";
import { IoStarOutline } from "react-icons/io5";
import { toast } from "sonner";

const AddReviewModalForm = ({ productId }: { productId: number }) => {
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, startTransition] = useTransition();
  const form = useForm<TAddProductReviewValidation>({
    resolver: zodResolver(addProductReviewSchema),
    defaultValues: {
      productId: String(productId),
      description: "",
    },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Only allow up to 2 photos
    if (photos.length >= 2) {
      toast.info("You can only upload a maximum of 2 photos");
      return;
    }

    const file = files[0];

    if (!file) {
      toast.info("No file selected");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.info("Please upload only image files");
      return;
    }

    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.info("File size must be less than 5MB");
      return;
    }

    // Validate file extension
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      toast.info("Only JPG, PNG, and WebP files are supported");
      return;
    }

    setPhotos((prev) => [...prev, file]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (data: TAddProductReviewValidation) => {
    const formData = new FormData();

    // Append photos if they exist (up to 2 photos)
    if (photos.length > 0) {
      photos.forEach((photo) => {
        formData.append("files", photo);
      });
    }

    formData.append("rating", data.rating);
    formData.append("description", data.description);
    formData.append("productId", data.productId);

    startTransition(async () => {
      const response = await addProductReview(formData);
      if (response.success) {
        toast.success(response.message || "Review added successfully!");
        setOpen(false);
        form.reset();
      } else {
        toast.error(response.message || "Failed to add review!");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="space-x-1 border" variant="outline">
          <span>Give Review</span>
          <IoStarOutline size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="h-fit sm:max-w-[425px] lg:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IoStarOutline size={17} className="-mt-1" />
            <span>Write Review</span>
          </DialogTitle>
          <DialogDescription>Rate and review your purchased product.</DialogDescription>
        </DialogHeader>
        <hr />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Rate your experience <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Rating
                        defaultValue={field?.value?.toString() || "0"}
                        onChange={(v) => field.onChange(String(v))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Review Description */}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Your Review <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your experience with this product..."
                        className="bg-accent/30 min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Photo Upload */}
              <div className="space-y-1">
                <Label className="text-xs font-medium">Add Photos (Optional - Max 2)</Label>
                <div className="flex flex-wrap gap-4">
                  {/* Uploaded Photos */}
                  {photos.map((photo, index) => (
                    <div key={index} className="relative h-24 w-24 overflow-hidden rounded-md border">
                      <Image
                        src={URL.createObjectURL(photo) || "/placeholder.svg"}
                        alt={`Review photo ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white hover:bg-black"
                      >
                        <IoMdClose size={16} />
                      </button>
                    </div>
                  ))}

                  {/* Upload Button (only show if less than 2 photos) */}
                  {photos.length < 2 && (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-accent/30 flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 hover:bg-gray-100"
                    >
                      <IoMdCloudUpload className="h-8 w-8 text-gray-400" />
                      <span className="mt-1 text-xs text-gray-500">Upload</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">Supported formats: JPG, PNG. Max size: 5MB per image.</p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Submit Review
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewModalForm;
