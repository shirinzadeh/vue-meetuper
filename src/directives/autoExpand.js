export default {
  bind(el) {
    /**koddan evvel textareada uzun metn yazanda scroll yaranirdi
       koddan sonra scroll yaranmir, textarea metnin uzunlugu qeder height artir
     */
    el.__AutoResizer__ = () => {
      setTimeout(() => {
        //adding style="height" into html textarea
        el.style.cssText = 'height: auto'
        /** +2 px yaziilmasinda sebeb, textareanin ozunun 1px borderi var. el.scrollHeight goturende border daxil olmur */
        const height = el.scrollHeight + 2
        el.style.cssText = 'height:' + height + 'px'
      }, 0)
    }

    el.addEventListener('keydown', el.__AutoResizer__)
  },
  unbind(el) {
    el.removeEventListener('keydown', el.__AutoResizer__)
  }
}