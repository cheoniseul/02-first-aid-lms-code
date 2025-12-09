// 더미 데이터(화면 확인용)
const courseList = [
  { courseId: 1, courseThumb: "../adminImg/course-cpr.png", courseTitle: "심정지 발생 시 기본 CPR 교육", courseCategory: "구조자 / 심정지", courseRegDate: "2025-01-01" },
  { courseId: 2, courseThumb: "../adminImg/course-burn.png", courseTitle: "화재 시 화상 응급 대처법", courseCategory: "자가 / 화상", courseRegDate: "2025-01-10" },
  { courseId: 3, courseThumb: "../adminImg/course-choking.png", courseTitle: "기도막힘 상황에서의 119 신고 요령", courseCategory: "자가 / 기도막힘", courseRegDate: "2025-01-15" },
  { courseId: 4, courseThumb: "../adminImg/course-cpr.png", courseTitle: "AED를 이용한 심정지 환자 구조 절차", courseCategory: "구조자 / 심정지", courseRegDate: "2025-01-20" },
  { courseId: 5, courseThumb: "../adminImg/course-bleeding.png", courseTitle: "교통사고 현장의 출혈 응급처치", courseCategory: "구조자 / 출혈", courseRegDate: "2025-01-25" },
  { courseId: 6, courseThumb: "../adminImg/course-burn.png", courseTitle: "일상 생활에서 발생하는 화상 응급처치", courseCategory: "자가 / 화상", courseRegDate: "2025-02-01" },
  { courseId: 7, courseThumb: "../adminImg/course-choking.png", courseTitle: "가정에서의 기도막힘 예방 및 초기 대응", courseCategory: "자가 / 기도막힘", courseRegDate: "2025-02-08" },
  { courseId: 8, courseThumb: "../adminImg/course-cpr.png", courseTitle: "심정지 초기 대응 절차", courseCategory: "구조자 / 심정지", courseRegDate: "2025-02-14" },
  { courseId: 9, courseThumb: "../adminImg/course-bleeding.png", courseTitle: "감전 사고 시 화상 및 출혈 응급조치", courseCategory: "구조자 / 출혈", courseRegDate: "2025-02-20" },
  { courseId: 10, courseThumb: "../adminImg/course-choking.png", courseTitle: "기도막힘 응급상황에서의 의사소통 요령", courseCategory: "자가 / 기도막힘", courseRegDate: "2025-02-25" },
  { courseId: 11, courseThumb: "../adminImg/course-choking.png", courseTitle: "학교에서 흔히 발생하는 기도막힘 응급처치", courseCategory: "자가 / 기도막힘", courseRegDate: "2025-03-01" },
  { courseId: 12, courseThumb: "../adminImg/course-bleeding.png", courseTitle: "자연재해 시 출혈 환자 응급대처", courseCategory: "구조자 / 출혈", courseRegDate: "2025-03-05" }
];

// 요소
const tbody = document.querySelector("#admin_courseList_table tbody");
const courseTotalCount = document.getElementById("admin_tot_cnt");

// 테이블 렌더링
function renderTable(page) {
  tbody.innerHTML = "";

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = courseList.slice(start, end);

  pageData.forEach((c, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${start + idx + 1}</td>
      <td><img src="${c.courseThumb}" alt="${c.courseTitle}"></td>
      <td>
        <div class="course_title_box">
          <p class="course_category">[${c.courseCategory}]</p>
          <a href="../adminCourseEdit/adminCourseEdit.html?id=${c.courseId}" class="course_link">${c.courseTitle}</a>
        </div>
      </td>
      <td>관리자</td>
      <td>${c.courseRegDate}</td>
      <td><button class="admin_delete_btn" data-course-id="${c.courseId}">삭제</button></td>
    `;
    tbody.appendChild(tr);
  });

  courseTotalCount.textContent = courseList.length.toString().padStart(2, "0");
  attachDeleteEvents();
}

// 삭제 버튼 이벤트
function attachDeleteEvents() {
  document.querySelectorAll(".admin_delete_btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const courseId = parseInt(e.target.dataset.courseId);
      const confirmDelete = confirm("정말로 해당 강의를 삭제하시겠습니까?");
      if (confirmDelete) {
        const index = courseList.findIndex(c => c.courseId === courseId);
        if (index !== -1) {
          courseList.splice(index, 1);
          alert("강의가 삭제되었습니다.");
          renderTable(currentPage);
          renderPagination(courseList.length);
        }
      }
    });
  });
}

// 행 개수 변경
rowSelect.addEventListener("change", function () {
  rowsPerPage = parseInt(this.value);
  currentPage = 1;
  renderTable(currentPage);
  renderPagination(courseList.length);
});

// 강의 목록 페이징 처리
function changePage(page) {
  currentPage = page;
  renderTable(currentPage);
  renderPagination(courseList.length);
}

// 초기 실행
renderTable(currentPage);
renderPagination(courseList.length);
