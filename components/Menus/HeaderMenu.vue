<script setup>
  import Menu from '~/components/Menus/Menu.vue';
  import ThemesButton from '~/components/Buttons/ThemesButton.vue';
  import LocalesMenu from '~/components/Menus/LocalesMenu.vue';
</script>

<template>
  <Menu>
    <template #icon>
      <Icon class="big-icon" name="gg:menu" />
    </template>
    <template #content>
      <NuxtLink class="menu-item" to="/about"> {{ $t('About me') }} </NuxtLink>
      <NuxtLink class="menu-item" to="/donate"> {{ $t('Donate') }} </NuxtLink>
      <NuxtLink class="menu-item" to="/social"> {{ $t('Social') }} </NuxtLink>
      <a class="navbar-item" href="https://akibot.ru">Aki</a>
      <themes-button class="menu-item" />
      <locales-menu class="menu-item" />
    </template>
  </Menu>
</template>