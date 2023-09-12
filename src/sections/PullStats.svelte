<script lang="ts">
  import Chart from "chart.js/auto";
  import { onMount } from "svelte";

  export let stats

  onMount(async () => {
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
      label: "total",
      data: dates.map((date) => totalForDate(date)),
    });

    const chartOptions = {
        color: "#7C7DA5",
        responsive: true,
        maintainAspectRatio: false,
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
    }

    new Chart(document.getElementById("everything"), {
      type: "line",
      data: {
        labels: dates,
        datasets: datasets.filter((d) => d.label != "total"),
      },
      options: chartOptions
    });

    new Chart(document.getElementById("total"), {
      type: "bar",
      data: {
        labels: dates,
        datasets: datasets.filter((d) => d.label == "total"),
      },
      options: chartOptions
    });

    // daily pulls (how much bigger is todays total pull count from yesterdays)
    // is calculated by subtracting yesterday's total from today's
    const daily = [{
      label: "daily pulls",
      data: dates.map((date, i) => {
        return totalForDate(date)-totalForDate(dates[i-1] || dates[0]) 
      }),
    }]
    new Chart(document.getElementById("daily"), {
      type: "bar",
      data: {
        labels: dates,
        datasets: daily,
      },
      options: chartOptions
    });

    new Chart(document.getElementById("main"), {
      type: "line",
      data: {
        labels: dates,
        datasets: datasets.filter(
          (d) =>
          (d.label.includes("main") || d.label.includes("nvidia")
          && !d.label.includes("akmods") && !d.label.includes("bluefin")
        )),
      },
      options: chartOptions
    });

    new Chart(document.getElementById("bbb"), {
      type: "line",
      data: {
        labels: dates,
        datasets: datasets.filter(
          (d) => d.label.includes("bluefin") || d.label.includes("bazzite") || d.label.includes("beyond")
        ),
      },
      options: chartOptions
    });
  });
</script>

<div id="stats" class="h-full w-full p-8 flex flex-col gap-8">
  <figure class="h-[48rem]">
    <figcaption>All images</figcaption>
    <canvas id="everything"/>
  </figure>
  <figure class="h-[48rem]">
    <figcaption>Total pulls</figcaption>
    <canvas id="total"/>
  </figure>
  <figure class="h-[48rem]">
    <figcaption>Daily pulls (bad data quality in some areas leading to odd peaks and dips)</figcaption>
    <canvas id="daily"/>
  </figure>
  <figure class="h-[48rem]">
    <figcaption>Main & Nvidia</figcaption>
    <canvas id="main"/>
  </figure>
  <figure class="h-[48rem]">
    <figcaption>Bluefin vs Bazzite vs Beyond</figcaption>
    <canvas id="bbb"/>
  </figure>
</div>
