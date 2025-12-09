// FAQ 더미데이터 (화면 확인용)
const faqList = [
    { faqId: 1, faqTitle: "회원가입은 어떻게 하나요?", faqContent: "상단 메뉴의 회원가입 버튼을 눌러 정보를 입력하면 가입이 완료됩니다.", faqRegDate: "2025-11-05" },
    { faqId: 2, faqTitle: "비밀번호를 잊어버렸어요.", faqContent: "로그인 페이지에서 ‘비밀번호 찾기’를 통해 재설정이 가능합니다.", faqRegDate: "2025-11-04" },
    { faqId: 3, faqTitle: "강의 수강 기간은 얼마인가요?", faqContent: "강의별 수강 가능 기간은 강의 상세 페이지에서 안내하고 있습니다.", faqRegDate: "2025-11-02" },
    { faqId: 4, faqTitle: "수료증은 어디서 발급받나요?", faqContent: "나의강의실 > 수료증 메뉴에서 직접 발급할 수 있습니다.", faqRegDate: "2025-11-01" },
    { faqId: 5, faqTitle: "응급처치 게임은 PC에서만 가능한가요?", faqContent: "모바일에서도 플레이 가능하지만 PC 환경에서 더 안정적입니다.", faqRegDate: "2025-10-30" },
    { faqId: 6, faqTitle: "문의사항 답변은 얼마나 걸리나요?", faqContent: "영업일 기준 1~2일 내에 답변드리고 있습니다.", faqRegDate: "2025-10-29" },
    { faqId: 7, faqTitle: "강의 영상이 재생되지 않아요.", faqContent: "브라우저 새로고침 또는 캐시 삭제 후 다시 시도해 주세요.", faqRegDate: "2025-10-27" },
    { faqId: 8, faqTitle: "포인트는 어디에 사용하나요?", faqContent: "포인트 상점에서 상품 구매 시 사용할 수 있습니다.", faqRegDate: "2025-10-25" },
    { faqId: 9, faqTitle: "회원정보는 어떻게 수정하나요?", faqContent: "마이페이지 내 프로필 수정에서 변경이 가능합니다.", faqRegDate: "2025-10-23" },
    { faqId: 10, faqTitle: "수강 취소가 가능한가요?", faqContent: "강의 시작 전이라면 취소 가능하며 시작 후에는 제한될 수 있습니다.", faqRegDate: "2025-10-20" },
    { faqId: 11, faqTitle: "게임 데이터는 저장되나요?", faqContent: "스테이지 기록 및 점수는 자동으로 서버에 저장됩니다.", faqRegDate: "2025-10-18" },
    { faqId: 12, faqTitle: "교육자료는 어디서 다운로드하나요?", faqContent: "학습자료 메뉴에서 원하는 자료를 선택해 다운로드할 수 있습니다.", faqRegDate: "2025-10-15" }
];

const tbody = document.querySelector("#admin_faq_table tbody");
const faqTotalCount = document.getElementById("admin_tot_cnt");

// faq 테이블 렌더링 함수
function renderFaqTable(page) {
    tbody.innerHTML = "";

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = faqList.slice(start, end);

    pageData.forEach((f, idx) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
    <tr>
      <td>${start + idx + 1}</td>
      <td>
        <a href="adminFaqEdit.html?id=${f.faqId}" class="faq_title_link">${f.faqTitle}</a>
      </td>
      <td>${f.faqContent}</td>
      <td>관리자</td>
      <td>${f.faqRegDate}</td>
      <td>
        <button class="admin_delete_btn" data-faq-id="${f.faqId}">삭제</button>
      </td>
    </tr>
    `;
        tbody.appendChild(tr);
    });
    faqTotalCount.textContent = faqList.length.toString().padStart(2, "0");
    attachDeleteEvents();
}

// 삭제 버튼 이벤트
function attachDeleteEvents() {
    document.querySelectorAll(".admin_delete_btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const faqId = parseInt(e.target.dataset.faqId);
            const confirmDelete = confirm("정말로 FAQ를 삭제하시겠습니까?");
            if (confirmDelete) {
                const index = faqList.findIndex(f => f.faqId === faqId);
                if (index !== -1) {
                    faqList.splice(index, 1);
                    alert("FAQ가 삭제되었습니다.");
                    renderFaqTable(currentPage);
                    renderPagination(faqList.length);
                }
            }
        });
    });
}

// 행 개수 변경
rowSelect.addEventListener("change", function () {
    rowsPerPage = parseInt(this.value);
    currentPage = 1;
    renderFaqTable(currentPage);
    renderPagination(faqList.length);
});

// faq 목록 페이징 처리
function changePage(page) {
    currentPage = page;
    renderFaqTable(currentPage);
    renderPagination(faqList.length);
}

// 초기 실행
renderFaqTable(currentPage);
renderPagination(faqList.length);