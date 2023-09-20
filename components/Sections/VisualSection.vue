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
    <h1 class="title center text-gradient">{{ $t('content.pages.about.skills.title') }}</h1>
    <p class="subtitle center">{{ $t('content.pages.about.skills.desc') }}</p>
    <div class="visual-group" v-for="group of Object.entries(items)" :key="group[0]">
      <p class="visual-group-title">{{ $t(group[0]) }}</p>
      <div class="visual-items">
        <div class="visual-item" v-for="visual in group[1]" :key="visual.name">
          <template v-if="visual.icon_type === 'local'">
            <nuxt-icon :name="visual.icon" />
          </template>
          <template v-else-if="visual.icon_type === 'local-color'">
            <nuxt-icon :name="visual.icon" filled/>
          </template>
          <template v-else>
            <Icon :name="visual.icon"/>
          </template>
          <p>{{ visual.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>