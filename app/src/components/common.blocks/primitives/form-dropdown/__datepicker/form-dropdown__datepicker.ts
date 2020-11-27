$(function () {
  const dropdowns = $(".form-dropdown").has(".form-dropdown__datepicker-btn");
  const openingDropdownButtons = dropdowns.find(".form-dropdown__datepicker-btn");
  const datePickers = openingDropdownButtons.find(".form-dropdown__datepicker");

  datePickers.each(function () {
    const dropdown = dropdowns.has(this);
    const openingButton = openingDropdownButtons.has(this);
    const datePicker = $(this);
    const input = datePicker.prev("input[type='hidden']");
    const selection = datePicker.next(".form-dropdown__selection-text");
    const clearBtn = datePicker.find(".apply-control__clear-btn-js");
    const applyBtn = datePicker.find(".apply-control__apply-btn-js");

    datePicker.datepicker({
      classes: "form-dropdown__calendar-js form-dropdown__calendar_isHidden-js",
    });

    selection.text(input.attr("data-formatted-date") || selection.attr("placeholder"));

    let lastFormattedDate = input.attr("data-formatted-date");
    input.on("select", (jqEvent, formattedDate: string, date: Date | Array<Date>) => {
      lastFormattedDate = formattedDate;
    });

    openingButton.on("click", (jqEvent: JQuery.ClickEvent) => {
      datePicker
        .find(".form-dropdown__calendar-js")
        .removeClass("form-dropdown__calendar_isHidden-js");
    });

    clearBtn.on("click", function (jqEvent: JQuery.ClickEvent) {
      selection.text(selection.attr("placeholder"));

      dropdown.trigger("valueIsChanged", [input.val()]);
    });
    applyBtn.on("click", function (jqEvent: JQuery.ClickEvent) {
      datePicker
        .find(".form-dropdown__calendar-js")
        .addClass("form-dropdown__calendar_isHidden-js");

      selection.text(lastFormattedDate || selection.attr("placeholder"));

      dropdown.trigger("valueIsChanged", [input.val()]);
    });
  });
});
