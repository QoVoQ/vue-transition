import kebabCase from 'lodash.kebabcase';

// @TODO use animation ?

function setProps(modifiers, props) {
  modifiers.forEach((item) => {
    if (Number.isNaN(Number(item))) props.event = item;
    else props.transition = item;
  });
}

function styleObjToCSSText(obj) {
  return `${Object.keys(obj)
    .map(key => `${kebabCase(key)}:${obj[key]}`)
    .join('; ')};`;
}

function getNormalizedStyle(style) {
  return styleObjToCSSText(style);
}

function addClearHandler(ele, ctnDOM) {
  ele.addEventListener(
    'transitionend',
    (event) => {
      if (event.propertyName === 'transform') {
        event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        return;
      }

      if (event.propertyName === 'background-color') {
        // ele.removeEventListener('transitionend', null, false);
        ctnDOM.parentNode.removeChild(ctnDOM);
      }
    },
    false,
  );
}

function rippler(event, el, binding, props) {
  const target = el;
  const bg = binding.value || 'rgba(0, 0, 0, 0.35)';
  // Get necessary variables
  const { left, top } = target.getBoundingClientRect();
  const width = target.offsetWidth;
  const height = target.offsetHeight;
  const dx = event.clientX - left;
  const dy = event.clientY - top;
  const maxX = Math.max(dx, width - dx);
  const maxY = Math.max(dy, height - dy);
  const style = window.getComputedStyle(target);
  const radius = Math.sqrt(maxX * maxX + maxY * maxY);

  // Create the ripple and its container
  const ripple = document.createElement('div');
  const rippleContainer = document.createElement('div');

  addClearHandler(ripple, rippleContainer);
  // Styles for ripple
  const rippleStyle = {
    position: 'absolute',
    zIndex: '999',
    top: `${dy - radius}px`,
    left: `${dx - radius}px`,
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    transform: 'scale(0)',
    transition: `all ${props.transition}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    borderRadius: '50%',
    pointerEvents: 'none',
    backgroundColor: bg,
  };
  ripple.style.cssText = getNormalizedStyle(rippleStyle);
  // ripple.classList.add('vue-ripple-l');

  // Styles for rippleContainer
  const rippleCtnStyle = {
    position: 'absolute',
    left: `${left +
      ((window.pageXOffset || document.scrollLeft) -
        (document.clientLeft || 0) || 0)}px`,
    top: `${top +
      ((window.pageYOffset || document.scrollTop) - (document.clientTop || 0) ||
        0)}px`,
    width: `${width}px`,
    height: `${height}px`,
    pointerEvents: 'none',
    overflow: 'hidden',
    borderTopLeftRadius: style.borderTopLeftRadius,
    borderTopRightRadius: style.borderTopRightRadius,
    borderBottomLeftRadius: style.borderBottomLeftRadius,
    borderBottomRightRadius: style.borderBottomRightRadius,
    direction: 'ltr',
  };

  rippleContainer.style.cssText = getNormalizedStyle(rippleCtnStyle);

  rippleContainer.appendChild(ripple);
  document.body.appendChild(rippleContainer);

  // add 100ms delay to trigger transition
  setTimeout(() => {
    // @TODO need proper prefix
    ripple.style.transform = 'scale(1)';
  }, 100);
}

function rippleDirective(el, binding) {
  // Default values.
  const props = {
    event: 'click',
    transition: 600,
  };

  setProps(Object.keys(binding.modifiers), props);

  el.addEventListener(props.event, (event) => {
    rippler(event, el, binding, props);
  });
}

export default {
  bind: rippleDirective,
  // update: rippleDirective
};
