// 교육자료 더미데이터 (화면 확인용)
const eduList = [
  { eduId: 1, eduTitle: "출혈 발생 시 지혈 응급처치 기본", eduContent: "[자가 / 출혈]", eduFile: "출혈_응급처치.pdf", eduRegDate: "2025-10-01" },
  { eduId: 2, eduTitle: "성인 기도막힘 응급 대처법", eduContent: "[자가 / 기도막힘]", eduFile: "기도막힘_성인.pdf", eduRegDate: "2025-10-03" },
  { eduId: 3, eduTitle: "심정지 초기 반응 및 대처 요령", eduContent: "[구조자 / 심정지]", eduFile: "심정지_대처.pdf", eduRegDate: "2025-10-05" },
  { eduId: 4, eduTitle: "출혈·골절 사고 응급 고정법", eduContent: "[자가 / 출혈]", eduFile: "골절_응급고정.pdf", eduRegDate: "2025-10-08" },
  { eduId: 5, eduTitle: "심정지 환자를 위한 CPR·AED 기본", eduContent: "[구조자 / 심정지]", eduFile: "CPR_기초.pdf", eduRegDate: "2025-10-10" },
  { eduId: 6, eduTitle: "출혈 부위 압박붕대 적용 요령", eduContent: "[자가 / 출혈]", eduFile: "출혈_압박붕대.pdf", eduRegDate: "2025-10-13" },
  { eduId: 7, eduTitle: "유아 기도막힘 응급처치", eduContent: "[자가 / 기도막힘]", eduFile: "기도막힘_유아.pdf", eduRegDate: "2025-10-16" },
  { eduId: 8, eduTitle: "심정지 환자 의식·호흡 확인 절차", eduContent: "[구조자 / 심정지]", eduFile: "심정지_의식확인.pdf", eduRegDate: "2025-10-19" },
  { eduId: 9, eduTitle: "팔 골절 시 응급 고정 응용법", eduContent: "[자가 / 출혈]", eduFile: "팔골절_응급.pdf", eduRegDate: "2025-10-22" },
  { eduId: 10, eduTitle: "심폐소생술(CPR) 실습 매뉴얼", eduContent: "[구조자 / 심정지]", eduFile: "CPR_실습.pdf", eduRegDate: "2025-10-25" },
  { eduId: 11, eduTitle: "출혈 응급 키트 사용법", eduContent: "[자가 / 출혈]", eduFile: "응급키트_출혈.pdf", eduRegDate: "2025-10-28" },
  { eduId: 12, eduTitle: "골절 부목 제작 및 응급 활용", eduContent: "[자가 / 출혈]", eduFile: "골절_부목.pdf", eduRegDate: "2025-11-01" }
];

const tbody = document.querySelector("#admin_eduList_table tbody");
const eduTotalCount = document.getElementById("admin_tot_cnt");

// 테이블 렌더링
function renderEduTable(page) {
  tbody.innerHTML = "";

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = eduList.slice(start, end);

  pageData.forEach((edu, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <tr>
        <td>${start + idx + 1}</td>
        <td><div class="edu_title_box">
          <a href="../adminEduEdit/adminEduEdit.html?id=${edu.eduId}" class="edu_link">${edu.eduTitle}</a>
        </div></td>
        <td>${edu.eduContent}</td>
        <td><a href="upload/${edu.eduFile}" class="edufile_link" target="_blank">${edu.eduFile}</a></td>
        <td>관리자</td>
        <td>${edu.eduRegDate}</td>
        <td>
          <button class="admin_delete_btn" data-edu-id="${edu.eduId}">삭제</button>
        </td>
      </tr>
    `;
    tbody.appendChild(tr);
  });

  eduTotalCount.textContent = eduList.length.toString().padStart(2, "0");
  attachDeleteEvents();
}

// 삭제 버튼 이벤트
function attachDeleteEvents() {
  document.querySelectorAll(".admin_delete_btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const eduId = parseInt(e.target.dataset.eduId);
      const confirmDelete = confirm("정말로 해당 교육 자료를 삭제하시겠습니까?");
      if (confirmDelete) {
        const index = eduList.findIndex(edu => edu.eduId === eduId);
        if (index !== -1) {
          eduList.splice(index, 1);
          alert("교육 자료가 삭제되었습니다.");
          renderEduTable(currentPage);
          renderPagination(eduList.length);
        }
      }
    });
  });
}

// 행 개수 변경
rowSelect.addEventListener("change", function () {
  rowsPerPage = parseInt(this.value);
  currentPage = 1;
  renderEduTable(currentPage);
  renderPagination(eduList.length);
});

// 강의 목록 페이징 처리
function changePage(page) {
  currentPage = page;
  renderEduTable(currentPage);
  renderPagination(eduList.length);
}

// 초기 실행
renderEduTable(currentPage);
renderPagination(eduList.length);