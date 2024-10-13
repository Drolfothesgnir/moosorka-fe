import classes from "./NewEntry.module.scss";

interface NewEntryProps {
  onCLick: () => void;
}

export default function NewEntry({ onCLick }: NewEntryProps) {
  return (
    <div className={classes.newEntry}>
      <button onClick={onCLick}>New Entry</button>
    </div>
  );
}
