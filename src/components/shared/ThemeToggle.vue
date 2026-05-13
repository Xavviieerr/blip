<template>
  <button
    @click="theme.toggleTheme"
    class="theme-toggle"
    :class="{ 'is-dark': isDark }"
    :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
  >
    <div class="toggle-track">
      <div class="toggle-thumb">
        <div class="icon-container">
          <Sun v-if="!isDark" :size="14" stroke-width="3" />
          <Moon v-else :size="14" stroke-width="3" />
        </div>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '../../stores/theme.store'
import { Sun, Moon } from 'lucide-vue-next'

const theme = useThemeStore()
const isDark = computed(() => theme.theme === 'dark')
</script>

<style scoped>
.theme-toggle {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-toggle:hover {
  transform: scale(1.05);
}

.theme-toggle:active {
  transform: scale(0.95);
}

.toggle-track {
  width: 52px;
  height: 28px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 99px;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;
}

.theme-toggle.is-dark .toggle-track {
  border-color: var(--primary);
  background: rgba(139, 92, 246, 0.1);
}

.toggle-thumb {
  width: 22px;
  height: 22px;
  background: var(--card-bg);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform: translateX(0);
}

.theme-toggle.is-dark .toggle-thumb {
  transform: translateX(24px);
  background: var(--primary);
  color: white;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.theme-toggle.is-dark .icon-container {
  color: white;
}

@media (max-width: 640px) {
  .toggle-track {
    width: 44px;
    height: 24px;
  }
  .toggle-thumb {
    width: 18px;
    height: 18px;
  }
  .theme-toggle.is-dark .toggle-thumb {
    transform: translateX(20px);
  }
}
</style>
