// Runs before hydration (inlined in <head>) so the saved theme applies without a flash.
export const themeBootScript = `(function(){try{var t=localStorage.getItem('servee-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`

export function toggleTheme() {
  const dark = document.documentElement.classList.toggle('dark')
  localStorage.setItem('servee-theme', dark ? 'dark' : 'light')
  return dark
}

export function isDark() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
}
