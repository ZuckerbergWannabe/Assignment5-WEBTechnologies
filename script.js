const userProfile = {
  name: "Askar Bavgashev",        
  birthYear: 2006,                
  isDeveloper: true,              
  hobbies: ["Coding", "Gaming", "Music"] 
};

const currentYear = new Date().getFullYear();
const hobbyList = document.getElementById("hobbyList");
const ageValue = document.getElementById("ageValue");
const monthsValue = document.getElementById("monthsValue");
const hobbyCount = document.getElementById("hobbyCount");
const itemCounter = document.getElementById("itemCounter");
const displayName = document.getElementById("displayName");
const displayRole = document.getElementById("displayRole");
const profileAvatar = document.getElementById("profileAvatar");
const formMessage = document.getElementById("formMessage");
const listMessage = document.getElementById("listMessage");

function updateStatistics() {
  const age = currentYear - userProfile.birthYear;
  const ageInMonths = age * 12;

  ageValue.innerHTML = `${age} <span>years</span>`;
  monthsValue.innerHTML = `${ageInMonths} <span>months</span>`;
  hobbyCount.innerHTML = `${userProfile.hobbies.length} <span>items</span>`;
  itemCounter.textContent = `${userProfile.hobbies.length} ITEM${userProfile.hobbies.length === 1 ? "" : "S"}`;

  console.log("Current profile:", userProfile);
  console.log("Age:", age, "years");
  console.log("Age in months (approximate):", ageInMonths);
  console.log("Hobby count:", userProfile.hobbies.length);
}

function getInitials(name) {
  return name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0].toUpperCase()).join("");
}

function renderProfile() {
  displayName.textContent = userProfile.name;
  profileAvatar.textContent = getInitials(userProfile.name) || "?";
  displayRole.innerHTML = `Developer status: <span class="role-pill">${userProfile.isDeveloper ? "Yes" : "No"}</span>`;
}

function renderHobbies() {
  hobbyList.replaceChildren();

  if (userProfile.hobbies.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-list";
    emptyState.innerHTML = '<div><span>＋</span>Your list is empty.<br>Add your first item below.</div>';
    hobbyList.appendChild(emptyState);
  } else {
    userProfile.hobbies.forEach((hobby, index) => {
      const listItem = document.createElement("li");
      const itemText = document.createElement("span");
      itemText.textContent = hobby;
      const itemIndex = document.createElement("span");
      itemIndex.className = "item-index";
      itemIndex.textContent = String(index + 1).padStart(2, "0");
      listItem.append(itemText, itemIndex);
      hobbyList.appendChild(listItem);
    });
  }
  updateStatistics();
}

document.getElementById("profileForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("username").value.trim();
  const birthYearInput = Number(document.getElementById("birthYear").value);

  if (!nameInput) {
    showMessage(formMessage, "Please enter a username.", true);
    return;
  }
  if (!Number.isInteger(birthYearInput) || birthYearInput < 1900 || birthYearInput > currentYear) {
    showMessage(formMessage, `Enter a valid year from 1900 to ${currentYear}.`, true);
    return;
  }

  userProfile.name = nameInput;
  userProfile.birthYear = birthYearInput;
  renderProfile();
  updateStatistics();
  showMessage(formMessage, "Profile updated successfully.");
});

document.getElementById("addItemForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.getElementById("newItem");
  const newItem = input.value.trim();

  if (!newItem) {
    showMessage(listMessage, "Type a hobby or task before adding it.", true);
    return;
  }

  userProfile.hobbies.push(newItem);
  input.value = "";
  renderHobbies();
  showMessage(listMessage, `"${newItem}" added to your list.`);
  input.focus();
});

document.getElementById("removeItemButton").addEventListener("click", function () {
  if (userProfile.hobbies.length === 0) {
    showMessage(listMessage, "There are no items to remove.", true);
    return;
  }

  const removedItem = userProfile.hobbies.pop();
  renderHobbies();
  showMessage(listMessage, `"${removedItem}" removed.`);
});

document.getElementById("resetListButton").addEventListener("click", function () {
  userProfile.hobbies = ["Coding", "Gaming", "Music"];
  renderHobbies();
  showMessage(listMessage, "The starter list has been restored.");
});

function showMessage(element, message, isError = false) {
  element.textContent = message;
  element.classList.toggle("error", isError);
}

renderProfile();
renderHobbies();
