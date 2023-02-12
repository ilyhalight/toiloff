<script setup>
  import { ModalsContainer, useModal, useModalSlot } from 'vue-final-modal';
  import ModalFull from '~/components/Modals/ModalFull.vue';
  import ModalImageView from '../components/Modals/ModalImageView.vue';

  import projects from "~/data/projects.json";

  const imageLink = ref('');
  const imageAlt = ref('');

  const { open, close } = useModal({
    component: ModalFull,
    attrs: {
      title: '',
    },
    slots: {
      default: useModalSlot({
        component: ModalImageView,
        attrs: {
          src: imageLink,
          alt: imageAlt,
        }
      })
    },
  });
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
    <section class="sections" id="projects">
      <h1 class="title">
        {{ $t('My OpenSource Projects') }}
      </h1>
      <p class="subtitle">
        {{ $t('A little below you can see some of my open source projects') }}.
      </p>
      <div class="sections-items" v-if="projects.length">
        <div class="section-item" v-for="project in projects" :key="project.id">
          <a class="section-title" :href="project.href">{{ project.name }}</a>
          <div class="tags">
            <p class="tag" v-for="tag in project.tags" :key="tag" :style="'background: ' + tag.color">{{ tag.name }}</p>
          </div>
          <p class="section-description">{{ $t(project.desc) }}.</p>
          <nuxt-img class="section-image" :src="project.image" :alt="project.name" quality="100" loading="lazy" @click="imageLink = project.image; imageAlt = project.name; open()"/>
        </div>
      </div>
    </section>
    <!-- <p>{{ $t('Current locale') }}: {{ locale }}</p>
    <p>{{ $t('Current theme') }}: {{ $colorMode.value }}</p> -->
    <ModalsContainer />
  </main>
</template>
