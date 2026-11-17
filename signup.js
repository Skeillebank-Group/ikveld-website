// Launch signup: posts to Brevo (double opt-in) and shows the answer in place.
// Without JavaScript the form still posts to Brevo, which shows its own page.
document.querySelectorAll("form[data-signup]").forEach(function (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    var msg = form.querySelector(".signup-msg");
    var btn = form.querySelector("button");
    if (form.elements.email_address_check.value) return; // a bot filled the hidden field
    btn.disabled = true;
    msg.className = "signup-msg";
    msg.textContent = "Sending…";
    try {
      var res = await fetch(form.action, { method: "POST", body: new FormData(form) });
      var data = await res.json().catch(function () { return {}; });
      if (!res.ok || data.success === false) throw new Error("not saved");
      form.classList.add("done");
      msg.classList.add("ok");
      msg.textContent = "Nearly there. Check your inbox and tap the link, and you're on the list.";
    } catch (err) {
      msg.classList.add("err");
      msg.textContent = "That didn't go through on our side. Try again in a minute, or email hello@ikveld.com.";
      btn.disabled = false;
    }
  });
});
