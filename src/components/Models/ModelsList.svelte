<script lang="ts">
  import type { TopModelItem } from "../../lib/api/stats";

  type Props = {
    models: TopModelItem[];
  };

  let { models = [] }: Props = $props();
</script>

<section class="models">
  <div class="models-head">
    <div class="row">
      <p class="cell cell_number">№</p>
      <p class="cell cell_model">Model</p>
      <p class="cell cell_lab">Lab</p>
      <p class="cell cell_total">Total</p>
      <p class="cell cell_month">Month</p>
    </div>
  </div>

  <ul class="models-list">
    {#each models as model, index}
      <li class="row" data-id={index}>
        <p class="cell cell_number">{index + 1}</p>
        <p class="cell cell_model">{model.model}</p>
        <p class="cell cell_lab">{model.lab}</p>
        <p class="cell cell_total">
          <span class="cell__label">Total</span>{model.totalTokens.all
            .formatted}
        </p>
        <p class="cell cell_month">
          <span class="cell__label">Month</span>{model.monthTokens.all
            .formatted}
        </p>
      </li>
    {/each}
  </ul>
</section>

<style>
  .models {
    container: models / inline-size;
    --gold-color: #e8b84a;
    --gold-bg: #e8b84a24;

    --silver-color: #b8bec9;
    --silver-bg: #b8bec91f;

    --bronze-color: #c77b48;
    --bronze-bg: #c77b4824;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  :global([data-theme="light"]) .models {
    --gold-color: #7b6400;
    --gold-bg: #f2c94c38;

    --silver-color: #565d69;
    --silver-bg: #9ca3af29;

    --bronze-color: #81401f;
    --bronze-bg: #c76f3a30;
  }

  .models-head {
    display: flex;
  }

  .models-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .row {
    width: 100%;
    display: grid;
    grid-template-columns: 2rem minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr) minmax(
        0,
        1fr
      );
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border-radius: 1rem;
    background: var(--surface-bg);
  }

  .models-list .row[data-id="0"] {
    background: var(--gold-bg);
    color: var(--gold-color);
  }

  .models-list .row[data-id="1"] {
    background: var(--silver-bg);
    color: var(--silver-color);
  }

  .models-list .row[data-id="2"] {
    background: var(--bronze-bg);
    color: var(--bronze-color);
  }

  .cell {
    min-width: 0;
  }

  .cell.cell_number {
    font-weight: bold;
    font-variant-numeric: tabular-nums;
  }

  .cell_model {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cell_total,
  .cell_month {
    text-align: end;
    font-variant-numeric: tabular-nums;
  }

  .cell__label {
    display: none;
  }

  .models-head .cell {
    color: var(--text-muted);
    font-weight: bold;
  }

  @container models (max-width: 520px) {
    .models-head {
      display: none;
    }

    .row {
      grid-template-columns: 2rem minmax(0, 1fr) auto;
      grid-template-areas:
        "num model total"
        "num lab month";
      row-gap: 0.25rem;
      padding: 0.875rem 1rem;
    }

    .cell_number {
      grid-area: num;
      align-self: center;
    }

    .cell_model {
      grid-area: model;
      font-weight: 600;
    }

    .cell_lab {
      grid-area: lab;
      font-size: 0.875rem;
      opacity: 0.75;
    }

    .cell_total {
      grid-area: total;
    }

    .cell_month {
      grid-area: month;
      font-size: 0.875rem;
    }

    .cell__label {
      display: inline;
      margin-inline-end: 0.375rem;
      font-size: 0.75rem;
      opacity: 0.6;
    }
  }
</style>
