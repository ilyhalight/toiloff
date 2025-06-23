<script setup>
  import VisualLinksSection from '~/components/Sections/VisualLinksSection.vue';
  import DecryptButton from '~/components/Buttons/DecryptButton.vue';
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
      {{ $t('content.pages.social.desc') }}
    </h2>
    <decrypt-button/>
  </main>
</template>
