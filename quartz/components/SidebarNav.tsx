import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import style from "./styles/sidebarNav.scss"

interface NavLink {
  label: string
  href: string
}

interface Options {
  links: NavLink[]
}

const defaultLinks: NavLink[] = [
  { label: "Home", href: "" },
  { label: "Blog", href: "blog" },
  { label: "Projects", href: "projects" },
  { label: "About", href: "about" },
]

export default ((opts?: Options) => {
  const SidebarNav: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const baseDir = pathToRoot(fileData.slug!)
    const links = opts?.links ?? defaultLinks

    return (
      <nav class={classNames(displayClass, "sidebar-nav")}>
        <img
          class="profile-photo"
          src={joinSegments(baseDir, "profile.jpg")}
          alt="프로필 사진"
          width={130}
          height={130}
        />
        <ul>
          {links.map(({ label, href }) => (
            <li>
              <a href={joinSegments(baseDir, href)}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  SidebarNav.css = style
  return SidebarNav
}) satisfies QuartzComponentConstructor
