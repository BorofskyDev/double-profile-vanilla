import { applyInitialTheme, initThemeToggle } from './lib';
import './styles/globals.scss'

applyInitialTheme();                 // sets theme before UI mounts
window.addEventListener('DOMContentLoaded', () => {
  initThemeToggle('#theme-toggle');  // or a class if you have multiple
});
