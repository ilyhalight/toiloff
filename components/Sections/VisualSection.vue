<script setup>
  const props = defineProps({
    items: {
      type: Object,
      required: true,
    },
  });

</script>

<template>
  <section class="visual-section" v-if="items">
    <h1 class="title center text-gradient">{{ $t('Skills') }}</h1>
    <p class="subtitle center">{{ $t('Databases and Algorithms, Frontend Development, Backend Development, Database Management') }}.</p>
    <div class="visual-group" v-for="group of Object.entries(items)" :key="group[0]">
      <p class="visual-group-title">{{ $t(group[0]) }}</p>
      <div class="visual-items">
        <div class="visual-item" v-for="visual in group[1]" :key="visual.name">
          <Icon :name="visual.icon"/>
          <p>{{ visual.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>