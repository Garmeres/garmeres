import Teaser from "../Teaser"
import LogoImage from "../image-components/LogoImage"
import LanguageSelector from "../index/LanguageSelector"
import RichText from "../RichText"
import ComponentNotFound from "./component_not_found"
import Page from "../Page"

const ComponentList = {
  teaser: Teaser,
  logo_image: LogoImage,
  language_selector: LanguageSelector,
  rich_text: RichText,
  page: Page,
}

const Components = type => {
  if (typeof ComponentList[type] === "undefined") {
    return ComponentNotFound
  }
  return ComponentList[type]
}

export default Components
