document.addEventListener("nav", () => {
  const contentKo = document.getElementById("content-ko")
  const contentEn = document.getElementById("content-en")
  const hasLangContent = contentKo && contentEn

  // 한/영 콘텐츠가 없는 페이지에서는 토글 버튼 숨김
  for (const btn of document.getElementsByClassName("lang-toggle")) {
    ;(btn as HTMLElement).style.display = hasLangContent ? "" : "none"
  }

  if (!hasLangContent) return

  const applyLang = (lang: string) => {
    document.documentElement.setAttribute("saved-lang", lang)
    localStorage.setItem("lang", lang)
    contentKo.style.display = lang === "ko" ? "" : "none"
    contentEn.style.display = lang === "en" ? "" : "none"
  }

  // 초기 적용
  const currentLang = localStorage.getItem("lang") ?? "ko"
  applyLang(currentLang)

  const switchLang = () => {
    const current = document.documentElement.getAttribute("saved-lang") ?? "ko"
    applyLang(current === "ko" ? "en" : "ko")
  }

  for (const btn of document.getElementsByClassName("lang-toggle")) {
    btn.addEventListener("click", switchLang)
    window.addCleanup(() => btn.removeEventListener("click", switchLang))
  }
})
