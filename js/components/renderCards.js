export default function renderCards(html, domElm) {
  if (typeof html !== 'string') {
    return;
  }
  document.querySelector(domElm).innerHTML += html;
}
