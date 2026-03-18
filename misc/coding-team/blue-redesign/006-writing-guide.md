# 006 — 콘텐츠 작성 가이드 (CLAUDE.md 업데이트)

## Context
한/영 토글 기능이 추가되었으므로, 콘텐츠 작성 규칙에 한/영 이중 언어 작성법을 추가해야 한다.

## Objective
`CLAUDE.md`의 "콘텐츠 작성 규칙" 섹션에 한/영 작성 가이드를 추가한다.

## Scope
`CLAUDE.md` 한 파일만 수정.

"콘텐츠 작성 규칙" 섹션 끝에 다음 내용 추가:

```markdown
### 한/영 이중 언어 작성

영어 버전을 함께 제공하고 싶은 글은 마크다운 안에 HTML div 구조를 사용한다:

\```markdown
---
title: "제목"
date: 2025-03-17
tags: [tag1]
draft: false
---

<div id="content-ko">

한국어 내용을 여기에 작성.

## 소제목

본문...

</div>

<div id="content-en">

English content here.

## Subtitle

Body text...

</div>
\```

**규칙:**
- `<div id="content-ko">` 안에 한국어, `<div id="content-en">` 안에 영어
- div 태그와 마크다운 내용 사이에 빈 줄 필수 (마크다운 파싱을 위해)
- div 안에서 마크다운 문법 그대로 사용 가능 (제목, 리스트, 코드블록 등)
- 영어 버전이 없는 글은 평소처럼 순수 마크다운으로 작성 (div 불필요)
- 한/영 div가 있는 페이지에서만 사이드바에 한/영 토글 버튼이 표시됨
```

## Non-goals
- CLAUDE.md의 다른 섹션 변경
