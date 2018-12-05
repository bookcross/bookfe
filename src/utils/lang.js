export default {
  setLang(name,lang) {
    window.localStorage.setItem(name, lang)
  },
  getLang(name) {
    let localLang = window.localStorage.getItem(name)
    return localLang
  },
  removeItem(name){
    let localLang = window.localStorage.removeItem(name)
    return localLang
  }

}
