<script setup lang="ts">
import { useServer } from "@/client/composables/server";
import { onMounted, ref } from "vue";

const server = useServer();

const users = ref("loading...");

onMounted(async () => {
  const res = await server.users.getByUserName({ name: "Jan" });
  users.value = JSON.stringify(res, null, 2);
});
</script>

<template>
  <pre>{{ users }}</pre>
</template>
