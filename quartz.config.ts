import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "전호영",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: false,
    analytics: null,
    locale: "ko-KR",
    baseUrl: "hoyeongjeon.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      // weight 는 400/500/600 만 받아온다. Quartz 기본값은 header 에 700 을
      // 포함시키는데, DESIGN.md §3 이 700 이상을 금지하므로 명시적으로 덮어쓴다.
      typography: {
        header: { name: "Geist", weights: [400, 500, 600] },
        body: { name: "Geist", weights: [400, 500, 600] },
        code: { name: "Geist Mono", weights: [400, 500] },
      },
      // 색상 팔레트는 DESIGN.md §2 기준. 배경·텍스트는 무채색으로만 두고,
      // accent 는 #0072f5 계열 하나만 사용한다.
      colors: {
        lightMode: {
          light: "#fafafa", // background primary
          lightgray: "#ebebeb", // surface hover / 경계선
          gray: "#8f8f8f", // text muted
          darkgray: "#4d4d4d", // text secondary (본문)
          dark: "#171717", // text primary (헤딩)
          secondary: "#0072f5", // interactive accent
          tertiary: "#005fcc", // 같은 계열의 어두운 hover 단계
          highlight: "#f2f2f2", // background recessed
          textHighlight: "rgba(0, 114, 245, 0.14)",
        },
        // DESIGN.md 는 light mode 만 정의한다. 아래 값은 같은 규칙
        // (무채색 + 단일 accent)을 다크에 옮긴 것이며, accent 로 쓴 #52aeff 는
        // DESIGN.md §2 status 팔레트의 cyan 값이다.
        darkMode: {
          light: "#0a0a0a",
          lightgray: "#2e2e2e",
          gray: "#8f8f8f",
          darkgray: "#a1a1a1",
          dark: "#ededed",
          secondary: "#52aeff",
          tertiary: "#8fc9ff",
          highlight: "#1a1a1a",
          textHighlight: "rgba(82, 174, 255, 0.18)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
