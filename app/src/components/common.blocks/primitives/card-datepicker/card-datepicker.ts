import { WindowHrefHelper } from "@utils/devTools/devTools";

import "@common.blocks/primitives/apply-control/apply-control.scss";
import "@common.blocks/primitives/apply-control/__clear-btn-js/apply-control__clear-btn-js.scss";
import "@common.blocks/primitives/apply-control/__clear-btn-js/_isHidden/apply-control__clear-btn-js_isHidden.scss";
import "@common.blocks/primitives/apply-control/__apply-btn-js/apply-control__apply-btn-js.scss";

$(function () {
  const datePickers = $(".datepicker-here.card-datepicker");
  const CONTROL = `<div class="apply-control"><input class="apply-control__clear-btn-js apply-control__clear-btn-js_isHidden" type="button" value="очистить"><input class="apply-control__apply-btn-js" type="button" value="применить"></div>`;
  const windowHrefHelper = new WindowHrefHelper();

  datePickers.each(function () {
    const datePicker = $(this);
    const input = datePicker.prev("input[type='hidden']");

    datePicker.datepicker({
      prevHtml: `arrow_back`,
      nextHtml: `arrow_forward`,
      dateFormat: datePicker.data("range") ? "dd M" : "dd.mm.yyyy",
      minDate: new Date(),
      toggleSelected: false,
      onSelect: (formattedDate, date, inst) => {
        datePicker
          .find(".apply-control__clear-btn-js")
          .removeClass("apply-control__clear-btn-js_isHidden");

        input.attr("data-formatted-date", formattedDate);
        input.trigger("select", [formattedDate, date]);
      },
    });

    $(CONTROL).insertAfter(datePicker.find(".datepicker--content"));
    const clearBtn = datePicker.find(".apply-control .apply-control__clear-btn-js");
    const applyBtn = datePicker.find(".apply-control .apply-control__apply-btn-js");
    clearBtn.on("click", function (jqEvent: JQuery.ClickEvent) {
      jqEvent.stopPropagation();

      datePicker.data("datepicker").clear();

      input.val(null);

      this.classList.add("apply-control__clear-btn-js_isHidden");
    });
    applyBtn.on("click", function (jqEvent: JQuery.ClickEvent) {
      jqEvent.stopPropagation();

      input.val(datePicker.data("datepicker").selectedDates.map((date) => date.toISOString()));

      if (datePicker.attr("isFilter")) windowHrefHelper.addValue(input.attr("name"), input.val());
    });

    const dates = windowHrefHelper.getValue(input.attr("name")) || input.val();
    if (dates) {
      input.val(dates);

      datePicker
        .data("datepicker")
        .selectDate(dates.split(",").map((datestring) => new Date(datestring)));
    }
  });
});
