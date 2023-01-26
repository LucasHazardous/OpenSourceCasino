<script>
export default {
  props: ["elements"],
};
</script>

<template>
  <div tabindex="0" class="collapse rounded-box">
    <div class="collapse-title text-2xl font-medium text-center p-5">
      Loot chances
    </div>
    <div class="collapse-content">
      <div class="stats stats-vertical lg:stats-horizontal shadow">
        <div class="stat" v-for="element in elements">
          <div class="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-8 h-8 stroke-primary"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="stat-title">{{ element.title }}</div>
          <div class="stat-value">{{ element.value }}</div>
          <div class="stat-desc">{{ element.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
