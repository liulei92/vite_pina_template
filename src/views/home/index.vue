<template>
  <div> index </div>
</template>

<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import { defineComponent } from 'vue';
  import { hotMusic1 } from '@/apis/free';
  import { page_one_list } from '@/apis/common';

  export default defineComponent({
    name: 'Index',
    components: {},
    props: {},
    emits: [],
    setup() {
      page_one_list({ page: 0, limit: 10 });
      hotMusic1({ format: 'json' });
      return {};
    },
  });
</script>

<style lang="scss" scoped></style>
