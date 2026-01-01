const REPO_OWNER = "Runarok";
const REPO_NAME = "CozyPixels";
const BASE_FOLDERS = ["Catppuccin", "Nord", "One Dark"];

const FOLDERS_DATA = {
  Catppuccin: {
    "Abstract & Artistic": [
      "abstract-swirls.jpg",
      "aesthetic.jpg",
      "artificial-valley.jpg",
      "bars.jpg",
      "cartoon-castle.png",
      "dark-waves.jpg",
      "disco.png",
      "droplets.png",
      "galaxy-waves.jpg",
      "minimalist-black-hole.png",
      "paint.jpg",
      "painting-standing.jpg",
      "painting.jpg",
      "pixel-earth.png",
      "swirls.jpg",
      "swirly-painting.jpg",
      "trippy-purple.png",
      "waves.png",
    ],
    "Animals & Creatures": [
      "blue-kaiju.png",
      "cat-in-clouds.png",
      "cat-street.jpg",
      "cat-vibin.png",
      "cat_leaves.png",
      "cat_pacman.png",
      "corals-fish-underwater.jpg",
      "deer-glade.jpg",
      "dino.jpg",
      "dragon.jpg",
      "fishing.jpg",
      "fox.png",
      "jellyfish.jpg",
      "kaiju.png",
      "kitty.jpg",
      "koi.jpg",
      "koishi.jpg",
      "marine-tunnel.jpg",
      "oversized-cat.jpg",
      "railroad-cat.png",
      "whale.jpg",
    ],
    "Pixel Art": [
      "pixel-alley.png",
      "pixel-car.png",
      "pixel-castle.png",
      "pixel-earth.png",
      "pixel-galaxy.png",
      "pixel-napping.png",
      "pixel-planet.png",
      "pixel-prairie.jpg",
      "pixel-reading.png",
      "retro2_live.gif",
      "voxel-city.jpg",
      "voxel-houses-monochrome.png",
    ],
    "Nature & Landscapes": [
      "beach-path.jpg",
      "beach.jpg",
      "blue-flowers.jpg",
      "blue-landscape.png",
      "c4-spring-sakura-sky.jpg",
      "city-horizon.jpg",
      "clearing.png",
      "cliff-path.jpg",
      "clouds.png",
      "dark-forest.jpg",
      "flower-field.jpg",
      "horizon.jpg",
      "mountain-range.jpg",
      "pine.jpg",
      "sunset.jpg",
    ],
  },
  Nord: {
    "Abstract & Artistic": [
      "Abstract-Nord.png",
      "Minimal-Nord.png",
      "Nordic-Heroin.png",
      "ign_FluidifiedST-1.png",
      "ign_MaterialMountains-1.png",
      "ign_Symbolics-1.png",
      "ign_Viragegy-1.png",
      "ign_colorful.png",
      "ign_nordic_rose.png",
      "nord-balloons.png",
    ],
    "Animals & Creatures": [
      "audio-bunny.png",
      "ign_FocalFossa-1.png",
      "ign_GroovyGorilla-1.png",
      "ign_HirsuitHippo-1.png",
      "ign_LakesideDeer-1.png",
      "ign_wild_fish.png",
      "ign_wolf.png",
      "kittyboard.png",
      "nord-arctic-fox.png",
    ],
    "Anime & Gaming": [
      "ign_LofiCity-1.png",
      "ign_LofiDino-1.png",
      "ign_LofiGirl-1.png",
      "ign_PlasticBeach-1.png",
      "ign_chainsaw-man.png",
      "nord_naruto.png",
      "super-mario.png",
    ],
  },
  "One Dark": {
    "Gaming (BOTW)": [
      "od_botw.jpg",
      "od_botw_saddled.jpg",
      "od_botw_z.png",
      "od_guardian.png",
      "od_hylian_crest.png",
      "od_master_sword.png",
      "od_ouroboros.png",
      "od_sheikah_eye.png",
      "od_shield.png",
      "od_stalker.png",
    ],
    "Minimal & Abstract": [
      "od_abstract.png",
      "od_brush.png",
      "od_drift.png",
      "od_error.png",
      "od_illusion.png",
      "od_ometer.png",
      "od_outrun_wave.png",
      "od_patterns.png",
      "od_qr.png",
      "od_rice.png",
      "od_shell.png",
      "od_sound.png",
    ],
    "Nature & Landscapes": [
      "od_autumn.jpg",
      "od_clouds.png",
      "od_fern.jpg",
      "od_lake.jpeg",
      "od_leaf.jpg",
      "od_plant.jpg",
      "od_sea.jpg",
      "od_serenity.jpg",
      "od_trail.jpg",
      "od_waves.jpg",
    ],
  },
};

// ===== Helper Functions =====
function getImageUrl(baseFolder, subfolder, filename) {
    const encodedSubfolder = subfolder.replace(/&/g, "%26").replace(/ /g, "%20");
    const encodedFilename = filename.replace(/&/g, "%26").replace(/ /g, "%20");
    return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/refs/heads/main/${baseFolder}/${encodedSubfolder}/${encodedFilename}`;
}

function getFirstImageUrl(baseFolder, subfolder) {
    const files = FOLDERS_DATA[baseFolder]?.[subfolder] || [];
    if (files.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * files.length);
    return getImageUrl(baseFolder, subfolder, files[randomIndex]);
}

function calculateUniqueImages() {
    uniqueImageUrls.clear();
    Object.keys(FOLDERS_DATA).forEach(baseFolder => {
        Object.keys(FOLDERS_DATA[baseFolder]).forEach(subfolder => {
            FOLDERS_DATA[baseFolder][subfolder].forEach(file => {
                uniqueImageUrls.add(getImageUrl(baseFolder, subfolder, file));
            });
        });
    });
    document.getElementById('total-images').textContent = uniqueImageUrls.size;
}