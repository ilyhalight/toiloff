<script lang="ts">
  import "altcha";
  // required for page routing
  import "altcha/altcha.css";
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

  export async function run(): Promise<string | false> {
    if (!element) {
      console.warn(
        "Captcha widget isn't initialized. Looks strange, but maybe admin disabled captcha?..",
      );
      return "";
    }

    const result = await element.verify();
    const currentState = element.getState();
    if (currentState !== "verified" || !result?.payload) {
      return false;
    }

    return result.payload;
  }

  type Props = {
    element?: (HTMLElement & WidgetMethods) | null;
  };

  let { element = $bindable(null) }: Props = $props();
</script>

<altcha-widget
  data-captcha
  style="--altcha-max-width:100%"
  configuration={JSON.stringify(config)}
  bind:this={element}
></altcha-widget>
