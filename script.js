const questionPage = document.getElementById("questionPage");
const successPage = document.getElementById("successPage");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const dateForm = document.getElementById("dateForm");
const planConfirmation = document.getElementById("planConfirmation");

yesBtn.addEventListener("click", () => { questionPage.style.display = "none"; successPage.classList.remove("hidden"); createConfetti(); });
function moveNoButton() { noBtn.style.transform = `translate(${Math.random() * 300 - 150}px, ${Math.random() * 150 - 75}px)`; }
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", (event) => { event.preventDefault(); moveNoButton(); });

dateForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = dateForm.querySelector("button[type='submit']");
  const formData = new FormData(dateForm);
  submitButton.disabled = true; submitButton.textContent = "Saving...";
  try {
    const response = await fetch(dateForm.action, { method: "POST", body: formData, headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("Submission failed");
    const selectedDate = new Date(`${formData.get("date")}T00:00:00`).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const selectedTime = new Date(`1970-01-01T${formData.get("time")}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    planConfirmation.textContent = `Perfect! ${selectedDate} at ${selectedTime}, at ${formData.get("place").trim()}. See you then! 💖`;
    planConfirmation.classList.remove("hidden"); dateForm.classList.add("hidden");
  } catch (error) {
    planConfirmation.textContent = "Sorry—your plan could not be saved. Please try again.";
    planConfirmation.classList.remove("hidden"); submitButton.disabled = false; submitButton.textContent = "Save our plan 💖";
  }
});

function createHearts() { const heartContainer = document.querySelector(".hearts"); setInterval(() => { const heart = document.createElement("div"); heart.className = "heart"; heart.textContent = "❤️"; heart.style.left = `${Math.random() * 100}vw`; heart.style.animationDuration = `${Math.random() * 3 + 4}s`; heart.style.fontSize = `${Math.random() * 20 + 20}px`; heartContainer.appendChild(heart); setTimeout(() => heart.remove(), 7000); }, 500); }
function createConfetti() { for (let i = 0; i < 80; i += 1) { const heart = document.createElement("div"); heart.textContent = "💖"; heart.style.cssText = `position:absolute;left:${Math.random() * 100}vw;top:-50px;font-size:${Math.random() * 30 + 20}px;animation:fall 3s linear forwards;z-index:6;`; document.body.appendChild(heart); setTimeout(() => heart.remove(), 3000); } }
createHearts();
