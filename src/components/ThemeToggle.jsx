import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('safirax_theme');
      return saved === 'dark';
    } catch { return false; }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    try { localStorage.setItem('safirax_theme', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);

  return (
    <button className="theme-toggle" onClick={() => setDark(!dark)}>
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
