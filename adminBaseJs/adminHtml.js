// 공통 헤더 html
fetch("../adminBaseHtml/adminHeader.html")
    .then(res => res.text())
    .then(data => document.getElementById("admin_header_html").innerHTML = data);

// 공통 사이드바 html
fetch("../adminBaseHtml/adminSidebar.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("admin_sidebar_html").innerHTML = data;
        initSidebarCommon();
    });
    
// 공통 푸터 html
fetch("../adminBaseHtml/adminFooter.html")
    .then(res => res.text())
    .then(data => document.getElementById("admin_footer_html").innerHTML = data);