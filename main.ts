import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { streamService } from './features/realtime/services/stream.service'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')

streamService.start()
