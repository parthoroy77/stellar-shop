"use client";
import type React from "react";
import { useRef, useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Textarea,
} from "@ui/index";
import Image from "next/image";
import { IoMdClose, IoMdCloudUpload } from "react-icons/io";
import { IoStar, IoStarOutline } from "react-icons/io5";

const AddReviewModalForm = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ rating?: string; description?: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: undefined }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Only allow up to 2 photos
    if (photos.length >= 2) {
      alert("You can only upload a maximum of 2 photos");
      return;
    }

    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotos((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const newErrors: { rating?: string; description?: string } = {};

    if (rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    if (!description.trim()) {
      newErrors.description = "Please provide a review description";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Here you would typically send the review data to your API
    console.log({
      rating,
      description,
      photos,
    });

    // Reset form and close modal
    setRating(0);
    setDescription("");
    setPhotos([]);
    setErrors({});
    setOpen(false);

    // Show success message
    alert("Thank you for your review!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="space-x-1 border" variant="outline">
          <span>Give Review</span>
          <IoStarOutline size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IoStarOutline size={17} className="-mt-1" />
            <span>Write Review</span>
          </DialogTitle>
          <DialogDescription>Rate and review your purchased product.</DialogDescription>
        </DialogHeader>
        <hr />

        <div className="space-y-6 py-4">
          {/* Star Rating */}
          <div className="space-y-2">
            <Label htmlFor="rating" className="text-sm font-medium">
              Rating <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="text-2xl text-yellow-400 transition-all duration-150 hover:scale-110"
                >
                  {star <= (hoveredRating || rating) ? (
                    <IoStar className="h-8 w-8" />
                  ) : (
                    <IoStarOutline className="h-8 w-8" />
                  )}
                </button>
              ))}
            </div>
            {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
          </div>

          {/* Review Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Your Review <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Share your experience with this product..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) {
                  setErrors((prev) => ({ ...prev, description: undefined }));
                }
              }}
              className="bg-accent/30 min-h-[120px]"
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Add Photos (Optional - Max 2)</Label>
            <div className="flex flex-wrap gap-4">
              {/* Uploaded Photos */}
              {photos.map((photo, index) => (
                <div key={index} className="relative h-24 w-24 overflow-hidden rounded-md border">
                  <Image
                    src={photo || "/placeholder.svg"}
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
          <Button onClick={handleSubmit} className="bg-primary">
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewModalForm;
