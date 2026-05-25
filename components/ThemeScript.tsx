export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem('pulse-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
