<template>
  <v-app >
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
export default defineComponent({
  name: 'DefaultLayout',

  setup() {
    const clipped = ref<boolean>(false);
    const title = ref<string>('Raketech Assignment');
    return {
      clipped,
      title,
    };
  },
});
</script>
