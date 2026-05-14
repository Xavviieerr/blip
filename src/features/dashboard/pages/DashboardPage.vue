<template>
  <div class="flex h-screen overflow-hidden bg-[var(--bg-primary)]">
    <!-- Left Navigation: Modernized Sidebar -->
    <aside
      class="sidebar w-14 md:w-16 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col justify-between items-center py-5 flex-shrink-0 transition-all z-50"
    >
      <div class="flex flex-col items-center gap-6">
        <div class="logo-container">
          <div class="logo-box">
            <span class="logo-text">B</span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <button class="nav-btn active" title="Monitoring">
            <LayoutDashboard :size="18" />
          </button>
          <button class="nav-btn" title="Intelligence">
            <ShieldAlert :size="18" />
          </button>
          <button class="nav-btn" title="Topology">
            <Network :size="18" />
          </button>
          <button class="nav-btn" title="Nodes">
            <Server :size="18" />
          </button>
          <div class="nav-divider"></div>
          <button class="nav-btn" title="Logs">
            <Database :size="18" />
          </button>
        </nav>
      </div>

      <div class="flex flex-col items-center gap-4">
        <button class="nav-btn" title="Alerts History">
          <Bell :size="18" />
        </button>
        <button class="nav-btn" title="Settings">
          <Settings :size="18" />
        </button>
        <div class="profile-area">
          <div class="profile-avatar">AD</div>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col min-w-0">
      <DashboardHeader />

      <div class="flex-1 overflow-y-auto p-3 md:p-4 custom-scrollbar">
        <div class="max-w-[1400px] mx-auto flex flex-col gap-4">
          <FiltersPanel />

          <div class="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-3 items-start">
            <RealtimeControls />
            <div class="xl:h-full">
              <ConnectionStatus />
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
            <div class="flex flex-col gap-4 min-w-0">
              <MetricsGrid />
              <ChartsGrid />
            </div>

            <aside class="w-full lg:sticky lg:top-0 h-fit">
              <ActivityFeed />
            </aside>
          </div>
        </div>
      </div>
    </main>

    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import {
  LayoutDashboard,
  ShieldAlert,
  Network,
  Server,
  Database,
  Settings,
  Bell,
} from 'lucide-vue-next'
import DashboardHeader from '../components/DashboardHeader.vue'
import ToastContainer from '../../alerts/components/ToastContainer.vue'
import ConnectionStatus from '../../realtime/components/ConnectionStatus.vue'
import MetricsGrid from '../../analytics/components/MetricsGrid.vue'
import ChartsGrid from '../../charts/components/ChartsGrid.vue'
import ActivityFeed from '../../activity-feed/components/ActivityFeed.vue'
import RealtimeControls from '../../realtime/components/RealtimeControls.vue'
import FiltersPanel from '../../filters/components/FiltersPanel.vue'
import { useRealtimeSync } from '../../realtime/hooks/useRealtimeSync'

useRealtimeSync()
</script>

<style scoped>
.sidebar {
  box-shadow: 4px 0 24px -12px rgba(0, 0, 0, 0.2);
}

.logo-box {
  width: 32px;
  height: 32px;
  background: var(--primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 900;
  font-size: 18px;
  box-shadow: 0 4px 12px var(--primary-glow);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.nav-btn:hover {
  color: var(--text-primary);
  background: var(--card-hover);
}

.nav-btn.active {
  color: var(--primary);
  background: var(--primary-glow);
}

.nav-btn.active::after {
  content: '';
  position: absolute;
  left: -12px;
  width: 3px;
  height: 16px;
  background: var(--primary);
  border-radius: 0 4px 4px 0;
}

.nav-divider {
  height: 1px;
  width: 20px;
  background: var(--border-color);
  margin: 4px auto;
}

.profile-avatar {
  width: 28px;
  height: 28px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 800;
  color: var(--text-secondary);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 10px;
}
</style>
