
        // ===== State Management =====
        let currentPath = [];
        let currentFiles = [];
        let currentIndex = 0;
        let currentView = 'collections';
        let uniqueImageUrls = new Set();

        // Load state from localStorage
        let favorites = [];
        let introDismissed = false;

        function loadState() {
            try {
                const stored = JSON.parse(window.localStorage.getItem('cozypixels_state') || '{}');
                favorites = stored.favorites || [];
                introDismissed = stored.introDismissed || false;
            } catch (e) {
                console.error('Failed to load state:', e);
            }
        }

        function saveState() {
            try {
                window.localStorage.setItem('cozypixels_state', JSON.stringify({
                    favorites,
                    introDismissed
                }));
            } catch (e) {
                console.error('Failed to save state:', e);
            }
        }

        // ===== Sidebar Management =====
        const sidebar = document.getElementById('sidebar');
        const hoverZone = document.getElementById('hover-zone');
        let sidebarTimeout;

        hoverZone.addEventListener('mouseenter', () => {
            clearTimeout(sidebarTimeout);
            sidebar.classList.add('open');
        });

        hoverZone.addEventListener('click', () => {
            sidebar.classList.add('open');
        });

        sidebar.addEventListener('mouseleave', () => {
            sidebarTimeout = setTimeout(() => {
                sidebar.classList.remove('open');
            }, 300);
        });

        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !hoverZone.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });

        // ===== Intro Banner =====
        const introBanner = document.getElementById('intro-banner');
        const closeIntro = document.getElementById('close-intro');

        if (introDismissed) {
            introBanner.style.display = 'none';
        }

        closeIntro.addEventListener('click', () => {
            introBanner.style.animation = 'fadeInUp 0.3s ease-out reverse';
            setTimeout(() => {
                introBanner.style.display = 'none';
                introDismissed = true;
                saveState();
            }, 300);
        });

        // ===== Collections Sidebar =====
        function loadCollections() {
            const list = document.getElementById('collections-list');
            list.innerHTML = '';
            
            BASE_FOLDERS.forEach(folder => {
                const li = document.createElement('li');
                li.className = 'nav-item';
                const subfolderCount = Object.keys(FOLDERS_DATA[folder]).length;
                
                li.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V9C21 7.9 20.1 7 19 7H13L11 5H5C3.9 5 3 5.9 3 7Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span>${folder}</span>
                    <span class="badge">${subfolderCount}</span>
                `;
                
                li.addEventListener('click', () => {
                    currentPath = [folder];
                    currentView = 'subfolders';
                    render();
                    sidebar.classList.remove('open');
                });
                
                list.appendChild(li);
            });
        }

// ===== Navigation =====
        function updateBreadcrumb() {
            const breadcrumb = document.getElementById('breadcrumb');
            breadcrumb.innerHTML = `
                <button class="breadcrumb-item ${currentPath.length === 0 ? 'active' : ''}" data-path="">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M3 9L12 2L21 9V20C21 20.5 20.8 21 20.4 21.4C20 21.8 19.5 22 19 22H5C4.5 22 4 21.8 3.6 21.4C3.2 21 3 20.5 3 20V9Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span>Home</span>
                </button>
            `;

            currentPath.forEach((item, index) => {
                const btn = document.createElement('button');
                btn.className = `breadcrumb-item ${index === currentPath.length - 1 ? 'active' : ''}`;
                btn.textContent = item;
                btn.addEventListener('click', () => {
                    currentPath = currentPath.slice(0, index + 1);
                    currentView = index === 0 ? 'subfolders' : 'images';
                    render();
                });
                breadcrumb.appendChild(btn);
            });

            const homeBtn = breadcrumb.querySelector('[data-path=""]');
            homeBtn.addEventListener('click', () => {
                currentPath = [];
                currentView = 'collections';
                render();
            });
        }

        function render() {
            updateBreadcrumb();
            const grid = document.getElementById('content-grid');
            const title = document.getElementById('section-title');

            if (currentView === 'collections') {
                title.textContent = 'All Collections';
                grid.innerHTML = '';
                
                BASE_FOLDERS.forEach(folder => {
                    const firstSubfolder = Object.keys(FOLDERS_DATA[folder])[0];
                    const thumbnailUrl = getFirstImageUrl(folder, firstSubfolder);
                    const subfolderCount = Object.keys(FOLDERS_DATA[folder]).length;
                    
                    const item = document.createElement('div');
                    item.className = 'grid-item';
                    item.innerHTML = `
                        <img src="${thumbnailUrl}" alt="${folder}">
                        <div class="grid-item-overlay">
                            <div class="grid-item-title">${folder}</div>
                            <div class="grid-item-meta">${subfolderCount} categories</div>
                        </div>
                    `;
                    item.addEventListener('click', () => {
                        currentPath = [folder];
                        currentView = 'subfolders';
                        render();
                    });
                    grid.appendChild(item);
                });
            } else if (currentView === 'subfolders') {
                const baseFolder = currentPath[0];
                title.textContent = baseFolder;
                grid.innerHTML = '';
                
                Object.keys(FOLDERS_DATA[baseFolder]).forEach(subfolder => {
                    const thumbnailUrl = getFirstImageUrl(baseFolder, subfolder);
                    const fileCount = FOLDERS_DATA[baseFolder][subfolder].length;
                    
                    const item = document.createElement('div');
                    item.className = 'grid-item';
                    item.innerHTML = `
                        <img src="${thumbnailUrl}" alt="${subfolder}">
                        <div class="grid-item-overlay">
                            <div class="grid-item-title">${subfolder}</div>
                            <div class="grid-item-meta">${fileCount} wallpapers</div>
                        </div>
                    `;
                    item.addEventListener('click', () => {
                        currentPath = [baseFolder, subfolder];
                        currentView = 'images';
                        render();
                    });
                    grid.appendChild(item);
                });
            } else if (currentView === 'images') {
                const [baseFolder, subfolder] = currentPath;
                title.textContent = subfolder;
                grid.innerHTML = '';
                
                const files = FOLDERS_DATA[baseFolder][subfolder];
                currentFiles = files.map((file, index) => ({
                    name: file,
                    url: getImageUrl(baseFolder, subfolder, file),
                    path: `${baseFolder}/${subfolder}/${file}`,
                    index
                }));
                
                currentFiles.forEach((file, index) => {
                    const item = document.createElement('div');
                    item.className = 'grid-item';
                    item.innerHTML = `
                        <img src="${file.url}" alt="${file.name}">
                        <div class="grid-item-overlay">
                            <div class="grid-item-title">${file.name}</div>
                        </div>
                    `;
                    item.addEventListener('click', () => openModal(index));
                    grid.appendChild(item);
                });
            } else if (currentView === 'favorites') {
                title.textContent = 'Favorites';
                grid.innerHTML = '';
                
                if (favorites.length === 0) {
                    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No favorites yet. Add some wallpapers to your favorites!</p>';
                    return;
                }

                currentFiles = favorites.map((url, index) => ({
                    name: url.split('/').pop(),
                    url: url,
                    path: url.split('/').slice(-3).join('/'),
                    index
                }));

                currentFiles.forEach((file, index) => {
                    const item = document.createElement('div');
                    item.className = 'grid-item';
                    item.innerHTML = `
                        <img src="${file.url}" alt="${file.name}">
                        <div class="grid-item-overlay">
                            <div class="grid-item-title">${file.name}</div>
                        </div>
                    `;
                    item.addEventListener('click', () => openModal(index));
                    grid.appendChild(item);
                });
            }
        }

        // ===== Search =====
        const searchInput = document.getElementById('search-input');
        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const query = e.target.value.trim();
                if (!query) {
                    if (currentView !== 'favorites') {
                        currentPath = [];
                        currentView = 'collections';
                        render();
                    }
                    return;
                }

                handleSearch(query);
            }, 300);
        });

        function handleSearch(query) {
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

            renderSearchResults(results, query);
        }

        function renderSearchResults(results, query) {
            const grid = document.getElementById('content-grid');
            const title = document.getElementById('section-title');
            
            title.textContent = `Search results for "${query}"`;
            grid.innerHTML = '';

            if (results.length === 0) {
                grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No results found</p>';
                return;
            }

            currentFiles = results.map((result, index) => ({
                name: result.file,
                url: result.url,
                path: `${result.baseFolder}/${result.subfolder}/${result.file}`,
                index
            }));

            results.forEach((result, index) => {
                const item = document.createElement('div');
                item.className = 'grid-item';
                item.innerHTML = `
                    <img src="${result.url}" alt="${result.file}">
                    <div class="grid-item-overlay">
                        <div class="grid-item-title">${result.file}</div>
                        <div class="grid-item-meta">${result.baseFolder} / ${result.subfolder}</div>
                    </div>
                `;
                item.addEventListener('click', () => openModal(index));
                grid.appendChild(item);
            });
        }

        // ===== Modal =====
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

        function openModal(index) {
            currentIndex = index;
            const file = currentFiles[index];
            
            modalImage.src = file.url;
            modalImage.alt = file.name;
            modalTitle.textContent = file.name;
            modalPath.textContent = file.path;
            
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
            
            saveState();
            updateFavoriteButton(file.url);
            updateFavoritesCount();
        }

        function updateFavoriteButton(url) {
            const isFavorite = favorites.includes(url);
            const svg = modalFavorite.querySelector('svg');
            const text = modalFavorite.querySelector('span');
            
            if (isFavorite) {
                svg.innerHTML = '<path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" fill="currentColor" stroke="currentColor" stroke-width="2"/>';
                text.textContent = 'Remove from Favorites';
            } else {
                svg.innerHTML = '<path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" stroke="currentColor" stroke-width="2"/>';
                text.textContent = 'Add to Favorites';
            }
        }

        function updateFavoritesCount() {
            document.getElementById('favorites-count').textContent = favorites.length;
        }

        modalClose.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);
        modalPrev.addEventListener('click', () => navigateModal('prev'));
        modalNext.addEventListener('click', () => navigateModal('next'));
        modalDownload.addEventListener('click', downloadImage);
        modalFavorite.addEventListener('click', toggleFavorite);

        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigateModal('prev');
            if (e.key === 'ArrowRight') navigateModal('next');
        });

        // ===== Quick Access =====
        document.querySelector('[data-action="all"]').addEventListener('click', () => {
            currentPath = [];
            currentView = 'collections';
            render();
            sidebar.classList.remove('open');
        });

        document.querySelector('[data-action="favorites"]').addEventListener('click', () => {
            currentPath = [];
            currentView = 'favorites';
            render();
            sidebar.classList.remove('open');
        });

        // ===== Import/Export =====
        const exportBtn = document.getElementById('export-btn');
        const importExportModal = document.getElementById('import-export-modal');
        const exportTextarea = document.getElementById('export-textarea');
        const importTextarea = document.getElementById('import-textarea');
        const copyExportBtn = document.getElementById('copy-export-btn');
        const importBtn = document.getElementById('import-btn');
        const cancelImportExport = document.getElementById('cancel-import-export');

        exportBtn.addEventListener('click', () => {
            exportTextarea.value = JSON.stringify(favorites, null, 2);
            importTextarea.value = '';
            importExportModal.classList.add('active');
        });

        cancelImportExport.addEventListener('click', () => {
            importExportModal.classList.remove('active');
        });

        importExportModal.querySelector('.modal-backdrop').addEventListener('click', () => {
            importExportModal.classList.remove('active');
        });

        copyExportBtn.addEventListener('click', () => {
            exportTextarea.select();
            navigator.clipboard.writeText(exportTextarea.value).then(() => {
                const originalText = copyExportBtn.textContent;
                copyExportBtn.textContent = '✓ Copied!';
                setTimeout(() => {
                    copyExportBtn.textContent = originalText;
                }, 2000);
            });
        });

        importBtn.addEventListener('click', () => {
            try {
                const imported = JSON.parse(importTextarea.value);
                if (Array.isArray(imported)) {
                    favorites = imported;
                    saveState();
                    updateFavoritesCount();
                    importExportModal.classList.remove('active');
                    alert('Favorites imported successfully!');
                } else {
                    alert('Invalid format. Please paste a valid JSON array.');
                }
            } catch (e) {
                alert('Invalid JSON. Please check your input.');
            }
        });

        // ===== Initialize =====
        loadState();
        loadCollections();
        calculateUniqueImages();
        updateFavoritesCount();
        render();
