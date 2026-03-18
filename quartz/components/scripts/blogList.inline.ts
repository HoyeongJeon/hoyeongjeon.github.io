document.addEventListener("nav", () => {
  const btn = document.getElementById("load-more-btn")
  if (!btn) return

  const handleLoadMore = () => {
    const hiddenItems = document.querySelectorAll(".blog-list-item.hidden")
    const batch = parseInt((btn as HTMLButtonElement).dataset.batch || "5")
    const toShow = Array.from(hiddenItems).slice(0, batch)
    toShow.forEach((item) => item.classList.remove("hidden"))
    if (document.querySelectorAll(".blog-list-item.hidden").length === 0) {
      btn.style.display = "none"
    }
  }

  btn.addEventListener("click", handleLoadMore)
  window.addCleanup(() => btn.removeEventListener("click", handleLoadMore))
})
