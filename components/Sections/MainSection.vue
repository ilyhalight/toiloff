<script setup>
  import { ModalsContainer, useModal, useModalSlot } from 'vue-final-modal';
  import ModalFull from '~/components/Modals/ModalFull.vue';
  import ModalImageView from '~/components/Modals/ModalImageView.vue';

  const props = defineProps({
    items: {
      type: Array,
      required: true,
    },
  });

  const imageLink = ref('');
  const imageAlt = ref('');

  const { open, close } = useModal({
    component: ModalFull,
    attrs: {
      title: '',
      onClose() {
        close();
      },
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
  <section class="sections" v-if="items.length">
    <slot name="title"></slot>
    <slot name="subtitle"></slot>
    <div class="sections-items">
      <div class="section-item" v-for="item in items" :key="item.id">
        <a class="section-title" :href="item.href" target="_blank">{{ item.name }}</a>
        <div class="tags">
          <p class="tag" v-for="tag in item.tags" :key="tag" :style="'background: ' + tag.color">{{ tag.name }}</p>
        </div>
        <p class="section-description">{{ $t(item.desc) }}</p>
        <nuxt-img class="section-image" :src="item.image" :alt="item.name" quality="80" loading="lazy" @click="imageLink = item.image; imageAlt = item.name; open()"/>
      </div>
    </div>
  </section>
  <ModalsContainer />
</template>