<script setup>
  import MainSection from '~/components/Sections/MainSection.vue';

  import projects from "~/data/projects.json";
  import contributed from "~/data/contributed.json";

</script>

<template>
  <Header/>
  <main class="wrapper">
    <h1 class="text-attractive">
      {{ $t('Hello') }},
      <span class="text-gradient">{{ $t('I\'m Toil') }},</span>
      {{ $t('a developer from Russia') }}.
    </h1>
    <h2 class="subtext-attractive">
      {{ $t('On this site, you can find some information about me, my social networks, as well as about my projects') }}.
    </h2>
    <main-section :items="projects">
      <template #title>
        <h1 class="title">{{ $t('My OpenSource Projects') }}</h1>
      </template>
      <template #subtitle>
        <p class="subtitle">{{ $t('A little below you can see some of my open source projects') }}.</p>
      </template>
    </main-section>
    <main-section :items="contributed">
      <template #title>
        <h1 class="title">{{ $t('Contributed') }}</h1>
      </template>
      <template #subtitle>
        <p class="subtitle">{{ $t('A little below you can see the projects to which I have made any contribution') }}.</p>
      </template>
    </main-section>
    <!-- <p>{{ $t('Current locale') }}: {{ locale }}</p>
    <p>{{ $t('Current theme') }}: {{ $colorMode.value }}</p> -->
  </main>
  <Footer/>
</template>
