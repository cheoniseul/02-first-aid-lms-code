// 더미데이터 (화면 확인용)
const noticeList = [
  { noticeId: 1, noticeTitle: "11월 응급처치 교육 일정 변경 안내", noticeContent: "교육장 내부 공사로 인해 일부 강의 일정이 변경되었습니다. 변경된 일정은 '교육 일정' 메뉴에서 확인해주세요.", noticeRegDate: "2025-11-07" },
  { noticeId: 2, noticeTitle: "신규 강의 ‘심폐소생술 실습’ 오픈 안내", noticeContent: "실습 중심의 CPR 강의가 추가되었습니다. 신청은 강의 목록에서 가능합니다.", noticeRegDate: "2025-11-02" },
  { noticeId: 3, noticeTitle: "정기 서버 점검 안내", noticeContent: "11월 1일(토) 00:00 ~ 02:00 동안 시스템 점검이 진행됩니다. 점검 시간에는 일부 서비스 이용이 제한됩니다.", noticeRegDate: "2025-10-28" },
  { noticeId: 4, noticeTitle: "교육자료 다운로드 오류 수정 완료", noticeContent: "일부 PDF 자료 다운로드 오류가 해결되었습니다. 불편을 드려 죄송합니다.", noticeRegDate: "2025-10-22" },
  { noticeId: 5, noticeTitle: "마이페이지 정보 수정 기능 개선", noticeContent: "회원 정보 수정 화면이 개선되어 더욱 편리하게 이용하실 수 있습니다.", noticeRegDate: "2025-10-18" },
  { noticeId: 6, noticeTitle: "응급·안전 교육 콘텐츠 업데이트", noticeContent: "화상 응급처치 및 기도막힘 대처법 등 신규 교육자료가 추가되었습니다.", noticeRegDate: "2025-10-12" },
  { noticeId: 7, noticeTitle: "포인트 상점 임시 중단 안내", noticeContent: "10월 5일(일) 오전 중 포인트 상점 시스템 점검이 예정되어 있습니다.", noticeRegDate: "2025-10-04" },
  { noticeId: 8, noticeTitle: "교육 플랫폼 ‘LIFE SAVER’ 정식 오픈!", noticeContent: "응급 및 안전 교육을 온라인으로 학습할 수 있는 플랫폼이 정식 오픈했습니다.", noticeRegDate: "2025-09-30" },
  { noticeId: 9, noticeTitle: "9월 신규 사용자 가입 이벤트 안내", noticeContent: "신규 가입자 대상 웰컴 포인트 지급 이벤트가 진행 중입니다.", noticeRegDate: "2025-09-25" },
  { noticeId: 10, noticeTitle: "아동 안전교육 자료 추가", noticeContent: "유아 및 아동 대상 응급처치 교육자료가 새롭게 등록되었습니다.", noticeRegDate: "2025-09-20" },
  { noticeId: 11, noticeTitle: "응급처치 가이드 개정 반영 안내", noticeContent: "2025년 최신 응급처치 지침이 교육자료에 반영되었습니다.", noticeRegDate: "2025-09-15" }
];

const tbody = document.querySelector("#admin_notice_table tbody");
const noticeTotalCount = document.getElementById("admin_tot_cnt");

// 공지사항 테이블 렌더링 함수
function renderNoticeTable(page) {
    tbody.innerHTML = "";

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = noticeList.slice(start, end);

    pageData.forEach((n, idx) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
    <tr>
      <td>${start + idx + 1}</td>
      <td>
        <a href="../adminNoticeEdit/adminNoticeEdit.html?id=${n.noticeId}" class="notice_title_link">${n.noticeTitle}</a>
      </td>
      <td>${n.noticeContent}</td>
      <td>관리자</td>
      <td>${n.noticeRegDate}</td>
      <td>
        <button class="admin_delete_btn" data-notice-id="${n.noticeId}">삭제</button>
      </td>
    </tr>
    `;
        tbody.appendChild(tr);
    });
    noticeTotalCount.textContent = noticeList.length.toString().padStart(2, "0");
    attachDeleteEvents();
}

// 삭제 버튼 이벤트
function attachDeleteEvents() {
    document.querySelectorAll(".admin_delete_btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const noticeId = parseInt(e.target.dataset.noticeId);
            const confirmDelete = confirm("정말로 공지사항을 삭제하시겠습니까?");
            if (confirmDelete) {
                const index = noticeList.findIndex(n => n.noticeId === noticeId);
                if (index !== -1) {
                    noticeList.splice(index, 1);
                    alert("공지사항이 삭제되었습니다.");
                    renderNoticeTable(currentPage);
                    renderPagination(noticeList.length);
                }
            }
        });
    });
}

// 행 개수 변경
rowSelect.addEventListener("change", function () {
    rowsPerPage = parseInt(this.value);
    currentPage = 1;
    renderNoticeTable(currentPage);
    renderPagination(noticeList.length);
});

// 공지사항 목록 페이징 처리
function changePage(page) {
    currentPage = page;
    renderNoticeTable(currentPage);
    renderPagination(noticeList.length);
}

// 초기 실행
renderNoticeTable(currentPage);
renderPagination(noticeList.length);
