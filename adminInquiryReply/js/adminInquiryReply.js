document.addEventListener("DOMContentLoaded", () => {
    // URL에서 문의 ID 읽기
    const params = new URLSearchParams(location.search);
    const inqId = parseInt(params.get("no"));

    // 문의글 데이터(더미에서 가져오도록)
    const inquiry = inquiryList.find(i => i.inqId === inqId);

    if (inquiry) {
        document.getElementById("inqUser").textContent = `${inquiry.inqUserName} (${inquiry.inqUserId})`;
        document.getElementById("inqType").textContent = inquiry.inqType;
        document.getElementById("inqTitle").textContent = inquiry.inqTitle;
        document.getElementById("inqContent").textContent = inquiry.inqContent;
    }

    const replyForm = document.getElementById("admin_inq_reply_form");
    const replyContent = document.getElementById("replyContent");
    const replyList = document.getElementById("admin_inq_reply_list");

    /* ===== 답변 등록 ===== */
    replyForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const content = replyContent.value.trim();
        if (!content) {
            alert("답변 내용을 입력하세요.");
            return;
        }

        const now = new Date();
        const dateStr = now.toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });

        const replyItem = document.createElement("div");
        replyItem.classList.add("admin_inq_reply_item");
        replyItem.innerHTML = `
      <div class="reply_header">
        <div class="reply_left">
          <strong class="reply_author">관리자</strong>
            <div class="reply_btns">
                <button class="reply_edit_btn">수정</button>
                <button class="reply_delete_btn">삭제</button>
            </div>
        </div>
        <div class="reply_right">
          <span class="reply_date">${dateStr}</span>
        </div>
      </div>
      <div class="reply_content">${content}</div>
    `;

        replyList.prepend(replyItem);
        console.log("replyList =", replyList);

        replyContent.value = "";
    });

    /* ===== 수정 / 삭제 ===== */
    replyList.addEventListener("click", (e) => {
        const target = e.target;

        // 삭제
        if (target.classList.contains("reply_delete_btn")) {
            if (confirm("정말 삭제하시겠습니까?")) {
                target.closest(".admin_inq_reply_item").remove();
            }
        }

        // 수정
        if (target.classList.contains("reply_edit_btn")) {
            const replyItem = target.closest(".admin_inq_reply_item");
            const contentDiv = replyItem.querySelector(".reply_content");

            // 이미 수정 중이면 무시
            if (replyItem.querySelector(".reply_edit_area")) return;

            const oldText = contentDiv.textContent;

            // textarea로 변환
            const textarea = document.createElement("textarea");
            textarea.classList.add("reply_edit_area");
            textarea.value = oldText;
            contentDiv.replaceWith(textarea);

            // 버튼 전환
            target.textContent = "저장";
            target.classList.add("save_mode");

            // 저장 이벤트 (한 번만 실행)
            const saveHandler = () => {
                const newText = textarea.value.trim() || oldText;

                const newContent = document.createElement("div");
                newContent.classList.add("reply_content");
                newContent.textContent = newText;

                textarea.replaceWith(newContent);

                // 버튼 복원
                target.textContent = "수정";
                target.classList.remove("save_mode");
            };

            target.addEventListener("click", saveHandler, { once: true });
        }
    });
});
