<script setup>
  import InfoSection from '~/components/Sections/InfoSection.vue';
  import SkillsSection from '~/components/Sections/SkillsSection.vue';
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
  <Header/>
  <main class="wrapper">
    <h1 class="text-attractive center">
      {{ $t('About me') }}
    </h1>
    <h2 class="subtext-attractive center">
      {{ $t('On this page you can see some information about me') }}.
    </h2>
    <info-section :items="about"/>
    <skills-section :items="skills"/>
  </main>
  <Footer/>
</template>
