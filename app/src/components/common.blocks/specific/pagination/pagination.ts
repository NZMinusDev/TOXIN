import "./__counter/pagination__counter.scss";
import "./__item/pagination__item.scss";
import "./__list/pagination__list.scss";
import "./__item/_active/pagination__item_active.scss";
import "./__item/_next/pagination__item_next.scss";
import "./__item/_previous/pagination__item_previous.scss";

document.addEventListener("DOMContentLoaded", () => {
  const createPaginationItem = (
    linkText: string,
    linkClickListener: (this: HTMLAnchorElement, ev: MouseEvent) => any,
    listItemClasses: Array<string>
  ): HTMLLIElement => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.innerText = linkText;
    listItem.classList.add(...listItemClasses);
    listItem.insertAdjacentElement("afterbegin", link);
    listItem.addEventListener("click", linkClickListener);
    return listItem;
  };

  function createPagination(
    target: HTMLElement,
    pages: number,
    page: number
    // displayAmount: number,
    // totalAmount: number
  ) {
    let list = document.createElement("ul");
    list.classList.add("pagination__list");
    let active;
    let pageCutLow = page - 1;
    let pageCutHigh = page + 1;
    // Show the Previous button only if you are on a page other than the first
    if (page > 1) {
      list.insertAdjacentElement(
        "beforeend",
        createPaginationItem("arrow_back", () => createPagination(target, pages, page - 1), [
          "pagination__item",
          "pagination__item_previous",
        ])
      );
    }
    // Show all the pagination elements if there are less than 6 pages total
    if (pages < 6) {
      for (let p = 1; p <= pages; p++) {
        active = page == p ? "pagination__item_active" : null;
        list.insertAdjacentElement(
          "beforeend",
          createPaginationItem(
            p + "",
            () => createPagination(target, pages, p),
            ["pagination__item", active].filter((element) => element !== null)
          )
        );
      }
    }
    // Use "..." to collapse pages outside of a certain range
    else {
      // Show the very first page followed by a "..." at the beginning of the
      // pagination section (after the Previous button)
      if (page > 2) {
        list.insertAdjacentElement(
          "beforeend",
          createPaginationItem("1", () => createPagination(target, pages, 1), ["pagination__item"])
        );
        if (page > 3) {
          list.insertAdjacentElement(
            "beforeend",
            createPaginationItem("...", () => createPagination(target, pages, page - 2), [
              "pagination__item",
              "pagination__item_out-of-range",
            ])
          );
        }
      }
      // Determine how many pages to show after the current page index
      if (page === 1) {
        pageCutHigh += 1;
      } else if (page === 2) {
        // pageCutHigh += 1;
      }
      // Determine how many pages to show before the current page index
      if (page === pages) {
        pageCutLow -= 1;
      } else if (page === pages - 1) {
        // pageCutLow -= 1;
      }
      // Output the indexes for pages that fall inside the range of pageCutLow
      // and pageCutHigh
      for (let p = pageCutLow; p <= pageCutHigh; p++) {
        if (p === 0) {
          p += 1;
        }
        if (p > pages) {
          continue;
        }
        active = page == p ? "pagination__item_active" : null;
        list.insertAdjacentElement(
          "beforeend",
          createPaginationItem(
            p + "",
            () => createPagination(target, pages, p),
            ["pagination__item", active].filter((element) => element !== null)
          )
        );
      }
      // Show the very last page preceded by a "..." at the end of the pagination
      // section (before the Next button)
      if (page < pages - 1) {
        if (page < pages - 2) {
          list.insertAdjacentElement(
            "beforeend",
            createPaginationItem("...", () => createPagination(target, pages, page + 2), [
              "pagination__item",
              "pagination__item_out-of-range",
            ])
          );
        }
        list.insertAdjacentElement(
          "beforeend",
          createPaginationItem(pages + "", () => createPagination(target, pages, pages), [
            "pagination__item",
          ])
        );
      }
    }
    // Show the Next button only if you are on a page other than the last
    if (page < pages) {
      list.insertAdjacentElement(
        "beforeend",
        createPaginationItem(
          "arrow_forward",
          () => createPagination(target, pages, page + 1),
          ["pagination__item", "pagination__item_next"]
        )
      );
    }
    // update pagination after item click
    const usedList = target.querySelector(".pagination__list");
    if (usedList) {
      usedList.replaceWith(list);
    } else {
      target.insertAdjacentElement("afterbegin", list);
    }
    //update counter
    let counterElement = document.createElement("p");
    counterElement.classList.add("pagination__counter");
    counterElement.innerText =
      (page - 1) * parseInt(target.dataset["amountToDisplay"]) +
      1 +
      " - " +
      page * parseInt(target.dataset["amountToDisplay"]) +
      " из " +
      target.dataset["totalAmount"] +
      (target.dataset["totalAmount"].length > target.dataset["amountToDisplay"].length
        ? "+ "
        : " ") +
      target.dataset.text;
    const usedCounter = target.querySelector(".pagination__counter");
    if (usedCounter) {
      usedCounter.replaceWith(counterElement);
    } else {
      target.insertAdjacentElement("afterbegin", counterElement);
    }

    return list;
  }

  document.querySelectorAll(".pagination").forEach((paginationItem: HTMLElement) => {
    paginationItem.insertAdjacentElement(
      "afterbegin",
      createPagination(
        paginationItem,
        parseInt(paginationItem.dataset.pages),
        parseInt(paginationItem.dataset.page)
      )
    );
  });
});
