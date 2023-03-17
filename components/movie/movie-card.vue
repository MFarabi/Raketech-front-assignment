<template>
  <v-card class="mt-3 pa-3">
    <v-col class="col-12">
      <template v-for="(key, index) in Object.keys(movie)">
        <p v-if="movie[key] !== noData" :key="index">{{ key }}: {{ movie[key] }}</p>
      </template>
    </v-col>
  </v-card>
</template>

<script lang="ts" setup>
import { AMovie } from '~/types/movies/movie.type';

defineProps<{ movie: AMovie }>();

const noData = 'N/A';
</script>
