<script setup>
  import VisualLinksSection from '~/components/Sections/VisualLinksSection.vue';
  import socials from "~/data/socials.json";
  import getTitle from '~/utils/title.js';

  const { t } = useI18n();
  const title = computed(() => getTitle(t('pages.social')));

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
      {{ $t('content.pages.social.title') }}
    </h1>
    <h2 class="subtext-attractive center">
      {{ $t('content.pages.social.desc') }}.
    </h2>
    <visual-links-section :items="socials">
      <template #title>
        <h1 class="title center text-gradient">{{ $t('content.pages.social.links.title') }}</h1>
      </template>
      <template #subtitle>
        <p class="subtitle center">{{ $t('content.pages.social.links.desc') }}.</p>
      </template>
    </visual-links-section>
  </main>
</template>
