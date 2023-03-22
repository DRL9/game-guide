<script setup lang="ts">
import router from '@/router/index'
import { readonly } from 'vue'
const routes = readonly(router.options.routes)
</script>

<template>
  <main>
    <ul>
      <li v-for="route in routes" :key="route.name">
        <RouterLink :to="route.path">{{ route?.meta?.title }}</RouterLink>
      </li>
    </ul>
  </main>
</template>
