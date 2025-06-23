<!-- nasr.vue / delete later -->
<script setup>
import { ref, onMounted } from "vue";

const { t } = useI18n();

const isDecrypting = ref(false);
const progress = ref(0);
const status = ref("");
const displayText = ref("");
const showSuccess = ref(false);
const countdown = ref(3);

const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|";

const getRandomChar = () => {
  return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startDecryption = async () => {
  if (isDecrypting.value) return;

  isDecrypting.value = true;
  showSuccess.value = false;
  progress.value = 0;

  const targetText = t("content.decrypt.completed");
  const targetUrl = "https://www.youtube.com/watch?v=PZqx-lMZHM0";

  try {
    status.value = t("content.decrypt.step1");
    await animateScrambledText(targetText.length, 15, 20);

    status.value = t("content.decrypt.step2");
    await animateDecryption(targetText, 40);

    status.value = t("content.decrypt.step3");
    progress.value = 100;
    displayText.value = targetText;

    await sleep(500);

    showSuccess.value = true;
    await startCountdown();

    window.open(targetUrl, "_blank");
  } finally {
    await sleep(1000);
    resetState();
  }
};

const animateScrambledText = async (length, iterations, progressWeight) => {
  for (let i = 0; i < iterations; i++) {
    displayText.value = Array.from({ length }, () => getRandomChar()).join("");
    progress.value = (i / iterations) * progressWeight;
    await sleep(80);
  }
};

const animateDecryption = async (targetText, startProgress) => {
  const positions = Array.from({ length: targetText.length }, (_, i) => i);
  const revealed = new Set();

  for (let round = 0; round < targetText.length; round++) {
    const available = positions.filter((pos) => !revealed.has(pos));
    const posToReveal = available[Math.floor(Math.random() * available.length)];
    for (let attempt = 0; attempt < 3; attempt++) {
      let text = "";
      for (let i = 0; i < targetText.length; i++) {
        if (revealed.has(i)) {
          text += targetText[i];
        } else if (i === posToReveal) {
          text += getRandomChar();
        } else {
          text += getRandomChar();
        }
      }
      displayText.value = text;
      await sleep(60);
    }

    revealed.add(posToReveal);
    let finalText = "";
    for (let i = 0; i < targetText.length; i++) {
      finalText += revealed.has(i) ? targetText[i] : getRandomChar();
    }
    displayText.value = finalText;

    progress.value =
      startProgress + ((round + 1) / targetText.length) * (100 - startProgress);
    await sleep(120);
  }
};

const startCountdown = async () => {
  for (let i = 3; i > 0; i--) {
    countdown.value = i;
    await sleep(1000);
  }
};

const resetState = () => {
  isDecrypting.value = false;
  progress.value = 0;
  status.value = "";
  displayText.value = "";
  showSuccess.value = false;
  countdown.value = 3;
};
</script>

<template>
  <button
    @click="startDecryption"
    :disabled="isDecrypting"
    class="decrypt-btn"
    :class="{ decrypting: isDecrypting }"
  >
    {{
      isDecrypting
        ? $t("content.decrypt.processing")
        : $t("content.decrypt.text")
    }}
  </button>

  <div class="progress-container" v-if="isDecrypting || progress > 0">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="status">{{ status }}</div>
  </div>

  <div
    class="text-display"
    :class="{ active: displayText !== '' }"
    v-if="displayText"
  >
    {{ displayText }}
  </div>

  <div class="success-message" v-if="showSuccess">
    <div class="success-icon">✓</div>
    <div class="success-text">{{ $t("content.decrypt.success") }}</div>
    <div class="redirect-info">
      {{ $t("content.decrypt.redirecting") }} {{ countdown }}...
    </div>
  </div>
</template>

<style scoped>
.decrypt-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  min-width: 200px;
}

.decrypt-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
}

.decrypt-btn:active:not(:disabled) {
  transform: translateY(0);
}

.decrypt-btn:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.decrypt-btn.decrypting {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.progress-container {
  margin-top: 32px;
  animation: fadeIn 0.5s ease-out;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 16px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 3px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.progress-fill::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.status {
  font-size: 14px;
  color: #667eea;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.text-display {
  margin-top: 32px;
  font-size: 18px;
  color: #2d3748;
  background: rgba(102, 126, 234, 0.05);
  padding: 24px;
  border-radius: 16px;
  border: 2px solid rgba(102, 126, 234, 0.1);
  letter-spacing: 1px;
  font-weight: 600;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.5s ease-out;
}

.text-display.active {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  animation: glow 2s infinite alternate;
}

@keyframes glow {
  from {
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.2);
  }
  to {
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
  }
}

.success-message {
  margin-top: 32px;
  animation: successSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.success-icon {
  font-size: 48px;
  color: #48bb78;
  margin-bottom: 16px;
  animation: checkmark 0.6s ease-in-out;
}

@keyframes checkmark {
  0% {
    transform: scale(0) rotate(45deg);
  }
  50% {
    transform: scale(1.2) rotate(45deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

.success-text {
  font-size: 18px;
  font-weight: 600;
  color: #48bb78;
  margin-bottom: 8px;
}

.redirect-info {
  font-size: 14px;
  color: #667eea;
  font-weight: 500;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes successSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 480px) {
  .decrypt-btn {
    padding: 14px 28px;
    font-size: 14px;
    min-width: 180px;
  }

  .text-display {
    font-size: 16px;
    padding: 20px;
  }
}
</style>
