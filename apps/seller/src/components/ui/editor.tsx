"use client";
import JoditEditor, { IJoditEditorProps } from "jodit-react";
import { FC, useEffect, useMemo, useRef } from "react";

interface EditorProps {
  value: string;
  onChangeHandler: (value: string) => void;
  config?: IJoditEditorProps["config"];
  className?: string;
  disabled?: boolean;
}
const Editor: FC<EditorProps> = ({ value, onChangeHandler, className, disabled = false }) => {
  const ref = useRef(null);
  const config: IJoditEditorProps["config"] = useMemo(
    () => ({
      readonly: disabled,
      height: 400,
      toolbarButtonSize: "middle",
      buttons: ["bold", "italic", "underline", "link", "unlink", "source"],
      uploader: {
        insertImageAsBase64URI: true,
      },
      statusbar: false,
      className,
    }),
    [disabled, className]
  );

  const handleChange = (value: string) => {
    onChangeHandler(value);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <JoditEditor ref={ref} config={config} onBlur={handleChange} value={value} />
    </div>
  );
};

export default Editor;
