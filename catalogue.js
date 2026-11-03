const searchForm = document.querySelector("#search-form");
const titleInput = document.querySelector("#title-search");
const authorInput = document.querySelector("#author-search");
const categoryInput = document.querySelector("#category-search");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const books = document.querySelectorAll(".book");
const roleSelect = document.querySelector("#role");
const roleLinks = document.querySelectorAll("[data-role]");

function filterBooks() {
  const title = titleInput.value.trim().toLowerCase();
  const author = authorInput.value.trim().toLowerCase();
  const category = categoryInput.value;
  let count = 0;

  for (const book of books) {
    const bookTitle = book.querySelector("h3").textContent.toLowerCase();
    const bookAuthor = book.querySelector(".author").textContent.toLowerCase();
    const matches = bookTitle.includes(title)
      && bookAuthor.includes(author)
      && (!category || book.dataset.category === category);

    book.hidden = !matches;
    if (matches) count += 1;
  }

  resultCount.textContent = count === 1 ? "1 book found" : `${count} books found`;
  emptyState.hidden = count !== 0;
}

function showRoleLinks() {
  for (const links of roleLinks) {
    links.hidden = links.dataset.role !== roleSelect.value;
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  filterBooks();
});

searchForm.addEventListener("reset", () => {
  requestAnimationFrame(filterBooks);
});

roleSelect.addEventListener("change", showRoleLinks);
filterBooks();
showRoleLinks();
