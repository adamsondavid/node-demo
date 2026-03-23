<script setup lang="ts">
import { useServer } from "@/client/composables/server";
import { onMounted, ref } from "vue";

const server = useServer();

const greeting = ref("loading...");

onMounted(async () => {
  const res = await server.greeting.$get({ query: { name: "VoMS" } });
  if (res.ok) {
    const data = await res.json();
    greeting.value = data.message;
  }
});
</script>

<template>
  <div>{{ greeting }}</div>
</template>
