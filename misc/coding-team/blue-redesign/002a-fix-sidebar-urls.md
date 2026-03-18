# 002a — SidebarNav URL 수정

## Context
SidebarNav에서 `${baseDir}${href}` 문자열 연결을 사용하는데, `baseDir`가 `"../.."`이고 `href`가 `/blog`이면 `"../..//blog"` (이중 슬래시)가 된다.

## Objective
URL 구성을 `resolveRelative` 또는 `joinSegments`를 사용하도록 수정한다.

## Scope
`quartz/components/SidebarNav.tsx` 한 파일만 수정.

방법: `resolveRelative(fileData.slug!, href as SimpleSlug)` 사용하거나, 더 간단하게 defaultLinks의 href에서 선행 `/`를 제거하고 `joinSegments(baseDir, href)`를 사용.

가장 간단한 방법: defaultLinks의 href를 `/blog` → `blog`로 변경하고, `joinSegments(baseDir, href)`를 사용.

```ts
import { pathToRoot, joinSegments } from "../util/path"
// ...
<a href={joinSegments(baseDir, href)}>{label}</a>
```

그리고 defaultLinks:
```ts
{ label: "Home", href: "" },  // 루트
{ label: "Blog", href: "blog" },
{ label: "Projects", href: "projects" },
{ label: "About", href: "about" },
```

Home의 경우 `joinSegments(baseDir, "")` → `baseDir` 자체가 되어 루트를 가리킨다. 이것이 올바른지 확인 필요 — `joinSegments(".", "")` → `"."` ✓, `joinSegments("../..", "")` → `"../.."` ✓.

## Non-goals
- 다른 변경 없음
