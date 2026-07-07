<div class="guestbook-form__head">
  <p class="guestbook-form__eyebrow">Create message</p>
  <h2 class="guestbook-form__title">Write smth</h2>
  <p class="guestbook-form__description">This can be anything, within reason</p>
</div>

<style>
  .guestbook-form__head {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .guestbook-form__eyebrow {
    color: var(--text-muted);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .guestbook-form__eyebrow {
    color: var(--primary-color);
    font-size: 0.85rem;
  }

  .guestbook-form__title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    line-height: 1;
  }

  .guestbook-form__description {
    color: var(--text-muted);
    font-weight: 500;
    text-transform: none;
    letter-spacing: 0;
  }
</style>
