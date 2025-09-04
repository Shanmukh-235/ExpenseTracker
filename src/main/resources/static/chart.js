// Draw pie chart for category-wise expenses
function drawChart(categoryMap) {
  const ctx = document.getElementById("expenseChart").getContext("2d");
  const labels = Object.keys(categoryMap);
  const values = Object.values(categoryMap);

  if (chart) {
    chart.destroy(); // Clear old chart before redrawing
  }

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "#4E79A7", // soft blue
            "#F28E2B", // warm orange
            "#E15759", // coral red
            "#76B7B2", // teal
            "#59A14F", // green
            "#EDC948", // golden yellow
            "#B07AA1", // lavender purple
            "#FF9DA7", // pink
            "#9C755F", // mocha brown
            "#BAB0AC", // gray
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
      },
    },
  });
}
