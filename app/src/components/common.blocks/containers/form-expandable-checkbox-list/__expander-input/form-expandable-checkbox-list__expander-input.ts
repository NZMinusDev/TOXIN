const expanderCheckboxes = document.querySelectorAll<HTMLInputElement>(
  '.form-expandable-checkbox-list__expander-input'
);

const onChange = (event: Event) => {
  const expanderCheckbox = event.currentTarget as HTMLInputElement;
  const list = expanderCheckbox.nextElementSibling as HTMLDivElement;

  if (expanderCheckbox.checked) {
    list.style.maxHeight = `${list.scrollHeight}px`;
  } else {
    list.style.maxHeight = '';
  }
};

expanderCheckboxes.forEach((expanderCheckbox) => {
  const list = expanderCheckbox.nextElementSibling as HTMLDivElement;

  if (expanderCheckbox.checked) {
    list.style.maxHeight = `${list.scrollHeight}px`;
  }

  expanderCheckbox.addEventListener('change', onChange);
});
