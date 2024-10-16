import moment from "moment";
import { EntrySchema } from "../../types";
import classes from "./Entry.module.scss";
import { useRef, useState } from "react";
import classNames from "classnames";

interface EntryProps {
  entry: EntrySchema;
  onRemoveClick: () => void;
  onEditClick: () => void;
}

export default function Entry({
  entry: { content, created_at, updated_at },
  onRemoveClick,
  onEditClick,
}: EntryProps) {
  const [copied, setCopied] = useState(false);

  const contentRef = useRef<HTMLPreElement>(null);

  const copyEntryContent = () => {
    try {
      navigator.clipboard.writeText(contentRef.current!.innerHTML);
      setCopied(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <li className={classes.entry}>
      <header>
        <h4>{moment.utc(created_at).local().format("LLLL")}</h4>
      </header>
      <span className={classes.divider}></span>
      <pre ref={contentRef}>{content}</pre>
      <span className={classes.divider}></span>
      {updated_at ? (
        <span className={classes.updatedAt}>
          Updated at: {moment.utc(updated_at).local().format("LLLL")}
        </span>
      ) : null}
      <footer className={classes.entryFooter}>
        <div className={classes.buttons}>
          <button onClick={onRemoveClick} className={classes.deleteButton}>
            Remove entry
          </button>
          <button className={classes.editButton} onClick={onEditClick}>
            Edit entry
          </button>
          <button
            onClick={copyEntryContent}
            className={classNames(classes.copy, { [classes.copied]: copied })}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </footer>
    </li>
  );
}
