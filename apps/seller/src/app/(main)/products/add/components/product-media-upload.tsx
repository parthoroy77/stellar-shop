import { FileWithPreview, FormField, FormItem, FormMessage, ImageDropzone } from "@ui/index";
import { useCallback } from "react";

// TODO: define form type later

/**
 * media schema will be
 * images[]
 */

const ProductMediaUpload = ({ form }: { form: any }) => {
  const handleFilesChange = useCallback(
    (files: FileWithPreview[] | FileWithPreview | null) => {
      if (files) {
        const newFiles = Array.isArray(files) ? files : [files];
        form.setValue("productImages", newFiles);
      }
    },
    [form]
  );
  return (
    <div>
      <h3 className="text-lg">Product Media Upload</h3>

      <FormField
        control={form.control}
        name="productImages"
        render={() => (
          <FormItem>
            <ImageDropzone
              containerClassName="min-h-[300px]"
              placeholder="Upload product media"
              onFilesChange={handleFilesChange}
              multiple
              maxFiles={5}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductMediaUpload;
