// 회원 현황(신규 가입자)
const ctxUser = document.getElementById("userJoinChart").getContext("2d");

const userJoinChart = new Chart(ctxUser, {
  type: "line",
  data: {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    datasets: [
      {
        label: "신규 가입자 수",
        data: [20, 25, 15, 30, 28, 40],
        borderColor: "#7ed3d9",
        backgroundColor: "rgba(105, 213, 221, 0.15)",
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        borderDash: [5, 5], // 점선 스타일
        pointRadius: 4,
        pointBackgroundColor: "#7ed3d9",
        pointHoverRadius: 6,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 범례 제거
      },
    },
    scales: {
      x: {
        grid: {
          color: "#e6edf2",
        },
      },
      y: {
        grid: {
          color: "#f1f1f1",
        },
        ticks: {
          stepSize: 10,
        },
      },
    },
  },
});

// 강의별 수료율
const ctxCourse = document.getElementById("courseCompletionChart").getContext("2d");

const courseCompletionChart = new Chart(ctxCourse, {
  type: "bar", // ← 막대 그래프로 변경!
  data: {
    labels: ["응급처치 기초", "심폐소생술", "화재 대처", "지진 대비", "안전 교육"],
    datasets: [
      {
        label: "수료율 (%)",
        data: [92, 88, 75, 81, 69],
        backgroundColor: "rgba(255, 195, 195, 0.8)", // 막대 색
        borderColor: "#ffb3b3",
        borderWidth: 1,
        barThickness: 40,   // 막대 두께
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "#e6edf2",
        },
      },
      y: {
        grid: {
          color: "#f1f1f1",
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value) => `${value}%`,
        },
      },
    },
  },
});
