# 005 — 한/영 토글 컴포넌트

## Context
마크다운 콘텐츠에 `<div id="content-ko">`, `<div id="content-en">` 구조가 있을 때 한국어/영어를 전환하는 토글 버튼이 필요하다. 다크모드 토글 옆(왼쪽 사이드바 Flex 줄)에 배치한다.

## Objective
`LangToggle` 컴포넌트를 만들어 사이드바에 배치. 클라이언트 JS로 언어 전환.

## Scope

### 새 컴포넌트: `LangToggle`
- `quartz/components/LangToggle.tsx`
- `quartz/components/scripts/langToggle.inline.ts`
- `quartz/components/styles/langToggle.scss`
- `quartz/components/index.ts`에 export 추가

#### TSX (서버 렌더링)
Darkmode 컴포넌트 패턴을 따른다. 단순한 버튼:
```tsx
<button class={classNames(displayClass, "lang-toggle")} aria-label="언어 전환">
  <span class="lang-ko">한</span>
  <span class="lang-en">EN</span>
</button>
```

두 span 중 현재 활성 언어만 보이도록 CSS로 제어. 기본값은 한국어.

#### 클라이언트 JS (`langToggle.inline.ts`)
**beforeDOMLoaded** (페이지 깜빡임 방지):
```ts
const savedLang = localStorage.getItem("lang") ?? "ko"
document.documentElement.setAttribute("saved-lang", savedLang)
```

**afterDOMLoaded** (`document.addEventListener("nav", ...)` 패턴):
```ts
document.addEventListener("nav", () => {
  const contentKo = document.getElementById("content-ko")
  const contentEn = document.getElementById("content-en")
  const hasLangContent = contentKo && contentEn

  // 한/영 콘텐츠가 없는 페이지에서는 토글 버튼 숨김
  for (const btn of document.getElementsByClassName("lang-toggle")) {
    (btn as HTMLElement).style.display = hasLangContent ? "" : "none"
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
```

#### 스타일
Darkmode 버튼과 동일한 크기/스타일 톤. 텍스트 기반 버튼:
- 버튼 크기: Darkmode와 비슷 (20px 너비 정도, 높이 32px)
- 현재 언어 텍스트만 표시 (한 → 클릭 → EN → 클릭 → 한)
- `saved-lang` attribute 기반으로 CSS 전환:
  ```scss
  :root[saved-lang="ko"] .lang-toggle .lang-en { display: none; }
  :root[saved-lang="ko"] .lang-toggle .lang-ko { display: inline; }
  :root[saved-lang="en"] .lang-toggle .lang-ko { display: none; }
  :root[saved-lang="en"] .lang-toggle .lang-en { display: inline; }
  // 기본 (속성 없을 때) = 한국어
  :root:not([saved-lang]) .lang-toggle .lang-en { display: none; }
  ```

### 레이아웃 변경: `quartz.layout.ts`
Flex 줄에 LangToggle 추가:
```ts
Component.Flex({
  components: [
    { Component: Component.Search(), grow: true },
    { Component: Component.Darkmode() },
    { Component: Component.LangToggle() },
  ],
}),
```
`defaultContentPageLayout`과 `defaultListPageLayout` 모두 동일하게 적용.

## Non-goals
- 자동 번역
- URL 기반 언어 전환
- 언어별 별도 파일 구조

## Constraints
- Darkmode 컴포넌트 패턴 정확히 따를 것 (beforeDOMLoaded + afterDOMLoaded 분리)
- `beforeDOMLoaded`는 별도 스크립트 문자열로 분리하지 않아도 됨 — Darkmode처럼 inline으로 처리
- SPA 모드 호환 필수 (`document.addEventListener("nav", ...)` + `window.addCleanup`)
- Flex 컴포넌트가 자식의 `beforeDOMLoaded`, `afterDOMLoaded`, `css`를 자동으로 수집하므로 별도 등록 불필요
