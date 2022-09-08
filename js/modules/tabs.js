function tabs(tabsBtnSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  //tabs

  let tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector),
    tabsBtn = document.querySelectorAll(tabsBtnSelector);

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.remove("show", "fade");
      item.classList.add("hide");
    });

    tabsBtn.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("show", "fade");
    tabsBtn[i].classList.add(activeClass);
  }

  tabsParent.addEventListener("click", function(event) {
    const target = event.target;

    if (target && target.classList.contains(tabsBtnSelector.slice(1))) {
      tabsBtn.forEach((item, i) => {
        if (item == target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  hideTabContent();
  showTabContent();
}

export default tabs;
