/**
 ** ********************************************************
 ** @file popupManager.js
 ** @author wenkanglin <wenkang_lin@kingdee.com>
 ** @date 2017-12-05 14:01:11
 ** @last_modified_by zhongxian_liang <zhongxian_liang@kingdee.com>
 ** @last_modified_date 2018-07-02 15:00:36
 ** @copyright (c) 2018 @yfe/aldnoah-templates
 ** ********************************************************
 */

class PopupManager {
  constructor(maxSize, yOffset) {
    this.cache = [];
    this.yOffset = yOffset || 60;
    this.maxSize = maxSize || 3;
  }

  push(ele) {
    const bottomVal = window.parseInt(PopupManager.getBottomVal(ele.dom));

    this.recycleDestroyed();
    if (this.cache.length >= this.maxSize) {
      this.cache.splice(0, 1)[0].ele.close();
    }
    this.cache.forEach((obj) => {
      obj.bottom += this.yOffset;
      obj.ele.dom.style.bottom = `${obj.bottom}px`;
    });

    this.cache.push({ ele, bottom: bottomVal });
  }

  recycleDestroyed() {
    for (let i = 0; i < this.cache.length; i += 1) {
      if (this.cache[i].ele._isDestroyed) {
        this.cache.splice(i, 1);
        i -= 1;
      }
    }
  }

  static getBottomVal(ele) {
    return window.getComputedStyle(ele).getPropertyValue('bottom');
  }
}

export default PopupManager;
