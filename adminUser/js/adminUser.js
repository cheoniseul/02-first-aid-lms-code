// 회원 목록 더미 데이터
const users = [
  { userNo: 1, userName: "김ㅇㅇ", userId: "kim01", userEmail: "kim01@example.com", userPhone: "010-1111-1111", userBirth: "1998-05-05", userAddr: "서울시 강남구" },
  { userNo: 2, userName: "이ㅇㅇ", userId: "lee02", userEmail: "lee02@example.com", userPhone: "010-2222-2222", userBirth: "1985-06-21", userAddr: "서울시 서초구" },
  { userNo: 3, userName: "박ㅇㅇ", userId: "park03", userEmail: "park03@example.com", userPhone: "010-3333-3333", userBirth: "1991-03-11", userAddr: "서울시 마포구" },
  { userNo: 4, userName: "최ㅇㅇ", userId: "choi04", userEmail: "choi04@example.com", userPhone: "010-4444-4444", userBirth: "1996-01-01", userAddr: "서울시 성동구" },
  { userNo: 5, userName: "정ㅇㅇ", userId: "jung05", userEmail: "jung05@example.com", userPhone: "010-5555-5555", userBirth: "1998-07-08", userAddr: "부산시 해운대구" },
  { userNo: 6, userName: "한ㅇㅇ", userId: "han06", userEmail: "han06@example.com", userPhone: "010-6666-6666", userBirth: "1998-11-13", userAddr: "부산시 남구" },
  { userNo: 7, userName: "서ㅇㅇ", userId: "seo07", userEmail: "seo07@example.com", userPhone: "010-7777-7777", userBirth: "1998-09-18", userAddr: "대전시 서구" },
  { userNo: 8, userName: "문ㅇㅇ", userId: "moon08", userEmail: "moon08@example.com", userPhone: "010-8888-8888", userBirth: "1997-02-23", userAddr: "대전시 유성구" },
  { userNo: 9, userName: "오ㅇㅇ", userId: "oh09", userEmail: "oh09@example.com", userPhone: "010-9999-9999", userBirth: "2001-09-01", userAddr: "대구시 중구" },
  { userNo: 10, userName: "장ㅇㅇ", userId: "jang10", userEmail: "jang10@example.com", userPhone: "010-1010-1010", userBirth: "1985-10-01", userAddr: "대구시 북구" },
  { userNo: 11, userName: "윤ㅇㅇ", userId: "yoon11", userEmail: "yoon11@example.com", userPhone: "010-1111-1212", userBirth: "1979-12-24", userAddr: "서울시 송파구" },
  { userNo: 12, userName: "배ㅇㅇ", userId: "bae12", userEmail: "bae12@example.com", userPhone: "010-1212-1313", userBirth: "1968-11-20", userAddr: "서울시 광진구" },
  { userNo: 13, userName: "유ㅇㅇ", userId: "you13", userEmail: "you13@example.com", userPhone: "010-1313-1414", userBirth: "1989-04-15", userAddr: "경기도 용인시" },
  { userNo: 14, userName: "신ㅇㅇ", userId: "shin14", userEmail: "shin14@example.com", userPhone: "010-1414-1515", userBirth: "1994-06-09", userAddr: "경기도 성남시" },
  { userNo: 15, userName: "임ㅇㅇ", userId: "lim15", userEmail: "lim15@example.com", userPhone: "010-1515-1616", userBirth: "1998-04-05", userAddr: "광주시 서구" }
];

// DOM 요소
const tableBody = document.querySelector("#admin_user_table tbody");
const userTotalCount = document.getElementById("admin_tot_cnt");

// 모달 관련 요소
const modal = document.getElementById("aUser_detail");
const closeBtn = document.querySelector(".modal_close_btn");
const modalUserName = document.getElementById("dm_user_name");
const detailTableBody = document.querySelector("#aUser_detail_table tbody");

let courseData = [];


// 행 개수 드롭다운
rowSelect.addEventListener("change", function () {
  rowsPerPage = parseInt(this.value);
  rowCurrentPage = 1;
  renderTable(rowCurrentPage);
  renderPagination(users.length);
});

// 회원 목록 테이블 렌더링 함수
function renderTable(page) {
  tableBody.innerHTML = "";
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = users.slice(start, end);

  pageData.forEach((u, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${start + idx + 1}</td>
            <td><button class="admin_user_link" data-user="${u.userId}">${u.userName} (${u.userId})</button></td>
            <td>${u.userEmail}</td>
            <td>${u.userPhone}</td>
            <td>${u.userBirth}</td>
            <td>${u.userAddr}</td>
        `;
    tableBody.appendChild(tr);
  });
  userTotalCount.textContent = users.length.toString().padStart(2, "0");
}

// 회원 목록 페이징 처리
function changePage(page) {
  currentPage = page;
  renderTable(currentPage);
  renderPagination(users.length);
}

// 회원 수강 정보 모달
function openUserModal(userId) {
  const user = users.find(u => u.userId === userId);
  if (!user) return;

  // 회원 이름 표시
  modalUserName.textContent = `${user.userName} (${user.userId})`;
  modalCurrentPage = 1;

  // userId별 수강 정보
  courseData = [];

  if (userId === "kim01") {
    courseData = [
      { courseNo: 1, courseTitle: "심정지 발생 시 기본 CPR 교육", courseStart: "2025-01-01", courseEnd: "2025-01-31", courseProgress: "100%", courseScore: "95", courseStatus: "이수", courseCert: "발급 완료" }
    ];
  } else if (userId === "lee02") {
    courseData = [
      { courseNo: 1, courseTitle: "심정지 발생 시 기본 CPR 교육", courseStart: "2025-01-10", courseEnd: "2025-01-20", courseProgress: "100%", courseScore: "90", courseStatus: "이수", courseCert: "발급 완료" },
      { courseNo: 2, courseTitle: "화재 시 화상 응급 대처법", courseStart: "2025-02-01", courseEnd: "2025-02-10", courseProgress: "90%", courseScore: "87", courseStatus: "진행중", courseCert: "미발급" },
      { courseNo: 3, courseTitle: "기도막힘 상황에서의 119 신고 요령", courseStart: "2025-03-05", courseEnd: "2025-03-25", courseProgress: "70%", courseScore: "80", courseStatus: "진행중", courseCert: "미발급" }
    ];
  } else {
    courseData = [
      { courseNo: 1, courseTitle: "AED를 이용한 심정지 환자 구조 절차", courseStart: "2025-02-01", courseEnd: "2025-02-28", courseProgress: "100%", courseScore: "92", courseStatus: "이수", courseCert: "미발급" }
    ];
  }

  // 렌더링 실행
  renderModalTable(1);
  renderModalPagination(courseData.length);

  // 모달 표시
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// 수강 정보 테이블 렌더링
function renderModalTable(page) {
  detailTableBody.innerHTML = "";
  const start = (page - 1) * modalRowsPerPage;
  const end = start + modalRowsPerPage;
  const rows = courseData.slice(start, end);

  rows.forEach(c => {
    // 진도가 100%가 아니면 상태를 '진행중'으로 자동 변경
    let courseStatus = c.courseProgress !== "100%" ? "진행중" : "이수";

    // 이수증 버튼 활성화 조건
    let certBtn = "";

    if (c.courseCert === "발급 완료") {
      certBtn = `<button class="cert_btn" disabled>발급 완료</button>`;
    } else if (courseStatus === "이수" && c.courseScore >= 80) {
      // 진도 100% + 점수 80점 이상일 때만 발급 승인 가능
      certBtn = `<button class="cert_btn active">발급 승인</button>`;
    } else {
      // 아직 조건 미달이면 비활성 버튼
      certBtn = `<button class="cert_btn" disabled>발급 불가</button>`;
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.courseNo}</td>
      <td>${c.courseTitle}</td>
      <td>${c.courseStart}</td>
      <td>${c.courseEnd}</td>
      <td>${c.courseProgress}</td>
      <td>${c.courseScore}</td>
      <td>${courseStatus}</td>
      <td>${certBtn}</td>
    `;
    detailTableBody.appendChild(tr);
  });
}

// 모달 닫기
function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// 닫기 버튼 및 배경 클릭
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// 테이블 클릭 시 모달 열기
tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("admin_user_link")) {
    const userId = e.target.dataset.user;
    openUserModal(userId);
  }
});

// ‘발급 승인’ 버튼 클릭 이벤트 (이벤트 위임)
detailTableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("cert_btn") && e.target.classList.contains("active")) {
    e.target.textContent = "발급 완료";
    e.target.disabled = true;
    e.target.classList.remove("active");
  }
});

// 회원 수강 목록 페이지 변경
function changeModalPage(page) {
  modalCurrentPage = page;
  renderModalTable(modalCurrentPage)
  renderModalPagination(courseData.length);
}

// 초기 렌더링
renderTable(currentPage);
renderPagination(users.length);
