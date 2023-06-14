<script setup>
  import InfoSection from '~/components/Sections/InfoSection.vue';
  import VisualSection from '~/components/Sections/VisualSection.vue';
  import about from "~/data/about.json";
  import skills from "~/data/skills.json";

  useHead({
    title: "Обо мне · Toiloff",
    meta: [
      {
        name: "og:title",
        content: "Обо мне - Toiloff"
      },
    ]
  });
</script>

<template>
  <main class="wrapper">
    <h1 class="text-attractive center">
      {{ $t('About me') }}
    </h1>
    <h2 class="subtext-attractive center">
      {{ $t('On this page you can see some information about me') }}.
    </h2>
    <info-section :items="about"/>
    <visual-section :items="skills"/>
  </main>
</template>
