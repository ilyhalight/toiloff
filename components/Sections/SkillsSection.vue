<script setup>
  const props = defineProps({
    items: {
      type: Object,
      required: true,
    },
  });

</script>

<template>
  <section class="skills-section" v-if="items">
    <h1 class="title text-gradient">{{ $t('Skills') }}</h1>
    <p class="subtitle">{{ $t('Databases and Algorithms, Frontend Development, Backend Development, Database Management') }}.</p>
    <div class="skills-group" v-for="group of Object.entries(items)" :key="group[0]">
      <p class="section-group-title">{{ $t(group[0]) }}</p>
      <div class="skills-items">
        <div class="skill-item" v-for="skill in group[1]" :key="skill.name">
          <Icon :name="skill.icon"/>
          <p>{{ skill.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>