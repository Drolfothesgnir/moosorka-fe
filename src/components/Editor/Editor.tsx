import classes from "./Editor.module.scss";

interface EditorProps {
  content: string;
  onContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSaveCliked: () => void;
}

export default function Editor({
  content,
  onContentChange,
  onSaveCliked,
}: EditorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey) {
      onSaveCliked();
    }
  };
  return (
    <div className={classes.editor}>
      <div className={classes.inputBlock}>
        <textarea
          value={content}
          onChange={onContentChange}
          onKeyDown={handleKeyDown}
          placeholder="Write your diary entry here..."
        ></textarea>
        <button onClick={onSaveCliked}>Save</button>
      </div>
    </div>
  );
}
