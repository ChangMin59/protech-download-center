const searchInput = document.getElementById("programSearch");
const filterButtons = document.querySelectorAll(".filter");
const programCards = document.querySelectorAll(".program-card");
const emptyResult = document.getElementById("emptyResult");

let activeFilter = "all";

function normalizeText(value) {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
}

function applyProgramFilter() {
  const keyword = normalizeText(searchInput.value);
  let visibleCount = 0;

  programCards.forEach((card) => {
    const category = card.dataset.category || "";
    const title = normalizeText(card.dataset.title || card.textContent);

    const matchesCategory = activeFilter === "all" || category === activeFilter;
    const matchesKeyword = keyword === "" || title.includes(keyword);

    if (matchesCategory && matchesKeyword) {
      card.classList.remove("hidden");
      visibleCount += 1;
    } else {
      card.classList.add("hidden");
    }
  });

  emptyResult.classList.toggle("show", visibleCount === 0);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    activeFilter = button.dataset.filter || "all";
    applyProgramFilter();
  });
});

searchInput.addEventListener("input", applyProgramFilter);

document.querySelectorAll('a[download]').forEach((link) => {
  link.addEventListener("click", () => {
    const filePath = link.getAttribute("href");

    if (!filePath) {
      alert("다운로드 파일 경로가 설정되지 않았습니다.");
    }
  });
});

applyProgramFilter();