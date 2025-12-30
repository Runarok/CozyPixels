// ===== State Management =====
let currentPath = [];
let currentFiles = [];
let currentIndex = 0;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentView = 'grid';

// ===== DOM Elements =====
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const collectionsList = document.getElementById('collections-list');
const breadcrumb = document.getElementById('breadcrumb');
const contentGrid = document.getElementById('content-grid');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalPath = document.getElementById('modal-path');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');
const modalDownload = document.getElementById('modal-download');
const modalFavorite = document.getElementById('modal-favorite');
const modalShare = document.getElementById('modal-share');
const totalImagesEl = document.getElementById('total-images');
const viewBtns = document.querySelectorAll('.view-btn');

// ===== Initialization =====
function init() {
    // Load collections in sidebar
    loadCollections();
    
    // Display total images count
    totalImagesEl.textContent = getTotalImageCount();
    
    // Parse URL and navigate to path
    parseURLAndNavigate();
    
    // Setup event listeners
    setupEventListeners();
}

// ===== Collections Sidebar =====
function loadCollections() {
    collectionsList.innerHTML = '';
    
    BASE_FOLDERS.forEach(folder => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.dataset.collection = folder;
        
        const subfolderCount = Object.keys(FOLDERS_DATA[folder]).length;
        
        li.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7H13L11 5H5C3.89543 5 3 5.89543 3 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>${folder}</span>
            <span class="badge">${subfolderCount}</span>
        `;
        
        li.addEventListener('click', () => navigateToCollection(folder));
        collectionsList.appendChild(li);
    });
}

function navigateToCollection(collection) {
    currentPath = [collection];
    updateURL();
    render();
}

// ===== URL Management =====
function updateURL() {
    const pathString = currentPath.join('/');
    const newURL = pathString ? `?path=${encodeURIComponent(pathString)}` : '?';
    history.pushState({ path: currentPath }, '', newURL);
}

function parseURLAndNavigate() {
    const params = new URLSearchParams(window.location.search);
    const pathString = params.get('path');
    
    if (pathString) {
        currentPath = pathString.split('/').filter(p => p);
    } else {
        currentPath = [];
    }
    
    render();
}

window.addEventListener('popstate', (event) => {
    if (event.state && event.state.path) {
        currentPath = event.state.path;
    } else {
        currentPath = [];
    }
    render();
});

// ===== Breadcrumb =====
function updateBreadcrumb() {
    const homeBtn = breadcrumb.querySelector('[data-path=""]');
    const dynamicBreadcrumbs = breadcrumb.querySelectorAll('.breadcrumb-item:not([data-path=""])');
    dynamicBreadcrumbs.forEach(el => el.remove());
    
    // Update home button active state
    if (currentPath.length === 0) {
        homeBtn.classList.add('active');
    } else {
        homeBtn.classList.remove('active');
    }
    
    // Add breadcrumb items
    currentPath.forEach((item, index) => {
        const btn = document.createElement('button');
        btn.className = 'breadcrumb-item';
        btn.textContent = item;
        btn.addEventListener('click', () => {
            currentPath = currentPath.slice(0, index + 1);
            updateURL();
            render();
        });
        breadcrumb.appendChild(btn);
    });
}

// ===== Render Content =====
function render() {
    updateBreadcrumb();
    updateSidebarActiveState();
    
    if (currentPath.length === 0) {
        renderCollections();
    } else if (currentPath.length === 1) {
        renderSubfolders();
    } else if (currentPath.length === 2) {
        renderImages();
    }
}

function updateSidebarActiveState() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.dataset.collection === currentPath[0]) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function renderCollections() {
    contentGrid.innerHTML = '';
    
    BASE_FOLDERS.forEach(folder => {
        const firstSubfolder = Object.keys(FOLDERS_DATA[folder])[0];
        const thumbnailUrl = getFirstImageUrl(folder, firstSubfolder);
        const subfolderCount = Object.keys(FOLDERS_DATA[folder]).length;
        
        const item = createGridItem({
            title: folder,
            meta: `${subfolderCount} categories`,
            thumbnailUrl,
            onClick: () => {
                currentPath = [folder];
                updateURL();
                render();
            }
        });
        
        contentGrid.appendChild(item);
    });
}

function renderSubfolders() {
    const baseFolder = currentPath[0];
    contentGrid.innerHTML = '';
    
    const subfolders = Object.keys(FOLDERS_DATA[baseFolder]);
    
    subfolders.forEach(subfolder => {
        const thumbnailUrl = getFirstImageUrl(baseFolder, subfolder);
        const fileCount = FOLDERS_DATA[baseFolder][subfolder].length;
        
        const item = createGridItem({
            title: subfolder,
            meta: `${fileCount} wallpapers`,
            thumbnailUrl,
            onClick: () => {
                currentPath = [baseFolder, subfolder];
                updateURL();
                render();
            }
        });
        
        contentGrid.appendChild(item);
    });
}

function renderImages() {
    const [baseFolder, subfolder] = currentPath;
    contentGrid.innerHTML = '';
    
    const files = FOLDERS_DATA[baseFolder][subfolder];
    currentFiles = files.map((file, index) => ({
        name: file,
        url: getImageUrl(baseFolder, subfolder, file),
        path: `${baseFolder}/${subfolder}/${file}`,
        index
    }));
    
    currentFiles.forEach((file, index) => {
        const item = createGridItem({
            title: file.name,
            meta: '',
            thumbnailUrl: file.url,
            onClick: () => openModal(index)
        });
        
        contentGrid.appendChild(item);
    });
}

function createGridItem({ title, meta, thumbnailUrl, onClick }) {
    const item = document.createElement('div');
    item.className = 'grid-item';
    
    item.innerHTML = `
        <img src="${thumbnailUrl}" alt="${title}" loading="lazy">
        <div class="grid-item-overlay">
            <div class="grid-item-title">${title}</div>
            ${meta ? `<div class="grid-item-meta">${meta}</div>` : ''}
        </div>
    `;
    
    item.addEventListener('click', onClick);
    
    return item;
}

// ===== Modal =====
function openModal(index) {
    currentIndex = index;
    const file = currentFiles[index];
    
    modalImage.src = file.url;
    modalImage.alt = file.name;
    modalTitle.textContent = file.name;
    modalPath.textContent = file.path;
    
    // Update favorite button
    updateFavoriteButton(file.url);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateModal(direction) {
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % currentFiles.length;
    } else {
        currentIndex = (currentIndex - 1 + currentFiles.length) % currentFiles.length;
    }
    openModal(currentIndex);
}

function downloadImage() {
    const file = currentFiles[currentIndex];
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function toggleFavorite() {
    const file = currentFiles[currentIndex];
    const index = favorites.indexOf(file.url);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(file.url);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButton(file.url);
    updateFavoritesCount();
}

function updateFavoriteButton(url) {
    const isFavorite = favorites.includes(url);
    const svg = modalFavorite.querySelector('svg');
    const text = modalFavorite.querySelector('span');
    
    if (isFavorite) {
        svg.innerHTML = '<path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>';
        text.textContent = 'Remove from Favorites';
    } else {
        svg.innerHTML = '<path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>';
        text.textContent = 'Add to Favorites';
    }
}

function updateFavoritesCount() {
    const badge = document.querySelector('[data-action="favorites"] .badge');
    if (badge) {
        badge.textContent = favorites.length;
    }
}

function shareImage() {
    const file = currentFiles[currentIndex];
    const shareURL = `${window.location.origin}${window.location.pathname}?path=${encodeURIComponent(file.path.replace(/\/[^\/]+$/, ''))}`;
    
    if (navigator.share) {
        navigator.share({
            title: file.name,
            text: `Check out this wallpaper: ${file.name}`,
            url: shareURL
        }).catch(() => {
            copyToClipboard(shareURL);
        });
    } else {
        copyToClipboard(shareURL);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = modalShare.querySelector('span').textContent;
        modalShare.querySelector('span').textContent = 'Link Copied!';
        setTimeout(() => {
            modalShare.querySelector('span').textContent = originalText;
        }, 2000);
    });
}

// ===== Search =====
function handleSearch(query) {
    if (!query.trim()) {
        render();
        return;
    }
    
    const results = [];
    
    Object.keys(FOLDERS_DATA).forEach(baseFolder => {
        Object.keys(FOLDERS_DATA[baseFolder]).forEach(subfolder => {
            FOLDERS_DATA[baseFolder][subfolder].forEach(file => {
                const searchText = `${baseFolder} ${subfolder} ${file}`.toLowerCase();
                if (searchText.includes(query.toLowerCase())) {
                    results.push({
                        baseFolder,
                        subfolder,
                        file,
                        url: getImageUrl(baseFolder, subfolder, file)
                    });
                }
            });
        });
    });
    
    renderSearchResults(results);
}

function renderSearchResults(results) {
    contentGrid.innerHTML = '';
    
    if (results.length === 0) {
        contentGrid.innerHTML = '<p style="color: var(--text-muted); text-align: center; width: 100%; padding: 3rem;">No results found</p>';
        return;
    }
    
    currentFiles = results.map((result, index) => ({
        name: result.file,
        url: result.url,
        path: `${result.baseFolder}/${result.subfolder}/${result.file}`,
        index
    }));
    
    results.forEach((result, index) => {
        const item = createGridItem({
            title: result.file,
            meta: `${result.baseFolder} / ${result.subfolder}`,
            thumbnailUrl: result.url,
            onClick: () => openModal(index)
        });
        
        contentGrid.appendChild(item);
    });
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Sidebar toggle
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
    
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
    
    // Breadcrumb home button
    breadcrumb.querySelector('[data-path=""]').addEventListener('click', () => {
        currentPath = [];
        updateURL();
        render();
    });
    
    // Search
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            handleSearch(e.target.value);
        }, 300);
    });
    
    // View toggle
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            // Could implement list view here
        });
    });
    
    // Quick access items
    document.querySelector('[data-action="all"]').addEventListener('click', () => {
        currentPath = [];
        updateURL();
        render();
    });
    
    // Modal controls
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', () => navigateModal('prev'));
    modalNext.addEventListener('click', () => navigateModal('next'));
    modalDownload.addEventListener('click', downloadImage);
    modalFavorite.addEventListener('click', toggleFavorite);
    modalShare.addEventListener('click', shareImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') navigateModal('prev');
        if (e.key === 'ArrowRight') navigateModal('next');
    });
    
    // Close sidebar on mobile when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}

// ===== Initialize App =====
init();
updateFavoritesCount();