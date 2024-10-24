import {
  ComponentPropsWithoutRef,
  memo,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import recontextualize from "recontextual";

interface DarkModeContext {
  isDarkMode: boolean;
  toggle: () => void;
}

const [Provider, useDarkMode] = recontextualize<DarkModeContext>();

function DarkModeProvider({ children }: PropsWithChildren) {
  const [isDarkMode, setDarkMode] = useState(false);
  const toggle = useCallback(() => setDarkMode((v) => !v), []);
  const contextValue = { isDarkMode, toggle };
  return <Provider value={contextValue}>{children}</Provider>;
}

function Button({
  children,
  ...rest
}: PropsWithChildren<ComponentPropsWithoutRef<"button">>) {
  const isDarkMode = useDarkMode((ctx) => ctx.isDarkMode);
  return (
    <button
      style={{
        backgroundColor: isDarkMode ? "#333" : "#ccc",
        border: "1px solid",
        color: "inherit",
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

function ToggleButton() {
  const toggle = useDarkMode((ctx) => ctx.toggle);
  return <Button onClick={toggle}>Toggle mode</Button>;
}

const Header = memo(function Header() {
  return (
    <header
      style={{
        padding: "10px 5px",
        borderBottom: "1px solid",
        marginBottom: "10px",
        display: "flex",
        gap: "5px",
        justifyContent: "flex-end",
      }}
    >
      <Button>Products</Button>
      <Button>Services</Button>
      <Button>Pricing</Button>
      <ToggleButton />
    </header>
  );
});

function Main() {
  const isDarkMode = useDarkMode((ctx) => ctx.isDarkMode);
  return (
    <main
      style={{
        color: isDarkMode ? "white" : "black",
        backgroundColor: isDarkMode ? "black" : "white",
        margin: "-8px",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Header />
      <h1>Welcome to our business site!!!</h1>
    </main>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <Main />
    </DarkModeProvider>
  );
}

export default App;
