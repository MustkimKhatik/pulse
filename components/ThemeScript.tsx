import Script from "next/script";

const THEME_INIT = `
(function () {
  try {
    var t = localStorage.getItem("pulse-theme");
    if (t === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (t !== "light") localStorage.setItem("pulse-theme", "light");
    }
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return (
    <Script id="pulse-theme-init" strategy="beforeInteractive">
      {THEME_INIT}
    </Script>
  );
}
