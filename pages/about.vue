<script setup>
  import InfoSection from '~/components/Sections/InfoSection.vue';
  import VisualSection from '~/components/Sections/VisualSection.vue';
  import about from "~/data/about.json";
  import skills from "~/data/skills.json";
  import getTitle from '~/utils/title.js';

  const { t } = useI18n();
  const title = computed(() => getTitle(t('pages.about')));

  useSeoMeta({
    title: title,
    ogTitle: title,
  });

  useSchemaOrg([
    defineWebPage({
      name: title
    }),
  ]);
</script>

<template>
  <main class="wrapper">
    <h1 class="text-attractive center">
      {{ $t('content.pages.about.title') }}
    </h1>
    <h2 class="subtext-attractive center">
      {{ $t('content.pages.about.desc') }}
    </h2>
    <info-section :items="about"/>
    <visual-section :items="skills"/>
  </main>
</template>
