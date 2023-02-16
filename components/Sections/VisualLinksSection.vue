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
    <slot name="title"/>
    <slot name="subtitle"/>
    <div class="visual-group" v-for="group of Object.entries(items)" :key="group[0]">
      <p class="visual-group-title">{{ $t(group[0]) }}</p>
      <div class="visual-items">
        <div class="visual-item" v-for="skill in group[1]" :key="skill.name">
          <Icon :name="skill.icon"/>
          <a :href="skill.href">{{ skill.name }}</a>
        </div>
      </div>
    </div>
  </section>
</template>