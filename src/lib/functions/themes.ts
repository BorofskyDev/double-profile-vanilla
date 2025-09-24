// src/lib/theme.ts
export type Theme = 'dark' | 'light'

const THEME_KEY = 'theme'
const root = document.documentElement
const mq = window.matchMedia('(prefers-color-scheme: dark)')

export const getStoredTheme = (): Theme | null => {
  try {
    return (localStorage.getItem(THEME_KEY) as Theme | null) ?? null
  } catch {
    return null
  }
}

export const storeTheme = (theme: Theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {}
}

export const clearStoredTheme = () => {
  try {
    localStorage.removeItem(THEME_KEY)
  } catch {}
}

export const detectPreferredTheme = (): Theme => (mq.matches ? 'dark' : 'light')

export const applyTheme = (theme: Theme) => {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark')
  } else {
    root.removeAttribute('data-theme')
  }
  // Keep native UI (form controls/scrollbars) aligned with theme
  root.style.colorScheme = theme
}

const updateToggleA11y = (btn: HTMLButtonElement, theme: Theme) => {
  const isDark = theme === 'dark'
  btn.setAttribute('aria-pressed', String(isDark))
  btn.setAttribute(
    'aria-label',
    isDark ? 'Switch to light mode' : 'Switch to dark mode'
  )
  btn.textContent = isDark ? 'Toggle Light' : 'Toggle Dark'
}

/**
 * Apply the initial theme as early as possible (stored -> system).
 * Returns the theme that was applied.
 */
export const applyInitialTheme = (): Theme => {
  const stored = getStoredTheme()
  const theme: Theme = stored ?? detectPreferredTheme()
  applyTheme(theme)
  return theme
}

/**
 * Wire up one or more toggle buttons.
 * - `selector` can match multiple buttons if you have a header/footer control.
 * - If no stored theme, we live-update on OS scheme changes.
 */
export const initThemeToggle = (selector = '#theme-toggle') => {
  const buttons = Array.from(
    document.querySelectorAll(selector)
  ) as HTMLButtonElement[]
  if (buttons.length === 0) return

  // Initialize button states to current theme
  const currentTheme = (
    root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  ) as Theme
  buttons.forEach((btn) => updateToggleA11y(btn, currentTheme))

  // Toggle behavior
  const handleClick = (e: Event) => {
    const btn = e.currentTarget as HTMLButtonElement
    const now = (
      root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    ) as Theme
    const next: Theme = now === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    storeTheme(next)
    buttons.forEach((b) => updateToggleA11y(b, next)) // keep multiple buttons in sync
  }

  buttons.forEach((btn) => btn.addEventListener('click', handleClick))

  // Follow OS only if user hasn’t chosen yet
  if (!getStoredTheme()) {
    mq.addEventListener('change', (e) => {
      const autoTheme: Theme = e.matches ? 'dark' : 'light'
      applyTheme(autoTheme)
      buttons.forEach((b) => updateToggleA11y(b, autoTheme))
    })
  }
}
