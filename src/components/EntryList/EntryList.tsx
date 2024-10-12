import { EntrySchema } from "../../types";
import Entry from "../Entry/Entry";
import classes from "./EntryList.module.scss";

interface EntryListProps {
  entries: EntrySchema[];
  onRemoveClick: (id: number) => void;
}

export default function EntryList({ entries, onRemoveClick }: EntryListProps) {
  return (
    <ul className={classes.entryList}>
      {entries.map((entry) => (
        <Entry
          key={entry.id}
          entry={entry}
          onRemoveClick={() => onRemoveClick(entry.id)}
        />
      ))}
    </ul>
  );
}
