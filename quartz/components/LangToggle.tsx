// @ts-ignore
import langToggleScript from "./scripts/langToggle.inline"
// @ts-ignore
import langToggleBeforeScript from "./scripts/langToggle.beforeDOMLoaded.inline"
import styles from "./styles/langToggle.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const LangToggle: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <button class={classNames(displayClass, "lang-toggle")} aria-label="언어 전환">
      <span class="lang-ko">한</span>
      <span class="lang-en">EN</span>
    </button>
  )
}

LangToggle.beforeDOMLoaded = langToggleBeforeScript
LangToggle.afterDOMLoaded = langToggleScript
LangToggle.css = styles

export default (() => LangToggle) satisfies QuartzComponentConstructor
