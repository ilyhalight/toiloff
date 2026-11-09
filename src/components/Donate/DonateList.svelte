<script lang="ts">
  import DonateItem from "./DonateItem.svelte";
  import DonateCryptoModal from "./DonateCryptoModal.svelte";
  import BoostyIcon from "../Icones/BoostyIcon.svelte";
  import LolzteamIcon from "../Icones/LolzteamIcon.svelte";
  import BoostyStrokeIcon from "../Icones/BoostyStrokeIcon.svelte";
  import TonIcon from "../Icones/TonIcon.svelte";
  import TronIcon from "../Icones/TronIcon.svelte";
  import LitecoinIcon from "../Icones/LitecoinIcon.svelte";
  import SolIcon from "../Icones/SolIcon.svelte";
  import EthereumIcon from "../Icones/EthereumIcon.svelte";
  import PolygonIcon from "../Icones/PolygonIcon.svelte";

  import type { DonateItem as DonateItemType } from "#lib/donate.ts";

  const donateItems: DonateItemType[] = [
    {
      platform: "boosty",
      title: "Boosty",
      description:
        "Simplest way to support. You can make a subscription or a one-time donation",
      href: "https://boosty.to/toil",
      icon: BoostyIcon,
      bgIcon: BoostyStrokeIcon,
    },
    {
      platform: "lolzteam",
      title: "Lolzteam",
      description: "Send to LZT Market",
      href: "https://lzt.market/balance/transfer?user_id=667866",
      icon: LolzteamIcon,
    },
    {
      platform: "ton",
      title: "TON",
      description: "UQA...bu",
      href: "#",
      icon: TonIcon,
      modal: DonateCryptoModal,
      modalProps: {
        content:
          "VVFBWGhSODY2MUtBYk9WUFR2RTFQdEt1RUo1UUs2Yng5MzA4TS0tdWpFUFlRLWJ1",
      },
    },
    {
      platform: "ltc",
      title: "LTC",
      description: "LNk...XM",
      href: "#",
      icon: LitecoinIcon,
      modal: DonateCryptoModal,
      modalProps: {
        content: "TE5rNm5mRGQ1TFBUOVQ2Y0RUbzlaZml5UnJyZnlVN29YTQ==",
      },
    },
    {
      platform: "sol",
      title: "SOL",
      description: "EmS...Mn",
      href: "#",
      icon: SolIcon,
      modal: DonateCryptoModal,
      modalProps: {
        content: "RW1TakVXZmZZYUxhUlJXWmdENjllRjRITUxtblNaZHpjZmZXRmoyZ0c4TW4=",
      },
    },
    {
      platform: "pol",
      title: "POL",
      description: "0x7...4b",
      href: "#",
      icon: PolygonIcon,
      modal: DonateCryptoModal,
      modalProps: {
        content: "MHg3MURDYUY3RWVFZkJBRmMzMzA1ZjEyRUIxY2NCRDgxNWQ4QUIwRTRi",
      },
    },
    {
      platform: "tron",
      title: "TRON",
      description: "TLT...zF",
      href: "#",
      icon: TronIcon,
      modal: DonateCryptoModal,
      modalProps: {
        content: "VExUOWg3dUxOYXoyTUFLYVJNRE5ocHRwcEc4cWpDY2F6Rg==",
      },
    },
    {
      platform: "eth",
      title: "ETH",
      description: "0x7...4b",
      href: "#",
      icon: EthereumIcon,
      modal: DonateCryptoModal,
      modalProps: {
        content: "MHg3MURDYUY3RWVFZkJBRmMzMzA1ZjEyRUIxY2NCRDgxNWQ4QUIwRTRi",
      },
    },
  ];
</script>

<ul class="donate-list">
  {#each donateItems as donate, idx}
    <DonateItem {donate} {idx} />
  {/each}
</ul>

<style>
  .donate-list {
    list-style: none;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 568px) {
    .donate-list {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }
</style>
