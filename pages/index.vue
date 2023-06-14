<script setup>
  import MainSection from '~/components/Sections/MainSection.vue';
  import GradientEffect from '~/components/effects/GradientEffect.vue';

  import projects from "~/data/projects.json";
  import contributed from "~/data/contributed.json";

  useHead({
    title: "Главная · Toiloff",
    meta: [
      {
        name: "og:title",
        content: "Главная - Toiloff"
      },
    ]
  });

</script>

<template>
  <main class="wrapper">
    <div class="page-info">
      <gradient-effect>
        <template #elements>
          <div class="gradient-element" style="--opacity-delay: -8s; --move-delay: -3s;"></div>
          <div class="gradient-element" style="--opacity-delay: -0s; --move-delay: -17s; margin-left: 550px; margin-top: 150px; background: rgba(110, 41, 255, 0.7);"></div>
          <div class="gradient-element" style="--opacity-delay: -4s; --move-delay: -14s; margin-right: 550px; margin-top: 50px; background: rgba(220, 90, 91, 0.7);"></div>
        </template>
      </gradient-effect>
      <h1 class="text-attractive center">
        {{ $t('Welcome') }} <span class="text-gradient">{{ $t('to my website') }}.</span>
        <br>
        {{ $t('Make yourself at home') }}.
      </h1>
      <p class="subtext-attractive center">
        {{ $t('Here you will find information about my projects. Also, you can find out a little about me, my social networks or give me a call. Thank you for your interest') }}.
      </p>
    </div>
    <main-section :items="projects">
      <template #title>
        <h2 class="title center">{{ $t('My Projects') }}</h2>
      </template>
      <template #subtitle>
        <p class="subtitle center">{{ $t('Probably, there is nothing more exciting than seeing your ideas embodied in reality. In this section, I present to you some of these ideas that have been implemented by me') }}.</p>
      </template>
    </main-section>
    <main-section :items="contributed">
      <template #title>
        <h2 class="title center">{{ $t('Contributed') }}</h2>
      </template>
      <template #subtitle>
        <p class="subtitle center">{{ $t('A little below you can see the projects to which I have made any contribution') }}.</p>
      </template>
    </main-section>
    <!-- <p>{{ $t('Current locale') }}: {{ locale }}</p>
    <p>{{ $t('Current theme') }}: {{ $colorMode.value }}</p> -->
  </main>
</template>
