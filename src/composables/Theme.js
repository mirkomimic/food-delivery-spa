import { useStore } from "@/store/store"
import { onMounted } from "vue"

export function useMyTheme() {

  const html = document.querySelector('html')
  const darkThemeClass = 'p-app-dark'
  const darkTheme = 'theme-dark'
  const lightTheme = 'theme-light'
  const store = useStore()

  function initializeTheme() {
    if (store.theme === lightTheme) {
      html.classList.remove(darkThemeClass)
    } else {
      html.classList.add(darkThemeClass)
    }
  }
  
  function toggleTheme() {
    if (store.theme === lightTheme) {
      store.theme = darkTheme
      html.classList.toggle(darkThemeClass)
    } else {
      store.theme = lightTheme
      html.classList.toggle(darkThemeClass)
    }
  }

  // onMounted(() => {
  //   initialize()
  // })
  
  
  return { toggleTheme, initializeTheme }
}