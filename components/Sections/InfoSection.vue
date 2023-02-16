<script setup>
  const props = defineProps({
    items: {
      type: Array,
      required: true,
    },
  });

</script>

<template>
  <section class="info-section" v-if="items.length">
    <div class="info-column" v-for="item in items" :key="item[0].id">
      <div class="info-group" v-for="info in item" :key="info.id">
        <Icon class="big-icon" :name="info.icon" />
        <div class="info-text-group">
          <p class="info-text">{{ $t(info.name) }}:</p>
          <p class="info-text">{{ $t(info.value) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>