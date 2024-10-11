import classes from "./Main.module.scss";

interface MainProps {
  children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
  return <main className={classes.main}>{children}</main>;
}
