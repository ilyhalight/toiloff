<script lang="ts">
  import "altcha";
  import type {} from "altcha/types/svelte";
  import type { Configuration, WidgetMethods } from "altcha/types";
  import captchaConfig from "../../data/captcha";

  const config: Partial<Configuration> = {
    debug: false,
    display: "invisible",
    language: "en",
    // guys it's invisible...
    hideFooter: true,
    hideLogo: true,
    challenge: captchaConfig.challengeUrl,
  };

  let { element = $bindable<(HTMLElement & WidgetMethods) | null>(null) } =
    $props();
</script>

<altcha-widget
  data-captcha
  style="--altcha-max-width:100%"
  configuration={JSON.stringify(config)}
  bind:this={element}
></altcha-widget>
