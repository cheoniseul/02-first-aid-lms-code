// 보도자료 더미데이터
const pressList = [
  { pressId: 1, pressTitle: "심폐소생술 교육 캠페인 실시", pressContent: "전국민 대상 심폐소생술 교육 캠페인을 실시했습니다.", pressFile: "https://example.com/news/cpr-campaign", pressRegDate: "2025-11-01" },
  { pressId: 2, pressTitle: "응급처치 키트 보급 사업 착수", pressContent: "응급상황 대응을 위한 응급키트 보급이 시작되었습니다.", pressFile: "https://example.com/news/firstaid-kit", pressRegDate: "2025-10-29" },
  { pressId: 3, pressTitle: "지역사회 안전교육 확대", pressContent: "학교와 지역센터를 통한 안전교육을 확대 운영합니다.", pressFile: "https://example.com/news/community-safety", pressRegDate: "2025-10-27" },
  { pressId: 4, pressTitle: "119 구급대 협력 체계 강화", pressContent: "응급 구조 체계 강화를 위한 협약을 체결했습니다.", pressFile: "https://example.com/news/ems-cooperation", pressRegDate: "2025-10-24" },
  { pressId: 5, pressTitle: "응급상황 대응 매뉴얼 배포", pressContent: "응급상황별 대응 매뉴얼이 전국 기관에 배포되었습니다.", pressFile: "https://example.com/news/response-manual", pressRegDate: "2025-10-22" },
  { pressId: 6, pressTitle: "AED 설치 확대 계획 발표", pressContent: "공공시설 내 AED 설치 확대 계획을 발표했습니다.", pressFile: "https://example.com/news/aed-expansion", pressRegDate: "2025-10-19" },
  { pressId: 7, pressTitle: "안전교육 온라인 플랫폼 오픈", pressContent: "비대면 안전교육을 위한 온라인 플랫폼이 오픈되었습니다.", pressFile: "https://example.com/news/platform-launch", pressRegDate: "2025-10-17" },
  { pressId: 8, pressTitle: "응급처치 전문 강사 양성 과정 개설", pressContent: "응급처치 전문 인력 양성을 위한 과정이 개설되었습니다.", pressFile: "https://example.com/news/instructor-course", pressRegDate: "2025-10-14" },
  { pressId: 9, pressTitle: "청소년 안전캠프 개최", pressContent: "청소년 대상 안전캠프를 성황리에 마쳤습니다.", pressFile: "https://example.com/news/youth-camp", pressRegDate: "2025-10-10" },
  { pressId: 10, pressTitle: "생활 속 응급처치 교육 주간 운영", pressContent: "전국 30개 도시에서 응급처치 주간 행사를 운영했습니다.", pressFile: "https://example.com/news/firstaid-week", pressRegDate: "2025-10-06" },
  { pressId: 11, pressTitle: "재난 대비 시민 안전훈련 실시", pressContent: "시민 참여형 재난 대비 훈련이 진행되었습니다.", pressFile: "https://example.com/news/disaster-drill", pressRegDate: "2025-10-03" },
  { pressId: 12, pressTitle: "응급안전 체험관 개관", pressContent: "체험형 응급안전교육을 위한 상설 체험관이 개관했습니다.", pressFile: "https://example.com/news/safety-center-open", pressRegDate: "2025-09-30" }
];

const tbody = document.querySelector("#admin_press_table tbody");
const pressTotalCount = document.getElementById("admin_tot_cnt");

// 보도자료 테이블 렌더링
function renderPressTable(page) {
  tbody.innerHTML = "";

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = pressList.slice(start, end);

  pageData.forEach((p, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${start + idx + 1}</td>
      <td><a href="../adminPressEdit/adminPressEdit.html?id=${p.pressId}" class="press_title_link">${p.pressTitle}</a></td>
      <td>${p.pressContent}</td>
      <td><a href="${p.pressFile}" target="_blank" class="press_file_link">바로가기</a></td>
      <td>관리자</td>
      <td>${p.pressRegDate}</td>
      <td><button class="admin_delete_btn" data-press-id="${p.pressId}">삭제</button></td>
    `;

    tbody.appendChild(tr);
  });

  pressTotalCount.textContent = pressList.length.toString().padStart(2, "0");
  attachDeleteEvents();
}

// 삭제 버튼 이벤트
function attachDeleteEvents() {
  document.querySelectorAll(".admin_delete_btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const pressId = parseInt(e.target.dataset.pressId);
      const confirmDelete = confirm("정말로 해당 보도자료를 삭제하시겠습니까?");
      if (confirmDelete) {
        const index = pressList.findIndex(p => p.pressId === pressId);
        if (index !== -1) {
          pressList.splice(index, 1);
          alert("보도자료가 삭제되었습니다.");
          renderPressTable(currentPage);
          renderPagination(pressList.length);
        }
      }
    });
  });
}

// 행 개수 변경
rowSelect.addEventListener("change", function () {
  rowsPerPage = parseInt(this.value);
  currentPage = 1;
  renderPressTable(currentPage);
  renderPagination(pressList.length);
});

// 보도자료 목록 페이징 처리
function changePage(page) {
  currentPage = page;
  renderPressTable(currentPage);
  renderPagination(pressList.length);
}

// 초기 실행
renderPressTable(currentPage);
renderPagination(pressList.length);