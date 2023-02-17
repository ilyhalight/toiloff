<script setup>
  import VisualLinksSection from '~/components/Sections/VisualLinksSection.vue';
  import socials from "~/data/socials.json";
  
  useHead({
    title: "Соц. сети · Toiloff",
    meta: [
      {
        name: "og:title",
        content: "Соц. сети - Toiloff"
      },
    ]
  });
</script>

<template>
  <main class="wrapper">
    <h1 class="text-attractive center">
      {{ $t('Social network') }}
    </h1>
    <h2 class="subtext-attractive center">
      {{ $t('On this page you can see some information about my social networks') }}.
    </h2>
    <visual-links-section :items="socials">
      <template #title>
        <h1 class="title text-gradient">{{ $t('Social network') }}</h1>
      </template>
      <template #subtitle>
        <p class="subtitle">{{ $t('Socials, Programming, Forums, Games and etc') }}.</p>
      </template>
    </visual-links-section>
  </main>
</template>
