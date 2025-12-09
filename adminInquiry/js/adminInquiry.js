// 문의사항 더미 데이터
const inquiryList = [
  { inquiryNo: 1, userNo: 1, inquiryTitle: "수료증 발급이 안 돼요", inquiryType: "이수증 발급", inquiryRegDate: "2025-11-01", replyStatus: "답변대기" },
  { inquiryNo: 2, userNo: 2, inquiryTitle: "로그인이 자꾸 풀립니다", inquiryType: "시스템 문제", inquiryRegDate: "2025-11-02", replyStatus: "답변완료" },
  { inquiryNo: 3, userNo: 3, inquiryTitle: "동영상이 재생되지 않아요", inquiryType: "강의 관련", inquiryRegDate: "2025-11-02", replyStatus: "답변대기" },
  { inquiryNo: 4, userNo: 4, inquiryTitle: "포인트가 적립되지 않았어요", inquiryType: "시스템 문제", inquiryRegDate: "2025-11-03", replyStatus: "답변완료" },
  { inquiryNo: 5, userNo: 5, inquiryTitle: "퀴즈 정답이 틀린 것 같아요", inquiryType: "강의 관련", inquiryRegDate: "2025-11-03", replyStatus: "답변대기" },
  { inquiryNo: 6, userNo: 6, inquiryTitle: "비밀번호 변경이 안 됩니다", inquiryType: "회원정보", inquiryRegDate: "2025-11-04", replyStatus: "답변완료" },
  { inquiryNo: 7, userNo: 7, inquiryTitle: "강의 진도율이 안 올라가요", inquiryType: "강의 관련", inquiryRegDate: "2025-11-04", replyStatus: "답변대기" },
  { inquiryNo: 8, userNo: 8, inquiryTitle: "문의글 수정은 어디서 하나요?", inquiryType: "시스템 문제", inquiryRegDate: "2025-11-05", replyStatus: "답변완료" },
  { inquiryNo: 9, userNo: 9, inquiryTitle: "모바일에서 글씨가 너무 작아요", inquiryType: "시스템 문제", inquiryRegDate: "2025-11-05", replyStatus: "답변대기" },
  { inquiryNo: 10, userNo: 10, inquiryTitle: "회원탈퇴는 어디서 하나요?", inquiryType: "회원정보", inquiryRegDate: "2025-11-06", replyStatus: "답변완료" },
  { inquiryNo: 11, userNo: 11, inquiryTitle: "새로고침하면 데이터가 사라져요", inquiryType: "시스템 문제", inquiryRegDate: "2025-11-06", replyStatus: "답변대기" },
  { inquiryNo: 12, userNo: 12, inquiryTitle: "이메일 인증이 오지 않아요", inquiryType: "시스템 문제", inquiryRegDate: "2025-11-07", replyStatus: "답변완료" },
  { inquiryNo: 13, userNo: 13, inquiryTitle: "강의 영상 음성이 안 나와요", inquiryType: "강의 관련", inquiryRegDate: "2025-11-07", replyStatus: "답변대기" },
  { inquiryNo: 14, userNo: 14, inquiryTitle: "상점 포인트 사용이 안 됩니다", inquiryType: "시스템 문제", inquiryRegDate: "2025-11-08", replyStatus: "답변완료" },
  { inquiryNo: 15, userNo: 15, inquiryTitle: "수강 기간을 연장할 수 있나요?", inquiryType: "강의 관련", inquiryRegDate: "2025-11-08", replyStatus: "답변대기" },
  { inquiryNo: 16, userNo: 1, inquiryTitle: "프로필 사진이 안 바뀌어요", inquiryType: "회원정보", inquiryRegDate: "2025-11-09", replyStatus: "답변완료" }
];

const tbody = document.querySelector("#admin_inquiry_table tbody");
const inquiryTotalCount = document.getElementById("admin_tot_cnt");

// 문의사항 테이블 렌더링
function renderInquiryTable(page) {
  tbody.innerHTML = "";

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = inquiryList.slice(start, end);

  pageData.forEach((inq, idx) => {
    const user = users.find(u => u.userNo === inq.userNo) || { userName: "알 수 없음", userId: "-" };
    const isReplied = inq.replyStatus.trim() === "답변완료";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${start + idx + 1}</td>
      <td>${user.userName} (${user.userId})</td>
      <td>
        <a href="../adminInquiryReply/adminInquiryReply.html?no=${inq.inquiryNo}" class="inquiry_title_link">
          ${inq.inquiryTitle}
        </a>
      </td>
      <td>${inq.inquiryType}</td>
      <td>${inq.inquiryRegDate}</td>
      <td class="reply_status ${isReplied ? "complete" : "waiting"}">
        ${isReplied ? "답변완료" : "답변대기"}
      </td>
    `;
    tbody.appendChild(tr);
  });

  inquiryTotalCount.textContent = inquiryList.length.toString().padStart(2, "0");
}

// 행 개수 변경
rowSelect.addEventListener("change", function () {
  rowsPerPage = parseInt(this.value);
  currentPage = 1;
  renderInquiryTable(currentPage);
  renderPagination(inquiryList.length);
});

// 문의사항 목록 페이징 처리
function changePage(page) {
  currentPage = page;
  renderInquiryTable(currentPage);
  renderPagination(inquiryList.length);
}

// 초기 실행
document.addEventListener("DOMContentLoaded", () => {
  renderInquiryTable(currentPage);
  renderPagination(inquiryList.length);
});

