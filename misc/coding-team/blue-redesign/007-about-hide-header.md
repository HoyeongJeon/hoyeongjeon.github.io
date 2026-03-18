# 007 — About 페이지 헤더 요소 숨기기

## Context
About 페이지에서 브레드크럼("Home > About"), ArticleTitle("About"), ContentMeta("2025년 3월 17일, 1 min read")가 왼쪽 정렬로 남아있어 가운데 정렬된 본문과 어색하다. 이 요소들은 `beforeBody` 슬롯에 있어서 `article.about-page` CSS가 적용되지 않는다.

## Objective
About 페이지에서 브레드크럼, ArticleTitle, ContentMeta를 숨긴다. CSS로 처리.

## Scope
`quartz/styles/custom.scss`만 수정.

Quartz는 `cssclasses` frontmatter 값을 `article` 요소에 적용하지만, `beforeBody` 슬롯은 `article` 밖에 있다. 하지만 Quartz의 `renderPage.tsx`를 보면 페이지 구조가 다음과 같다:

```html
<div class="center">
  <div class="page-header">
    <!-- beforeBody 컴포넌트들 (Breadcrumbs, ArticleTitle, ContentMeta) -->
  </div>
  <article class="about-page">
    <!-- 본문 -->
  </article>
</div>
```

`article.about-page`의 형제 요소인 `.page-header`를 CSS로 숨길 수 있다. `:has()` 선택자를 사용:

```scss
// About 페이지에서 beforeBody 헤더 숨기기
.center:has(> article.about-page) > .page-header {
  display: none;
}
```

`:has()`는 모던 브라우저에서 충분히 지원된다 (Chrome 105+, Firefox 121+, Safari 15.4+).

만약 `.page-header`가 아닌 다른 클래스명이면 `renderPage.tsx`를 확인하여 정확한 선택자를 사용할 것.

## Non-goals
- 다른 페이지에 영향 없음
- 레이아웃 구조 변경 없음
