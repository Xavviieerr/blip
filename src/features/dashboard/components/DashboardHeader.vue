<template>
  <header class="header"> 
    <div class="header-center">
      <div class="status-pill">
        <div class="pulse-dot"></div>
        <span class="status-text">LIVE INTELLIGENCE STREAM</span>
      </div>
    </div>

    <div class="header-right">
      <div class="utility-actions">
        <button class="util-btn" title="System Health">
          <Activity :size="16" />
        </button>
        <div class="v-divider"></div>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Search, Activity } from 'lucide-vue-next'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
</script>

<style scoped>
.header {
  height: 52px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  flex: 1;
  display: flex;
  align-items: center;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 320px;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 10px;
  color: var(--text-muted);
}

.search-input-wrapper input {
  width: 100%;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 6px 40px 6px 32px;
  font-size: 11px;
  color: var(--text-primary);
  outline: none;
  transition: all 0.2s;
}

.search-input-wrapper input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.search-shortcut {
  position: absolute;
  right: 10px;
  font-size: 9px;
  font-weight: 700;
  color: var(--text-muted);
  background: var(--bg-secondary);
  padding: 2px 4px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.status-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(16, 185, 129, 0.05);
  padding: 4px 12px;
  border-radius: 99px;
  border: 1px solid rgba(16, 185, 129, 0.1);
}

.status-text {
  font-size: 9px;
  font-weight: 800;
  color: var(--success);
  letter-spacing: 0.1em;
}

.pulse-dot {
  width: 5px;
  height: 5px;
  background: var(--success);
  border-radius: 50%;
  position: relative;
}

.pulse-dot::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--success);
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(3.5); opacity: 0; }
}

.header-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.utility-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.util-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.util-btn:hover {
  color: var(--text-primary);
}

.v-divider {
  width: 1px;
  height: 16px;
  background: var(--border-color);
}

@media (max-width: 768px) {
  .search-area, .header-center { display: none; }
}
</style>
