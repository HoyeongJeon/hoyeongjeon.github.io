const savedLang = localStorage.getItem("lang") ?? "ko"
document.documentElement.setAttribute("saved-lang", savedLang)
