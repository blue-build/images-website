<script lang="ts">
  import stats from "@content/stats.json";
  import Chart from "chart.js/auto";
  import { onMount } from "svelte";
  import { darkModeStore } from "@ts/stores";

  onMount(() => {
    const statEntries = Object.entries(stats);
    const dates = statEntries.map((row) => row[0]);
    const images = Object.entries(statEntries[0][1]).map((d) => d[0]);

    const imageData = (img: string) => {
      return statEntries.map((d) => d[1][img]);
    };

    const totalForDate = (date: string) => {
      return Object.entries(stats[date]).reduce(
        (acc, curr) => acc + curr[1],
        0
      );
    };

    const datasets = images.map((img) => {
      return {
        label: img,
        data: imageData(img),
      };
    });

    datasets.push({
      type: "bar",
      label: "total",
      data: dates.map((date) => totalForDate(date)),
    });

    new Chart(document.getElementById("pulls"), {
      type: "line",
      data: {
        labels: dates,
        datasets: datasets,
      },
      options: {
        color: "#7C7DA5",
        scales: {
          x: {
            ticks: {
              color: "#7C7DA5",
            },
            grid: {
              color: "#7C7DA5",
            },
          },
          y: {
            ticks: {
              color: "#7C7DA5",
            },
            grid: {
              color: "#7C7DA5",
            },
          },
        },
      },
    });
  });
</script>

<div id="stats" class="w-full h-full p-8">
  <canvas id="pulls" />
</div>
