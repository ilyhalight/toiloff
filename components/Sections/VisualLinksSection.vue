<script setup>
  import { ModalsContainer, useModal, useModalSlot } from 'vue-final-modal';
  import ModalFull from '~/components/Modals/ModalFull.vue';
  import ModalCopy from '~/components/Modals/ModalCopy.vue';

  const visualLinkTypes = [
    'link',
    'mail',
    'modal'
  ]
  const visualName = ref('');
  const visualValue = ref('');
  const { open, close } = useModal({
    component: ModalFull,
    attrs: {
      title: visualName,
      onClose() {
        close();
      },
    },
    slots: {
      default: useModalSlot({
        component: ModalCopy,
        attrs: {
          text: visualValue,
        }
      }),
    }
  });

  const props = defineProps({
    items: {
      type: Object,
      required: true,
    },
  });

  function modalLinkCallback(visualItem) {
    if (visualItem.action_type === "modal") {
      visualName.value = visualItem.name;
      visualValue.value = visualItem.content;
      open();
    }

    return;
  }

</script>

<template>
  <section class="visual-section" v-if="items">
    <slot name="title"/>
    <slot name="subtitle"/>
    <div class="visual-group" v-for="group of Object.entries(items)" :key="group[0]">
      <p class="visual-group-title">{{ $t(group[0]) }}</p>
      <div class="visual-items">
        <template v-for="visual in group[1]" :key="visual.name">
          <a v-if="visualLinkTypes.includes(visual.action_type)"
            class="visual-item visual-link"
            :href="(visual.action_type === 'link' || visual.action_type === 'mail') ? visual.content : '#'"
            @click="modalLinkCallback(visual)"
            >
            <template v-if="visual.icon_type === 'local'">
              <nuxt-icon :name="visual.icon" />
            </template>
            <template v-else-if="visual.icon_type === 'local-color'">
              <nuxt-icon :name="visual.icon" filled/>
            </template>
            <template v-else>
              <Icon :name="visual.icon"/>
            </template>
            <p>
              {{ visual.name }}
            </p>
          </a>
          <div v-else class="visual-item">
            <template v-if="visual.icon_type === 'local'">
              <nuxt-icon :name="visual.icon" />
            </template>
            <template v-else-if="visual.icon_type === 'local-color'">
              <nuxt-icon :name="visual.icon" filled/>
            </template>
            <template v-else>
              <Icon :name="visual.icon"/>
            </template>
            <p>
              {{ visual.name }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </section>
  <ModalsContainer />
</template>