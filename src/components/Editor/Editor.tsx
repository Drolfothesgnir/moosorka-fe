import { useEffect, useRef } from "react";
import classes from "./Editor.module.scss";

interface EditorProps {
  content: string;
  onContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSaveClick: () => void;
  onCloseClick: () => void;
  focusOnMount?: boolean;
}

export default function Editor({
  content,
  onContentChange,
  onSaveClick,
  onCloseClick,
  focusOnMount = true,
}: EditorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey) {
      onSaveClick();
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (focusOnMount) {
      textareaRef.current?.focus();
    }
  }, [focusOnMount]);

  return (
    <div className={classes.editor}>
      <div className={classes.inputBlock}>
        <div className={classes.inputWrapper}>
          <button className={classes.closeButton} onClick={onCloseClick}>
            &times;
          </button>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={onContentChange}
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
