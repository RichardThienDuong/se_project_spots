export function renderLoading(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving...")
  {
  if (isLoading) {
    btn.textContent = loadingText;
  } else {
    btn.textContent = defaultText;
  }
}

export function handleSubmit(request, evt, loadingText = 'Saving...') {
  evt.preventDefault();
  let submitBtn;
  if (evt.submitter) {
    submitBtn = evt.submitter;
  } else {
    submitBtn = evt.target;
  }
  const initialText = submitBtn.textContent;
  renderLoading(submitBtn, true, initialText, loadingText);

  request()
    .then(() => {
      if (evt.target.tagName === 'FORM') {evt.target.reset(); }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(submitBtn, false, initialText, loadingText);
    });
}