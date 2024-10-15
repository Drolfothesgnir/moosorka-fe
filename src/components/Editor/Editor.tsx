import { useEffect, useRef, useState } from "react";
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
  const [content, setContent] = useState(initialContent);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey) {
      onContentSave(content);
    }
  };

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onSaveClick = () => onContentSave(content);

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
            spellCheck
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
