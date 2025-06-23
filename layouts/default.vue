<script setup>
import config from '~/config/config.js';
import getTitle from '~/utils/title.js';

const route = useRoute();
const { t, locales } = useI18n();

const head = useLocaleHead({
  key: 'id',
});

const title = computed(() => getTitle(t(route.meta.title ?? 'layouts.main')));
useSeoMeta({
  title: title,
  ogTitle: title,
  description: config.siteDesc,
  ogDescription: config.siteDesc,
});


useSchemaOrg([
  definePerson({
    name: config.personName,
    image: '/images/me.jpg',
    url: config.baseUrl,
  }),
  defineWebSite({
    url: config.baseUrl,
    name: config.siteName,
    description: config.siteDesc,
    inLanguage: locales.value.map(locale => locale.iso)
  }),
  defineWebPage({
    name: title
  }),
]);

defineOgImage({
  siteLogo: "/favicon.svg"
});
</script>


<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">

  <Head>
    <template v-for="link in head.link" :key="link.id">
      <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
    </template>
    <template v-for="meta in head.meta" :key="meta.id">
      <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
    </template>
  </Head>

  <Body>
    <Header />
    <!-- <SchemaOrgDebug /> -->
    <slot />
    <Footer />
  </Body>

  </Html>
</template>