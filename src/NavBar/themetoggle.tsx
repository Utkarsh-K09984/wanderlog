import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "../components/ui/switch";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
      className="data-[state=checked]:bg-primary"
      aria-label="Toggle theme"
    />
  );
};

export default ThemeToggle;
