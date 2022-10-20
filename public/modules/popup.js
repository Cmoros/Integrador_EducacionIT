const container = document.querySelector('body')

export default  {
  inDom : false,
  container,
  init(message) {
    this.message = message;
    if (this.inDom) {
      // this.resetPopup(message)
    } else {
      this.popupEl = this.createPopup()
      this.appendPopup();
      this.removePopup();
    }
  },

  createPopup(message = this.message) {
    
    const popupEl = document.createElement('div')
    popupEl.innerHTML = `<div class="popup showhide">${message}</div>`
    return popupEl;

  },
  appendPopup(container = this.container, popupEl = this.popupEl) {
    this.inDom = true;
    const popupFrag = new DocumentFragment()
    popupFrag.appendChild(popupEl)
    container.append(popupFrag);
  },

  removePopup(time = 3000, popupEl = this.popupEl) {
    this.time = time;
    this.timeoutId = setTimeout(() => {
      popupEl.remove()
      this.inDom = false;
    }, time)
    return this.timeoutId;
  },

  isPopupInDom() {
    return this.inDom;
  },

  resetPopup(message, timeoutId = this.timeoutId, time = this.time) {
    clearTimeout(timeoutId);
    return this.removePopup()
  },


}