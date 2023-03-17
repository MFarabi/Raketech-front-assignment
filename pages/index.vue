<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card class="d-flex justify-center pa-3">
        <v-col>
          <h3 class="col-12">Movie Nerd</h3>
          <MovieSearchForm @submit="searchMovie" />
          <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
        </v-col>
      </v-card>
      <MovieCard v-if="movie" :movie="movie" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, useContext } from '@nuxtjs/composition-api';

import { storageGet, storageSet } from '~/services/cache';

import MovieSearchForm from '~/components/movie/movie-search-form.vue';
import MovieCard from '~/components/movie/movie-card.vue';

import { AMovie } from '~/types/movies/movie.type';
import SearchMovieEmitType from '~/types/movies/search-movie-emit.type';

const { $api } = useContext();
const { $toast } = useContext() as any;

const loading = ref(false);
const movie = ref<AMovie | null>(null);

const createQuery = (payload: SearchMovieEmitType) => {
  const parameters: string[] = [];
  if (typeof payload.year === 'number') parameters.push(`y=${payload.year}`);
  parameters.push(`type=${payload.movieType}`);
  parameters.push(`t=${payload.title}`);
  return parameters.join('&');
};

const searchMovie = async (payload: SearchMovieEmitType) => {
  loading.value = true;
  const query = createQuery(payload);
  const fromStorage = (await storageGet(query)) as string;

  if (fromStorage) {
    movie.value = JSON.parse(fromStorage);
    loading.value = false;
    return;
  }

  const result = await $api.$get<AMovie>(`/movies/find?${query}`);

  loading.value = false;
  if (!result.Error) {
    await storageSet(query, JSON.stringify(result));
    movie.value = result;
  } else {
    $toast.error(result.Error);
  }
};
</script>
