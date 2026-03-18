# 004 — About 페이지 가운데 정렬 스타일

## Context
About 페이지(`content/about.md`)의 내용을 가운데 정렬하여 Charles Chen 사이트의 자기소개 영역처럼 깔끔하게 보이게 한다.

## Objective
About 페이지의 본문 콘텐츠를 가운데 정렬 스타일로 적용한다.

## Scope
`quartz/styles/custom.scss`에 About 페이지 전용 스타일 추가.

Quartz는 각 페이지의 slug를 `<body>` 또는 콘텐츠 영역의 data attribute로 전달하지 않으므로, About 페이지에만 스타일을 적용하는 방법이 필요하다.

**방법**: `content/about.md`의 frontmatter에 `cssclasses: ["about-page"]`를 추가하면 Quartz가 해당 클래스를 article 요소에 적용한다. 이 클래스를 기반으로 스타일링.

단, Quartz가 `cssclasses` frontmatter를 지원하는지 먼저 확인할 것. 지원하지 않으면 대안으로 `custom.scss`에서 slug 기반 선택자를 사용하거나, 간단히 About 페이지의 마크다운 내용을 `<div class="about-page">` 로 감싸는 방법을 사용.

### 스타일 방향
- 텍스트 가운데 정렬 (`text-align: center`)
- 최대 너비 제한 (예: `600px`)으로 읽기 편한 폭 유지
- 수평 가운데 배치 (`margin: 0 auto`)
- 리스트 항목은 `list-style: none`으로 깔끔하게, 가운데 정렬
- 구분선(`---`)은 짧고 가운데 정렬

## Non-goals
- About 페이지 내용 변경 (스타일만)
- 커스텀 컴포넌트 생성 (CSS만으로 해결)

## Constraints
- `custom.scss`에만 추가 (새 파일 생성 불필요)
- Quartz의 기존 클래스 구조를 활용
