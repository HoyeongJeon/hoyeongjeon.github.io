# 003 — 홈페이지 블로그 목록 + 더 보기 버튼

## Context
홈페이지(`content/index.md`)에 최신 블로그 글을 제목+날짜+본문 미리보기 형태로 나열해야 한다. 처음 5개만 보이고, "더 보기" 버튼을 누르면 5개씩 추가로 표시.

Quartz의 Description 플러그인이 각 페이지에 `file.data.description` (150자 내외 텍스트 요약)을 이미 생성하고 있다.

## Objective
커스텀 컴포넌트 `BlogList`를 만들어 홈페이지의 `afterBody` 슬롯에 배치한다. 인덱스 페이지에서만 렌더링되도록 `ConditionalRender`로 감싼다.

## Scope

### 새 컴포넌트: `BlogList`
- `quartz/components/BlogList.tsx` 생성
- `quartz/components/styles/blogList.scss` 생성
- `quartz/components/index.ts`에 export 추가

#### 서버 사이드 렌더링 (TSX)
- `allFiles`에서 블로그 글만 필터 (`slug`가 `blog/`로 시작하는 것, 인덱스 페이지 제외)
- 날짜 기준 내림차순 정렬 (기존 `byDateAndAlphabetical` 사용)
- **모든** 글을 `<li>` 로 렌더링하되, 6번째부터는 `class="hidden"` 추가 (CSS로 `display: none`)
- 각 항목 구조:
  ```html
  <li class="blog-list-item" data-index="0">
    <a href="..." class="internal">
      <h3>제목</h3>
      <p class="meta">날짜</p>
      <p class="description">본문 미리보기...</p>
    </a>
  </li>
  ```
- 글이 5개 초과일 때만 "더 보기" 버튼 렌더링:
  ```html
  <button id="load-more-btn" data-batch="5">더 보기</button>
  ```

#### 클라이언트 사이드 JS (`afterDOMLoaded`)
- "더 보기" 버튼 클릭 시 다음 5개의 `.hidden` 항목에서 `hidden` 클래스 제거
- 더 이상 숨겨진 항목이 없으면 버튼 숨김

```ts
BlogList.afterDOMLoaded = `
  const btn = document.getElementById("load-more-btn")
  if (btn) {
    btn.addEventListener("click", () => {
      const hiddenItems = document.querySelectorAll(".blog-list-item.hidden")
      const batch = parseInt(btn.dataset.batch || "5")
      const toShow = Array.from(hiddenItems).slice(0, batch)
      toShow.forEach(item => item.classList.remove("hidden"))
      if (document.querySelectorAll(".blog-list-item.hidden").length === 0) {
        btn.style.display = "none"
      }
    })
  }
`
```

**주의**: Quartz SPA 모드에서 `afterDOMLoaded` 스크립트는 페이지 전환 시 다시 실행되지 않을 수 있다. Quartz의 SPA 네비게이션은 `nav` 이벤트를 발생시킨다. `document.addEventListener("nav", ...)` 패턴을 사용해야 한다. 기존 컴포넌트들(예: `quartz/components/scripts/darkmode.inline.ts`)을 참고하여 올바른 패턴을 사용할 것.

### 레이아웃 변경: `quartz.layout.ts`
`sharedPageComponents.afterBody`에 추가:
```ts
afterBody: [
  Component.ConditionalRender({
    component: Component.BlogList(),
    condition: (page) => page.fileData.slug === "index",
  }),
],
```

### 콘텐츠 변경: `content/index.md`
기존 수동 링크 목록 제거. 간단한 인사말만 남김:
```markdown
---
title: "전호영"
draft: false
---

안녕하세요. 저는 백엔드 개발자 전호영 입니다.

시스템을 설계하고, 코드로 구현하고, 글로 기록합니다.
```

### 스타일
- Stavros' Stuff 참고: 각 항목 사이에 충분한 간격, 제목은 크게, 날짜는 작고 흐리게, 미리보기는 본문 색상
- "더 보기" 버튼: 전체 너비, 테두리 스타일, 호버 시 배경색 변화
- `.hidden` 클래스: `display: none`

## Non-goals
- 페이지네이션 (URL 기반)
- 태그 표시
- 썸네일 이미지

## Constraints
- 기존 Quartz 컴포넌트 패턴 준수
- `resolveRelative` 사용하여 링크 생성
- `byDateAndAlphabetical` 사용하여 정렬
- `Date` 컴포넌트 사용하여 날짜 포맷
- SPA 모드 호환 (`document.addEventListener("nav", ...)` 패턴)
