<template>
  <v-form ref="form" v-model="formIsValid" @submit.prevent="searchMovie">
    <v-row align="center" justify="center">
      <v-text-field
        v-model="title"
        placeholder="Title"
        :rules="movieTitleValidator"
        dense
        single-line
        class="px-3 col-sm-12 col-md-3"
      ></v-text-field>
      <v-text-field
        v-model.number="year"
        dense
        :rules="yearValidator"
        single-line
        class="px-3 col-sm-12 col-md-3"
        :placeholder="new Date().getFullYear().toString()"
      ></v-text-field>
      <v-select v-model="movieType" :items="Object.keys(MovieTypeEnum)" label="Movie type" solo class="px-3 col-sm-12 col-md-3"></v-select>
      <v-btn class="px-3 mb-auto py-6" type="submit">Search</v-btn>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { useContext } from '@nuxtjs/composition-api';

import yearValidator from '~/validators/year-validator';
import movieTitleValidator from '~/validators/movie-title-validator';
import MovieTypeEnum from '~/types/movies/move-type.enum';
import SearchMovieEmitType from '~/types/movies/search-movie-emit.type';

const { $toast } = useContext() as any;

const year = ref<number | string>(new Date().getFullYear().toString());
const movieType = ref(MovieTypeEnum.movie);
const title = ref('');
const form = ref(null);
const formIsValid = ref(false);

const emit = defineEmits<{ (e: 'submit', payload: SearchMovieEmitType): void }>();

const searchMovie = () => {
  // @ts-ignore
  if (!form.value!.validate()) {
    $toast.error('Check inputs');
    return;
  }
  emit('submit', { year: +year.value, movieType: movieType.value, title: title.value });
};
</script>
