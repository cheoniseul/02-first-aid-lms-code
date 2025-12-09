// URL에서 id 읽기
const params = new URLSearchParams(location.search);
const noticeId = parseInt(params.get("id"));

// 2) 더미데이터에서 해당 공지사항 찾기
let notice = null;
if (typeof noticeList !== "undefined") {
  notice = noticeList.find(n => n.noticeId === noticeId);
}

// 화면에 값 채우기
if (notice) {
  document.getElementById("editNoticeTitle").value = notice.noticeTitle;
  document.getElementById("editNoticeContent").value = notice.noticeContent;
}

// 취소 버튼 → 목록 페이지 이동
document.getElementById("admin_notice_cancelBtn").addEventListener("click", () => {
  location.href = "adminNoticeList.html";
});

// 수정 버튼
document.getElementById("admin_notice_editBtn").addEventListener("click", (e) => {
  e.preventDefault();
  alert("※ 이 화면은 프론트엔드 UI 구현용입니다.\n실제 수정 기능은 백엔드 연동 시 적용됩니다.");
});
