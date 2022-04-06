export const handleElButtonBlur = (e: any) => {
  let target = e.target;
  if (target.nodeName == "SPAN" || target.nodeName == "I") {
    target = e.target.parentNode;
  }
  target.blur();
};
