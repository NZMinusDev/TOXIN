$(function () {
  const datepicker = $(".datepicker-here");

  datepicker.datepicker({
    prevHtml: `arrow_back`,
    nextHtml: `arrow_forward`,
    classes: "form-dropdown__calendar form-dropdown__calendar_isHidden",
    toggleSelected: false,
    minDate: new Date(),
    onSelect: (formattedDate, date, inst) => {
      $(inst.el)
        .find(".form-dropdown__clear-btn-js")
        .removeClass("form-dropdown__clear-btn-js_isHidden");

      $(".form-field").has(inst.el).find(".form-dropdown__selection-text").text(formattedDate);
    },
  });

  const clearDatepickerDisplay = (datepicker: HTMLElement) => {
    $(".form-field")
      .has(datepicker)
      .find(".form-dropdown__selection-text")
      .text(datepicker.getAttribute("placeholder"));

    $(datepicker).val(datepicker.dataset.placeholder);
  };
  datepicker.each(function () {
    clearDatepickerDisplay(this);

    $(this).on("click", (jqEvent: JQuery.ClickEvent) => {
      $(this).find(".form-dropdown__calendar").removeClass("form-dropdown__calendar_isHidden");
    });
  });

  const control = `<div class="form-dropdown__link-btns"><input class="form-dropdown__clear-btn-js form-dropdown__clear-btn-js_isHidden" type="button" value="очистить"><input class="form-dropdown__apply-btn-js" type="button" value="применить"></div>`;
  $(control).insertAfter(datepicker.find(".datepicker--content"));

  $(".form-dropdown__calendar .form-dropdown__link-btns").each(function () {
    const applyBtn = $(this).find(".form-dropdown__apply-btn-js");
    const clearBtn = $(this).find(".form-dropdown__clear-btn-js");

    applyBtn.on("click", function (jqEvent: JQuery.ClickEvent) {
      jqEvent.stopPropagation();

      datepicker
        .has(this)
        .find(".form-dropdown__calendar")
        .addClass("form-dropdown__calendar_isHidden");
    });
    clearBtn.on("click", function (jqEvent: JQuery.ClickEvent) {
      jqEvent.stopPropagation();

      const targetDatepicker = datepicker.has(this);
      targetDatepicker.data("datepicker").clear();
      clearDatepickerDisplay(targetDatepicker[0]);

      this.classList.add("form-dropdown__clear-btn-js_isHidden");
    });
  });
});
