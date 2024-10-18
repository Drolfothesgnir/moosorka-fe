import classes from "./Main.module.scss";

interface MainProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export default function Main({ children, ...containerProps }: MainProps) {
  return (
    <main className={classes.main} {...containerProps}>
      {children}
    </main>
  );
}
