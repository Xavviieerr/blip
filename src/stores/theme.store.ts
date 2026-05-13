import { defineStore } from 'pinia'

import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<'dark' | 'light'>('dark')

  // Apply theme immediately on store creation
  document.documentElement.setAttribute('data-theme', theme.value)

  watch(theme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
  })

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme,

    toggleTheme,
  }
})
