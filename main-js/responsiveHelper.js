// responsiveHelper.js
//響應式尺寸處理函式
export function handleResponsiveResize(widthsize, state) {
  const width = window.innerWidth;

  if (width < widthsize && !state.hasAutoClosed) {
    state.sidebar = false;
    state.hasAutoClosed = true;
    state.hasAutoOpened = false;
  }

  if (width > widthsize && !state.hasAutoOpened) {
    state.sidebar = true;
    state.hasAutoOpened = true;
    state.hasAutoClosed = false;
  }

  state.itemsPerPage = width < 670 ? 4 : 9;
}