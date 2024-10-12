import moment from "moment";
import { EntrySchema } from "../../types";
import classes from "./Entry.module.scss";

interface EntryProps {
  entry: EntrySchema;
  onRemoveClick: () => void;
  onEditClick: () => void;
}

export default function Entry({
  entry: { content, created_at },
  onRemoveClick,
  onEditClick,
}: EntryProps) {
  return (
    <li className={classes.entry}>
      <h4>{moment.utc(created_at).local().format("LLLL")}</h4>
      <span className={classes.divider}></span>
      <pre>{content}</pre>
      <span className={classes.divider}></span>
      <div className={classes.buttons}>
        <button onClick={onRemoveClick} className={classes.deleteButton}>
          Remove entry
        </button>
        <button className={classes.editButton} onClick={onEditClick}>
          Edit entry
        </button>
      </div>
    </li>
  );
}
