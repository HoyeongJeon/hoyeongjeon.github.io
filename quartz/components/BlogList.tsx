import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { byDateAndAlphabetical } from "./PageList"
import { Date, getDate } from "./Date"
import style from "./styles/blogList.scss"
// @ts-ignore
import script from "./scripts/blogList.inline"

const INITIAL_BATCH = 5

const BlogList: QuartzComponent = ({ allFiles, fileData, cfg }: QuartzComponentProps) => {
  const blogPosts = allFiles
    .filter((f) => {
      const slug = f.slug ?? ""
      return slug.startsWith("blog/") && !slug.endsWith("/index")
    })
    .sort(byDateAndAlphabetical(cfg))

  const hasMore = blogPosts.length > INITIAL_BATCH

  return (
    <div class="blog-list">
      <ul class="blog-list-ul">
        {blogPosts.map((page, index) => {
          const title = page.frontmatter?.title ?? "Untitled"
          const date = getDate(cfg, page)
          const description = page.description ?? ""
          const isHidden = index >= INITIAL_BATCH

          return (
            <li class={`blog-list-item${isHidden ? " hidden" : ""}`} data-index={index}>
              <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                <h3>{title}</h3>
                {date && (
                  <p class="meta">
                    <Date date={date} locale={cfg.locale} />
                  </p>
                )}
                {description && <p class="description">{description}</p>}
              </a>
            </li>
          )
        })}
      </ul>
      {hasMore && (
        <button id="load-more-btn" data-batch={INITIAL_BATCH}>
          더 보기
        </button>
      )}
    </div>
  )
}

BlogList.css = style
BlogList.afterDOMLoaded = script

export default (() => BlogList) satisfies QuartzComponentConstructor
