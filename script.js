function addTime() {
  const input = document.getElementById("timeInput");
  const list = document.getElementById("list");

  const value = input.value;

  if (value === "") return;

  const li = document.createElement("li");
  li.textContent = value + " 時間勉強した";

  list.appendChild(li);

  input.value = "";
}