import { Plugin } from '@nuxt/types';
// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import endpoint from '../endpoints.config';

declare module 'vue/types/vue' {
  // this.$api inside Vue components
  interface Vue {
    $api: NuxtAxiosInstance;
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$api inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $api: NuxtAxiosInstance;
  }
  // nuxtContext.$api
  interface Context {
    $api: NuxtAxiosInstance;
  }
}

declare module 'vuex/types/index' {
  // this.$api inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $api: NuxtAxiosInstance;
  }
}

const axiosPlugin: Plugin = (context, inject) => {
  const api = context.$axios.create({
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: endpoint.SERVER_API,
  });

  inject('api', api as NuxtAxiosInstance);
};

export default axiosPlugin;
