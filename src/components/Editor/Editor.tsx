import { useEffect, useRef } from "react";
import classes from "./Editor.module.scss";

interface EditorProps {
  initialContent?: string;
  onContentSave: (content: string) => void;
  onCloseClick: () => void;
  focusOnMount?: boolean;
}

export default function Editor({
  initialContent = "",
  onContentSave,
  onCloseClick,
  focusOnMount = true,
}: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey) {
      onContentSave(textareaRef.current?.value || "");
    }
  };

  const onSaveClick = () => onContentSave(textareaRef.current?.value || "");

  useEffect(() => {
    textareaRef.current!.value = initialContent;

    if (focusOnMount) {
      textareaRef.current?.focus();
    }
  }, [focusOnMount, initialContent]);

  return (
    <div className={classes.editor}>
      <div className={classes.inputBlock}>
        <div className={classes.inputWrapper}>
          <button className={classes.closeButton} onClick={onCloseClick}>
            &times;
          </button>
          <textarea
            spellCheck
            ref={textareaRef}
            onKeyDown={handleKeyDown}
            placeholder="Write your diary entry here... "
          ></textarea>
        </div>
        <div className={classes.inputBlockBottom}>
          <span>Shift + Enter to submit</span>
          <button onClick={onSaveClick}>Save</button>
        </div>
      </div>
    </div>
  );
}
