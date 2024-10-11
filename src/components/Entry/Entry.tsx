import moment from "moment";
import { EntrySchema } from "../../types";

interface EntryProps {
  entry: EntrySchema;
  onRemoveClick: () => void;
}

export default function Entry({
  onRemoveClick,
  entry: { content, created_at },
}: EntryProps) {
  return (
    <li>
      <h4>{moment.utc(created_at).local().format("LLLL")}</h4>
      <pre>{content}</pre>
      <button onClick={onRemoveClick}>Remove entry</button>
    </li>
  );
}
