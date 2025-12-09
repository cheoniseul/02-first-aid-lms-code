// URL에서 id 읽기
const params = new URLSearchParams(location.search);
const eduId = parseInt(params.get("id"));

// 더미데이터에서 해당 교육자료 찾기
const edu = eduList.find(e => e.eduId === eduId);

// 화면에 값 채우기
if (edu) {
  document.getElementById("editEduTitle").value = edu.eduTitle;
  document.getElementById("editEduDesc").value = edu.eduContent;
  document.getElementById("editEduMainSelect").value = edu.eduMain || "";
  document.getElementById("editEduSubSelect").value = edu.eduSub || "";
}

// 취소 버튼 → 목록 페이지 이동
document.getElementById("admin_edu_cancelBtn").addEventListener("click", () => {
  location.href = "adminEduList.html";
});

// 수정 버튼 (저장 동작 X → 안내만)
document.getElementById("admin_edu_editBtn").addEventListener("click", (e) => {
  e.preventDefault();
  alert("※ 이 화면은 프론트엔드 UI 구현용입니다.\n실제 데이터 수정 기능은 백엔드 연동 시 적용됩니다.");
});
