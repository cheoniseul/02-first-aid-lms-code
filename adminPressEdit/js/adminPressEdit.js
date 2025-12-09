// URL 파라미터(id) 가져오기
const params = new URLSearchParams(location.search);
const pressId = parseInt(params.get("id"));

// 더미데이터에서 해당 보도자료 찾기
let press = null;
if (typeof pressList !== "undefined") {
  press = pressList.find(p => p.pressId === pressId);
}

// 화면에 값 채우기
if (press) {
  document.getElementById("editPressTitle").value = press.pressTitle;
  document.getElementById("editPressContent").value = press.pressContent;

  // URL 방식
  if (press.pressLink) {
    document.getElementById("editPressLink").value = press.pressLink;
  }
}

// 취소 버튼
document.getElementById("admin_press_cancelBtn").addEventListener("click", () => {
  location.href = "adminPressList.html";
});

// 수정 버튼
document.getElementById("admin_press_editBtn").addEventListener("click", (e) => {
  e.preventDefault();
  alert("※ 이 화면은 프론트엔드 UI 구현용입니다.\n실제 수정 기능은 백엔드 연동 시 적용됩니다.");
});
