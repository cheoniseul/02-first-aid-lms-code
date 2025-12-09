// 썸네일 미리보기
const thumbInput = document.getElementById("editCourseThumb");
const thumbPreview = document.getElementById("editThumbPreview");

if (thumbInput) {
  thumbInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        thumbPreview.src = e.target.result;
        thumbPreview.style.display = "block";
      };

      reader.readAsDataURL(file);
    } else {
      // 파일이 제거되었을 때 미리보기 숨김
      thumbPreview.src = "";
      thumbPreview.style.display = "none";
    }
  });
}

// 수정 페이지 작동
// url에서 id 읽기
const params = new URLSearchParams(location.search);
const courseId = parseInt(params.get("id"));

// 더미데이터에서 해당 강의 찾기
const course = courseList.find(c => c.courseId === courseId);

// 화면에 값 채우기
if (course) {

  // 강의명
  document.getElementById("editCourseTitle").value = course.courseTitle;

  // 대주제 (자가/구조자)
  document.getElementById("editCourseMainSelect").value = course.courseCategory;

  // 세부 주제 (출혈/기도막힘/심정지/골절)
  // 세부 주제는 courseTitle을 기준으로 자동 판단 가능
  const subSelect = document.getElementById("editCourseSubSelect");

  if (course.courseTitle.includes("출혈")) subSelect.value = "출혈";
  else if (course.courseTitle.includes("기도")) subSelect.value = "기도 막힘";
  else if (course.courseTitle.includes("심정지") || course.courseTitle.includes("CPR")) subSelect.value = "심정지";
  else if (course.courseTitle.includes("화상")) subSelect.value = "화상";

  // 과정 설명 (없으면 기본 문구 넣기)
  document.getElementById("editCourseDesc").value =
    course.courseDesc || `${course.courseTitle} 과정에 대한 설명입니다.`;

  // 썸네일 미리보기
  document.getElementById("editThumbPreview").src = course.courseThumb;


  // 영상 정보 (더미데이터가 없어서 빈값 유지)
  document.getElementById("editVideoTitle1").value = course.videoTitle1 || "";
  document.getElementById("editCaption1").value = course.caption1 || "";

  document.getElementById("editVideoTitle2").value = course.videoTitle2 || "";
  document.getElementById("editCaption2").value = course.caption2 || "";

  document.getElementById("editVideoTitle3").value = course.videoTitle3 || "";
  document.getElementById("editCaption3").value = course.caption3 || "";
}

// 취소 버튼, 목록으로 이동
document.getElementById("admin_course_cancelBtn").addEventListener("click", () => {
  location.href = "adminCourseList.html";
});

// 수정 버튼 (실제 저장은 안 됨)
document.getElementById("admin_course_editBtn").addEventListener("click", (e) => {
  e.preventDefault();
  alert("※ 이 화면은 프론트엔드 구현용입니다.\n실제 수정 기능은 백엔드 연동 시 적용됩니다.");
});