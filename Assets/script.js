let currentPath = [];
let currentFiles = [];
let currentIndex = 0;

const contentArea = document.getElementById("content-area");
const breadcrumbItems = document.getElementById("breadcrumb-items");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalFilename = document.getElementById("modal-filename");
const closeModalBtn = document.getElementById("close-modal");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");
const modalDownload = document.getElementById("modal-download");

function updateBreadcrumb() {
  breadcrumbItems.innerHTML = "";
  currentPath.forEach((item, index) => {
    const span = document.createElement("span");
    span.className = "breadcrumb-item";
    span.textContent = item;
    span.onclick = () => navigateToPath(index);
    breadcrumbItems.appendChild(span);
  });
}

function navigateToPath(level) {
  currentPath = currentPath.slice(0, level + 1);
  render();
}

function renderBaseFolders() {
  contentArea.innerHTML = "";
  BASE_FOLDERS.forEach((folder) => {
    const item = document.createElement("div");
    item.className = "item";
    const firstImageUrl = getFirstImageUrl(folder, Object.keys(FOLDERS_DATA[folder])[0]);
    item.innerHTML = `
      <img src="${firstImageUrl}" alt="${folder}" class="item-thumbnail">
      <div class="item-overlay">
        <div class="item-title">${folder}</div>
        <div class="item-count">${Object.keys(FOLDERS_DATA[folder]).length} categories</div>
      </div>
    `;
    item.onclick = () => {
      currentPath.push(folder);
      render();
    };
    contentArea.appendChild(item);
  });
}

function renderSubfolders(baseFolder) {
  contentArea.innerHTML = "";
  const subfolders = Object.keys(FOLDERS_DATA[baseFolder]);
  subfolders.forEach((subfolder) => {
    const item = document.createElement("div");
    item.className = "item";
    const imageUrl = getFirstImageUrl(baseFolder, subfolder);
    item.innerHTML = `
      <img src="${imageUrl}" alt="${subfolder}" class="item-thumbnail">
      <div class="item-overlay">
        <div class="item-title">${subfolder}</div>
        <div class="item-count">${FOLDERS_DATA[baseFolder][subfolder].length} files</div>
      </div>
    `;
    item.onclick = () => {
      currentPath.push(subfolder);
      render();
    };
    contentArea.appendChild(item);
  });
}

function renderFiles(baseFolder, subfolder) {
  contentArea.innerHTML = "";
  const files = FOLDERS_DATA[baseFolder][subfolder];
  currentFiles = files.map((file) => ({
    name: file,
    url: getImageUrl(baseFolder, subfolder, file),
  }));

  files.forEach((file, index) => {
    const item = document.createElement("div");
    item.className = "item";
    const imageUrl = getImageUrl(baseFolder, subfolder, file);
    item.innerHTML = `
      <img src="${imageUrl}" alt="${file}" class="item-thumbnail">
      <div class="item-overlay">
        <div class="item-title">${file}</div>
      </div>
    `;
    item.onclick = () => openModal(index);
    contentArea.appendChild(item);
  });
}

function render() {
  updateBreadcrumb();

  if (currentPath.length === 0) {
    renderBaseFolders();
  } else if (currentPath.length === 1) {
    renderSubfolders(currentPath[0]);
  } else if (currentPath.length === 2) {
    renderFiles(currentPath[0], currentPath[1]);
  }
}

function openModal(index) {
  currentIndex = index;
  const file = currentFiles[index];
  modalImg.src = file.url;
  modalFilename.textContent = file.name;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function navigateModal(direction) {
  if (direction === "next") {
    currentIndex = (currentIndex + 1) % currentFiles.length;
  } else {
    currentIndex = (currentIndex - 1 + currentFiles.length) % currentFiles.length;
  }
  openModal(currentIndex);
}

function downloadFile() {
  const link = document.createElement("a");
  link.href = currentFiles[currentIndex].url;
  link.download = currentFiles[currentIndex].name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

closeModalBtn.onclick = closeModal;
modalPrev.onclick = () => navigateModal("prev");
modalNext.onclick = () => navigateModal("next");
modalDownload.onclick = downloadFile;

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("active")) return;
  if (e.key === "ArrowRight") navigateModal("next");
  if (e.key === "ArrowLeft") navigateModal("prev");
  if (e.key === "Escape") closeModal();
});

render();
