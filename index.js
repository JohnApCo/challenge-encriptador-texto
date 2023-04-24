const d = document;
const $textareaIn = d.querySelector(".textarea--in");
const $textareaOut = d.querySelector(".textarea--out");
const $textOut = d.querySelector(".text-out");
const $textIn = d.querySelector(".text-in");

function openPopup(type, text) {
  let animation = {
    success: "https://assets9.lottiefiles.com/packages/lf20_pqnfmone.json",
    error: "https://assets8.lottiefiles.com/packages/lf20_qpwbiyxf.json",
  }[type];
  d.querySelector("#popup lottie-player").load(animation);
  d.getElementById("popup").classList.add("popup--active");
  d.querySelector("#popup .card__title").textContent = type;
  d.querySelector("#popup .card__content").textContent = text;
}

function getOffset(el) {
  var _x = 0;
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}
function handleEncrypter(text, encrypt = true) {
  let initialText = text;
  const values = [
    { letter: "e", encryptedLetter: "enter" },
    { letter: "i", encryptedLetter: "imes" },
    { letter: "a", encryptedLetter: "ai" },
    { letter: "o", encryptedLetter: "ober" },
    { letter: "u", encryptedLetter: "ufat" },
  ];
  let regex = new RegExp("");
  values.forEach((el) => {
    if (encrypt) {
      regex = new RegExp(el.letter, "g");
      text = text.replaceAll(regex, el.encryptedLetter);
    } else {
      regex = new RegExp(el.encryptedLetter, "g");
      text = text.replaceAll(regex, el.letter);
    }
  });
  return text;
}

const handleInputTextarea = (event) => {
  if (event.target === $textareaOut) {
    if (event.target.value === "") {
      $textOut.classList.add("empty");
    } else {
      $textOut.classList.remove("empty");
    }
  }
  if (event.target === $textareaIn || event.target === $textareaOut) {
    if (window.innerWidth < 1024) {
      event.target.style.height = `0px`;
      event.target.style.height = `${event.target.scrollHeight + 2}px`;
    }
  }
  if (event.target === $textareaIn) {
    if (/[A-ZÀ-ÿ\u00f1\u00d1]/g.test($textareaIn.value)) {
      d.getElementById("error-message").classList.add("text-error");
    } else {
      d.getElementById("error-message").classList.remove("text-error");
    }
  }
};

const handleClick = (event) => {
  if (
    event.target === d.getElementById("encrypt") ||
    event.target === d.getElementById("decrypt")
  ) {
    let newString = "";
    if ($textareaIn.value !== "") {
      if (event.target === d.getElementById("encrypt")) {
        if (/[A-ZÀ-ÿ\u00f1\u00d1]/g.test($textareaIn.value)) {
          openPopup("error", `Solo letras minúsculas y sin acentos.`);
        } else {
          openPopup("success", `Encriptado con éxito.`);
        }
      } else {
        openPopup("success", "Desencriptado con éxito.");
      }
      newString = handleEncrypter(
        $textareaIn.value,
        event.target === d.getElementById("encrypt")
      );
    } else {
      openPopup("error", "El campo de texto esta vacío.");
    }
    $textareaOut.value = newString;
    // Add css and remove in case of empty textarea
    newString === ""
      ? $textOut.classList.add("empty")
      : $textOut.classList.remove("empty");
    // text output resize height
    if (window.innerWidth < 1024) {
      $textareaOut.style.height = `0px`;
      $textareaOut.style.height = `${$textareaOut.scrollHeight}px`;
      // scroll to textarea output
      window.scroll({
        top: getOffset($textOut).top,
        behavior: "smooth",
      });
    }
  }
  if (event.target === d.getElementById("copy")) {
    $textareaOut.select();
    $textareaOut.setSelectionRange(0, 99999);
    // Copy the text inside the text field
    navigator.clipboard.writeText($textareaOut.value);
    // Alert the copied text
    openPopup("success", "Copiado con éxito.");
  }
  if (event.target === d.querySelector("#popup .button")) {
    d.getElementById("popup").classList.remove("popup--active");
  }
  if (event.target === d.getElementById("clear")) {
    console.log("clear", $textareaIn.value);
    $textareaIn.value = "";
    $textareaOut.value = "";
    $textOut.classList.add("empty");
  }
};

d.addEventListener("input", handleInputTextarea);
d.addEventListener("click", handleClick);
