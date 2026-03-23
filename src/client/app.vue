<script setup lang="ts">
import { useServer } from "@/client/composables/server";
import { onMounted, ref } from "vue";

const server = useServer();

const greeting = ref("loading...");

onMounted(async () => {
  const res = await server.users[":userName"].$get({ param: { userName: "Jan" } });
  if (res.ok) {
    const data = await res.json();
    greeting.value = JSON.stringify(data, null, 2);
  }
});
</script>

<template>
  <pre>{{ greeting }}</pre>
</template>
