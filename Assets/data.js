const REPO_OWNER = "Runarok";
const REPO_NAME = "CozyPixels";
const BASE_FOLDERS = ["Catppuccin", "Nord", "One Dark"];
const FOLDERS_DATA = {
  Catppuccin: {
    "Abstract_Minimal": ["abstract-swirls.jpg", "blue-landscape.png", "bsod.png", "clearing.png", "blueprint.png",
      "cool.jpg", "degirled.png", "dominik-mayer-1.jpg", "dark-topography.png", "dominik-mayer-11.jpg",
      "dominik-mayer-10.jpg", "dominik-mayer-12.jpg", "dominik-mayer-13.jpg", "dominik-mayer-15.jpg",
      "dominik-mayer-16.jpg", "dominik-mayer-14.jpg", "dominik-mayer-17.jpg", "dominik-mayer-18.png",
      "dominik-mayer-19.jpg", "dominik-mayer-2.jpg", "dominik-mayer-20.jpg", "dominik-mayer-21.jpg",
      "dominik-mayer-22.jpg", "dominik-mayer-23.jpg", "dominik-mayer-24.jpg", "dominik-mayer-25.jpg",
      "dominik-mayer-26.jpg", "dominik-mayer-4.jpg", "dominik-mayer-5.jpg", "dominik-mayer-6.jpg",
      "dominik-mayer-7.jpg", "dominik-mayer-8.jpg", "dominik-mayer-9.jpg", "droplets.png", "hollow.jpg",
      "idk-tbh.png", "i-touch-this.jpg", "lightbulbs.jpg", "lit-up-sky.png", "map.png", "math.png",
      "Mocha-hald8-pinkish.jpg", "orange.jpg", "oranges.jpg", "rainy-window.jpeg", "panes.jpg", "result_3.png",
      "shadow-shape-holo.jpeg", "snowflakes.jpg", "snowy-map.png", "swirls.jpg", "window-flower-silhouette.png",
      "wallhaven-vqoo1p.jpg"
    ],
    "Animals_Creatures": ["bunnies-road.png", "cat_pacman.png", "fox.png", "corals-fish-underwater.jpg", "kitty.jpg",
      "koi.jpg", "oversized-cat.jpg", "pixel-cat-clouds.png", "pixel-napping.png", "railroad-cat.png"
    ],
    "City_Urban": ["abandoned-trainstation.jpg", "artist-studio.jpg",
      "basement-workspace-retro-computer-illustration.jpg", "chicago-skyline-4k.webp", "cat-street.jpg",
      "city-harbor.png", "city-horizon.jpg", "city-on-water.jpg", "city.png", "coffee-shop.png", "cold-alley.png",
      "crane.png", "dark-street-alley.png", "desolate-city-2.jpg", "desolate-city.jpg", "diner-lonely-road.jpg",
      "foggy-city.jpg", "harbor-3.png", "harbor.jpg", "japan-alley.png", "kitchen.png", "lantern-light-room.png",
      "laundry.jpg", "lighthouse.webp", "lofi-city-sunset.jpg", "main-street.png", "moon-beach.png",
      "neon-street.png", "old-computer.png", "pitstop.png", "pixel-alley.png", "railroad-2.jpg", "red-city.png",
      "rooftops.jpg", "salty-suburban.jpg", "skyscraper.webp", "square-city.jpg", "stall.jpg", "street-4.png",
      "street.png", "subway.jpg", "sunken-tower.png", "tower-perspective.png", "tower.png",
      "traditional-interior-view.jpg", "train-station.jpg", "trolley.jpg", "venice-market.png", "voxel-city.jpg",
      "wall.jpg", "windows-xp.jpg", "voxel-houses-monochrome.png", "zuchold-archtecture.jpg"
    ],
    "Fantasy_Anime": ["cartoon-castle.png", "castle.png", "cat-in-clouds.png", "cat-vibin.png", "dragon.jpg",
      "dino-island.jpg", "dwarf-saber.jpg", "excalibur-lake.jpg", "floating-castle.jpg", "fantasy-city.jpg",
      "flying-witch-coastline.jpg", "genshin-landscape.png", "gingerbread-house.jpg", "haunted-house.jpg",
      "hollow-knight-dark-interior.png", "hollow-knight.jpg", "knight-building.png", "isekai.jpg", "knight-sit.png",
      "knight-templar.jpg", "knights-radiant.jpg", "mage.jpg", "maji-no-tabitabi-2.jpg", "maji-no-tabitabi-3.jpg",
      "my-neighbor-totoro-sunflowers.png", "one-legged-herdazian.jpg", "painting-standing.jpg", "samurai.jpg",
      "sunlit-ruins.png", "stormlight-archive.png", "stay-vigil-by-pndora.jpg", "temple.jpg", "touhou-house.jpg",
      "touhou-lake.jpg", "vibrant-fantasy-valley.png", "yohoho.jpg", "wanderer.jpg"
    ],
    "Misc_Unsorted": ["call-it-a-day.jpg", "chess-gate.jpeg", "fight.jpg", "flowering-rain.png",
      "gentlemen-sunset.png", "illustration-beach-anime-style-clouds.jpg",
      "illustration-girl-balcony-overlook-mountain-lake-island-torii-gate.jpg",
      "illustration-marina-beach-path-pier.jpg", "kfc.jpg", "lighthouse-2.png", "platform.jpg", "ruins.jpg",
      "pompeii.png", "santa-cruz-lighthouse.webp", "soaring-off.jpg", "wastelands.jpg", "sushi.jpg",
      "lighthouse.jpg"
    ],
    "Nature_Landscapes": ["artificial-valley.jpg", "asian-village.png", "blue-flowers.jpg", "biking-sunset.jpg",
      "bluehour.jpg", "cabin-2.jpg", "cabin-3.png", "cabin.png", "cabin-4.png", "cherry-cloud.jpg",
      "c4-spring-sakura-sky.jpg", "cliff-path.jpg", "clouds-3.jpg", "clouds-2.png", "clouds-3.png", "clouds-5.jpg",
      "clouds.png", "cottages-river.png", "cozy-home.png", "dark-cloud-sunset.jpg", "dark-waves.jpg",
      "dark-forest.jpg", "day-forest-path.png", "deer-glade.jpg", "dramatic-fire-coast.png", "flower-field-2.png",
      "flower-field-3.png", "flower-field.jpg", "flying-comets-clouds.jpg", "grassy-well.jpg",
      "grandfather-tree.jpg", "green-bridge.jpg", "harmony.png", "horizon-2.jpg", "horizon.jpg",
      "lake-view-balcony.jpg", "leaves.png", "lovely-summer.jpg", "meadow-rest.png", "misty-boat.jpg",
      "mountain-range.jpg", "mountains.webp", "nature-valley-2.jpg", "nature-valley-1.jpg", "pine.jpg",
      "night-forest-path.png", "pink-clouds.jpg", "pink-mist-lake.jpg", "pixel-prairie.jpg", "railroad-horizon.png",
      "railroad-flowers.jpg", "riverside-path-mushishi.jpg", "river-city.jpg", "Rocky-Peaks-PinkSky.webp",
      "sakura-aura.jpg", "sakura-gate.jpg", "sakura-trees-over-river.jpg", "serenity.jpg", "snowy-forest-river.jpg",
      "storm.jpg", "sunset.jpg", "tree-stump.jpg", "tree.jpg", "underwater-deep.jpg", "vibrant-gate.png",
      "village-gate.jpg", "waterfall.png", "waves.png", "wheat.png"
    ],
    "Pixel_Voxel_Retro": ["keyboard-2.png", "keyboard.png", "pixel-reading.png", "pixel-castle.png",
      "signal-enthusiast.jpg", "retro2_live.gif", "pacman.png", "wallpaper-theme-converter9.png"
    ],
    "Space_SciFi": ["3d-model-futuristic-tower-dark-aesthetic.jpg", "astronaut.png", "celestial-portal.jpg",
      "black-hole.png", "cyberpunk-van.png", "dark-star.jpg", "blue-kaiju.png", "Desert-Night-Sky.webp",
      "eclipse.jpg", "galaxy-waves.jpg", "girl-stars.png", "horizon-stars.png",
      "illustration-astronaut-holding-jellyfish-outer-space.jpg",
      "illustration-atlantis-futuristic-sunken-city.jpg", "isometric-neon-paths.jpg", "jupiter.png",
      "Kurzgesagt-Galaxies.png", "Kurzgesagt-Galaxy_3.png", "Lake-Reflection-Cloudy.webp", "mecha-snow.png",
      "minimalist-black-hole.png", "Mountain-Ridge-Sunset.webp", "photo-bridge-aerial-view-clouds.webp",
      "pixel-earth.png", "pixel-galaxy.png", "pixel-planet.png", "plane-purple.png", "puffy-stars.jpg",
      "purpled-night.jpg", "purple-horizon.jpg", "rocket-launch.jpg", "rocket-schematics.jpg", "satellite.png",
      "scifi.jpg", "shattering-planet.png", "sky-whale.jpg", "sky.png", "south-pole.jpg", "space-piano.png",
      "spiral-nebula.png", "space.png", "voyager-1.jpg", "voyager-10.jpg", "voyager-11.jpg", "voyager-13.jpg",
      "voyager-12.jpg", "voyager-14.jpg", "voyager-15.jpg", "voyager-16.jpg", "voyager-17.jpg", "voyager-18.jpg",
      "voyager-19.jpg", "voyager-2.jpg", "voyager-21.jpg", "voyager-20.jpg", "voyager-22.jpg", "voyager-3.jpg",
      "voyager-4.jpg", "voyager-5.jpg", "voyager-6.jpg", "voyager-7.jpg", "voyager-8.jpg", "voyager-9.jpg"
    ],
    "Vehicles_Travel": ["car-1.png", "car-wreck.png", "fishing.jpg", "flying-boat.jpg", "forest-van.jpg",
      "greenbus.jpg", "old-car.jpg", "pixel-car.png", "road.jpg", "ship-3.jpg", "tank.jpg", "ship-2.png",
      "snowy-train.jpg", "train-sideview.png", "van-chilling.png"
    ]
  },
  Nord: {
    "abstract_geometric_designs": ["ign_Aura-1_1.png", "ign_Aura-2_1.png", "ign_circuit_1.png", "ign_Dome-0_1.png",
      "ign_blue_red_blue_blond_1.png", "ign_colorful_1.png", "ign_Dome-1_1.png", "ign_DynamicFry-1_1.png",
      "ign_blue_chains_1.png", "ign_DynamicFry-0_1.png", "ign_FluidifiedST-1_1.png", "ign_FluidifiedST-2_1.png",
      "ign_Globe-1_1.png", "ign_grung_green_yellow_refd_1.png", "ign_Globe-2_1.png",
      "ign_MaterialMountains-1_1.png", "ign_PlasticBeach-1_1.png", "ign_MaterialMountains-2_1.png",
      "ign_PlasticBeach-2_1.png", "ign_Rock-1_1.png", "ign_Rock-2_1.png", "ign_Symbolics-1_1.png",
      "ign_Symbolics-2_1.png"
    ],
    "anime_characters_art": ["ign_anime-girls-with-gun_1.png", "ign_anime-girls_1.png", "ign_batman_1.png",
      "ign_animeGirlSleeping_1.png", "ign_chainsaw-man_1.png", "ign_chomusuke_1.png",
      "ign_girlWithHeadphones_1.png", "ign_duaAnime_1.png", "ign_girl_gun_1.png", "ign_leafHelmet_1.png",
      "ign_rick_3840x2160_1.png", "ign_groot_1_1.png", "ign_starWarsThing_1.png", "ign_StevenUniverse-1_1.png",
      "ign_straw_hat_pirates_1.png", "ign_StevenUniverse-2_1.png", "ign_unicorn_1.png", "ign_vader_1.png",
      "ign_waifu_1.png", "ign_wolf_1.png", "ign_witch_1.png", "ign_yourName_1.png", "nord_naruto_2_1.png",
      "nord_naruto_1.png"
    ],
    "cars_racing_formula1": ["FormulaOne_Button_1_1.jpg", "FormulaOne_Hamilton_1_1.jpg",
      "FormulaOne_Hamilton_3_1.jpg", "FormulaOne_Button_2_1.jpg", "FormulaOne_Hamilton_2_1.jpg",
      "FormulaOne_Rosberg_2_1.jpg", "FormulaOne_Rosberg_1_1.jpg", "FormulaOne_Vettel_2_1.jpg", "ign_ferrari1_1.png",
      "ign_driving_1.png", "ign_ferrari2_1.png", "ign_ferrari3_1.png", "ign_car_1.png", "ign_ferrari4_1.png",
      "ign_racecar_1.png", "FormulaOne_Vettel_1_1.jpg", "ign_sweet_truck_1.png"
    ],
    "linux_distros": ["archlinux_1.png", "artix-nord_1.png", "debian_1.png", "debian-galaxy_1_1.png", "fedora_1.png",
      "elementaryos_1.png", "ign_endeavour1_1.png", "ign_endeavour2_1.png", "ign_endeavour3_1.png",
      "ign_endeavour4_1.png", "ign_FocalFossa-1_1_1.png", "ign_GroovyGorilla-1_1_1.png", "ign_FocalFossa-2_1_1.png",
      "ign_GroovyGorilla-2_1.png", "ign_HirsuitHippo-1_1.png", "ign_HirsuitHippo-2_1.png",
      "ign_HirsuteHippoBlue-1_1_1.png", "ign_manjaro_1.png", "ign_windows_11_1_1.png", "ign_zorin_1.png",
      "linux-friends-4k_1.png", "linux-be-good-4k_1.png", "linux-is-coming-4k_1.png", "linux-tux_1.png",
      "nixos_1.png", "openbsd_1.png", "opensuse_1.png", "plan9_1.png", "slackware_1.png", "ubuntu-aurora_1.png",
      "ubuntu-frost_1.png", "voidlinux-01_1.png", "voidlinux_1.png"
    ],
    "lofi_people_lifestyle": ["ign_dudeOnBuilding2_1_1.png", "ign_dudeOnBuilding_2.png", "ign_LofiAlex-1_1.png",
      "ign_LofiAlex-3_1.png", "ign_LofiAlex-2_1.png", "ign_LofiAlex-4_1.png", "ign_LofiAlex-6_1.png",
      "ign_LofiAlex-5_1.png", "ign_LofiAlexandra-1_1.png", "ign_LofiAlexandra-2_1.png", "ign_LofiCity-1_1_1.png",
      "ign_LofiCity-2_1_1.png", "ign_LofiDino-1_1.png", "ign_LofiDino-2_1.png", "ign_LofiDino-3_1.png",
      "ign_LofiDino-4_1.png", "ign_LofiGirl-1_1.png", "ign_LofiGirl-2_1.png", "ign_LofiGirl-3_1.png",
      "ign_LofiGirl-4_1.png", "ign_LofiGirl-5_1.png", "ign_LofiGirl-6_1.png", "ign_lonely-man_1.png",
      "ign_manInStreet_1.png"
    ],
    "macos_dynamic_unsplash": ["ign_mojave_dynamic_10_1.jpeg", "ign_mojave_dynamic_11_1.jpeg",
      "ign_mojave_dynamic_12_1.jpeg", "ign_mojave_dynamic_14_1.jpeg", "ign_mojave_dynamic_13_1.jpeg",
      "ign_mojave_dynamic_15_1.jpeg", "ign_mojave_dynamic_16_1.jpeg", "ign_mojave_dynamic_1_1.jpeg",
      "ign_mojave_dynamic_4_1.jpeg", "ign_mojave_dynamic_2_1.jpeg", "ign_mojave_dynamic_5_1.jpeg",
      "ign_mojave_dynamic_6_1.jpeg", "ign_mojave_dynamic_7_1.jpeg", "ign_mojave_dynamic_3_1.jpeg",
      "ign_mojave_dynamic_8_1.jpeg", "ign_mojave_dynamic_9_1.jpeg", "ign_unsplash10_1.png", "ign_unsplash12_1.png",
      "ign_unsplash11_1.png", "ign_unsplash13_1.png", "ign_unsplash14_1.png", "ign_unsplash15_1.png",
      "ign_unsplash16_1.png", "ign_unsplash17_1.png", "ign_unsplash19_1.png", "ign_unsplash18_1.png",
      "ign_unsplash1_1.png", "ign_unsplash21_1.png", "ign_unsplash20_1.png", "ign_unsplash22_1.png",
      "ign_unsplash23_1.png", "ign_unsplash24_1.png", "ign_unsplash25_1.png", "ign_unsplash27_1.png",
      "ign_unsplash26_1.png", "ign_unsplash28_1.png", "ign_unsplash29_1.png", "ign_unsplash2_1.png",
      "ign_unsplash30_1.png", "ign_unsplash31_1.png", "ign_unsplash32_1.png", "ign_unsplash33_1.png",
      "ign_unsplash34_1.png", "ign_unsplash35_1.png", "ign_unsplash36_1.png", "ign_unsplash37_1.png",
      "ign_unsplash38_1.png", "ign_unsplash39_1.png", "ign_unsplash3_1.png", "ign_unsplash40_1.png",
      "ign_unsplash41_1.png", "ign_unsplash42_1.png", "ign_unsplash43_1.png", "ign_unsplash44_1.png",
      "ign_unsplash45_1.png", "ign_unsplash46_1.png", "ign_unsplash47_1.png", "ign_unsplash48_1.png",
      "ign_unsplash49_1.png", "ign_unsplash4_1.png", "ign_unsplash50_1.png", "ign_unsplash51_1.png",
      "ign_unsplash52_1.png", "ign_unsplash5_1.png", "ign_unsplash6_1.png", "ign_unsplash8_1.png",
      "ign_unsplash7_1.png", "ign_unsplash9_1.png"
    ],
    "miscellaneous": ["ign_about_to_die_1.png", "ign_access_control_1.png", "ign_Carvan-1_1.png", "ign_archie_1.png",
      "ign_Carvan-2_1.png", "ign_chineseIG_1.png", "ign_EOS-ViktorForgacs01_1.png", "ign_EOS-ViktorForgacs02_1.png",
      "ign_EOS-ViktorForgacs03_1.png", "ign_EOS-ViktorForgacs04_1.png", "ign_herakles_1.png", "ign_gunshot_1.png",
      "ign_late-morning_1.png", "ign_legendary_1.png", "ign_PaintingStudio-01_1.png", "ign_MagicLake01_1.png",
      "ign_PaintingStudio-02_1.png", "ign_PaintingStudio-03_1.png", "ign_raid_in_the_dark_1.png",
      "ign_Rocknegy-1_1.png", "ign_Rocksketto-1_1.png", "ign_Rocknegy-2_1.png", "ign_Rocksketto-2_1.png",
      "ign_Solitude-1_1.png", "ign_Solitude-2_1.png", "ign_soupKong_1.png", "ign_StepbyStep-1_1.png",
      "ign_StepbyStep-2_1.png", "ign_street-crossing_1.png", "ign_stuff_1.png", "ign_Viragegy-1_1.png",
      "ign_Viragegy-2_1.png", "ign_Viragharom-2_1.png", "ign_Viragharom-1_1.png", "ign_Viragnegy-1_1.png",
      "ign_WaterHill-1_1.png", "ign_Viragnegy-2_1.png", "ign_WaterHill-2_1.png", "ign_wild_fish_1.png",
      "ign_Wiravketto-1_1.png", "ign_Wiravketto-2_1.png", "ign_yayayayayaya_1.png", "super-mario_1.png"
    ],
    "nature_landscapes_city": ["at_the_coffeshop_1_1.png", "audio-bunny_1.png", "ign_bratislava_1.png",
      "ign_afternoon_1.png", "ign_cityRainOther_1_1.png", "ign_cityRain_1_1.png", "ign_city_1.png",
      "ign_evening_1_1_1.png", "ign_evening_2_1.png", "ign_Firewatch2-1_1_1.png", "ign_Firewatch2-3_1_1.png",
      "ign_Firewatch2-2_1_1.png", "ign_Firewatch2-5_1_1.png", "ign_Firewatch2-4_1_1.png",
      "ign_Firewatch2-6_1_1.png", "ign_Firewatch2-7_1_1.png", "ign_Firewatch2-8_1_1.png", "ign_Fuji-1_1.png",
      "ign_Fuji-2_1.png", "ign_LakesideDeer-01_1_1.png", "ign_LakesideDeer-02_2.png", "ign_LakesideDeer-03_1_1.png",
      "ign_LakesideDeer-04_1_1.png", "ign_LakesideDeer-06_2.png", "ign_LakesideDeer-05_1_1.png",
      "ign_LakesideDeer-07_1_1.png", "ign_LakesideDeer-08_1_1.png", "ign_LakesideDeer-09_1_1.png",
      "ign_LakesideDeer-10_1_1.png", "ign_LakesideDeer-11_1_1.png", "ign_LakesideDeer-12_1_1.png",
      "ign_LakesideDeer-1_1_1.png", "ign_LakesideDeer-2_1_1.png", "ign_lighthouse_1.png", "ign_midday_1.png",
      "ign_night_1.png", "ign_sunGarden_1.png", "ign_sunAndClouds_1.png", "ign_sunrise_1_1.png",
      "ign_TokyoStreet-1_1.png", "ign_sunset_1.png", "ign_TokyoStreet-2_1.png", "underwater_1.png",
      "street_blues_1.png"
    ],
    "nord_theme": ["Abstract-Nord_1.png", "chemical_nord_1.png", "BirdNord_1.png", "CRON-Nord_1.png",
      "ign_nordic_rose_1.png", "ign_nordic_triangle_1.png", "Minimal-Nord_1.png", "nord-arctic-fox_1.png",
      "nord-balloons_1.png", "Nordic-Heroin_1.png", "nordic-obsession_1.png", "nordtheme_1.png", "nord_space_1.png",
      "nord_design_1.png", "nord_buildings_1.png", "nord_triangles_1.png"
    ],
    "space_scifi_cyberpunk": ["container_ship_1.png", "cpu_city_1_1.png", "earth-in-space_1.png",
      "ign_astronautInTheOcean_1.png", "ign_graySpaceship_1_1.png", "ign_astronaut_1.png",
      "ign_highTechGlobe_1_1.png", "ign_robots_1.png", "ign_outer_space_1.png", "ign_vaporWave_1.png",
      "pixelcity_1_1.png", "prime-number-spiral_1.png", "rocket_1.png", "space_kitty_1_1.png", "pixelmoon_1.png"
    ],
    "tech_misc_branding": ["gnu-linux_1.png", "ign-0000_1.png", "ign-0001_1.png", "ign-0002_1.png", "ign-0003_1.png",
      "ign-0008_1.png", "ign-0009_1.png", "ign-0011_1.png", "ign-hevlettpackard_1.png",
      "ign_ChromeOSBlues-1_1_1.png", "ign_ChromeOSEarth-1_1.png", "ign_ChromeOSBlues-2_1_1.png",
      "ign_ChromeOSEarth-2_1_1.png", "ign_ChromeOSFire-1_1_1.png", "ign_ChromeOSFire-2_1_1.png",
      "ign_ChromeOSGreens-1_1_1.png", "ign_ChromeOSGreens-2_1_1.png", "ign_ChromeOSReds-1_1_1.png",
      "ign_ChromeOSReds-2_1_1.png", "ign_ChromeOSWater-2_1_1.png", "ign_ChromeOSWater-1_1_1.png",
      "ign_ChromeOSWind-1_1_1.png", "ign_ChromeOSWind-2_1.png", "ign_ChromeOSYellows-1_1_1.png", "keyboard_1.png",
      "ign_ChromeOSYellows-2_1_1.png", "kittyboard_1.png", "utiity_1.png", "windows-panic_1_1.png"
    ]
  },
  "One Dark": {
    "anime_art_abstract": ["od_abstract.png", "od_awesome.png", "od_brain.jpeg", "od_brush.png", "od_bust.jpg",
      "od_chained.png", "od_discovery.png", "od_error.png", "od_fsociety.png", "od_gargantua.png",
      "od_illusion.png", "od_nighthakws.png", "od_new.png", "od_ometer.png", "od_ouroboros.png", "od_patterns.png",
      "od_qr.png", "od_rice.png", "od_shards.png", "od_sound.png", "od_test.png", "od_tri.png", "od_wave.png"
    ],
    "desktop_environments_window_managers": ["od_bspwm.png", "od_dwm.png", "od_cinnamon.png", "od_gnome.png",
      "od_hyprland.png", "od_kde.png", "od_mate.png", "od_xfce.png", "od_sway.png", "od_xmonad.png", "od_i3.png",
      "od_qtile.png"
    ],
    "gaming": ["od_botw.jpg", "od_botw_saddled.jpg", "od_botw_z.png", "od_hylian_crest.png", "od_master_sword.png",
      "od_n64.webp", "od_pacman.png", "od_pacman_arcade.png", "od_sheikah_eye.png", "od_shield.png",
      "od_tetris.png", "od_stamina.png", "od_stamina+.png", "od_tetris_1.png", "od_xbox.webp"
    ],
    "linux_distros": ["od_arch.png", "od_artix.png", "od_debain.png", "od_endeavouros.png", "od_fedora.png",
      "od_freebsd.png", "od_gentoo.png", "od_kali.png", "od_mint.png", "od_manjaro.png", "od_neon.png",
      "od_nixos.png", "od_neon_warm.png", "od_manjaro_1.png", "od_popos_1.png", "od_openbsd.png", "od_popos_2.png",
      "od_rhel.png", "od_tumbleweed.png", "od_tux.png", "od_ubuntu.png", "od_void.png"
    ],
    "memes_misc": ["od_berlinetta.png", "od_breadbrd.jpg", "od_current.png", "od_drift.png",
      "od_fuck_u_nvidia_aqua.png", "od_ds4.jpg", "od_fuck_u_nvidia_blue.png", "od_fuck_u_nvidia_green.png",
      "od_fuck_u_nvidia_grey.png", "od_fuck_u_nvidia_purple.png", "od_fuck_u_nvidia_yellow.png", "od_leap.png",
      "od_gnu.png"
    ],
    "movies_tv_scifi": ["od_guardian.png", "od_interstellar.webp", "od_ironman.png", "od_ironman_2.png",
      "od_ironman_3.png", "od_revan.png", "od_ironman_stencil.png", "od_stalker.png"
    ],
    "nature_landscapes": ["od_autumn.jpg", "od_balloons.png", "od_clouds.png", "od_fern.jpg", "od_food.png",
      "od_hills.png", "od_lake.jpeg", "od_leaf.jpg", "od_plane.jpg", "od_plant.jpg", "od_road.jpg", "od_sea.jpg",
      "od_serenity.jpg", "od_street.png", "od_trail.jpg", "od_tokyo.jpg", "od_underwater.png", "od_waves_1.jpg"
    ],
    "space_vaporwave_cyberpunk": ["od_outrun_wave_1.png", "od_planets.png", "od_planets_1.png", "od_space02.png",
      "od_space01.png", "od_vaporwave_1.png"
    ],
    "tech_brands_platforms": ["od_apple_grey.png", "od_blender.png", "od_firefox.png", "od_chrome.png",
      "od_inkscape.png", "od_rpi.jpg", "od_windows.png", "od_nasa.png", "od_android.png", "od_ps.webp"
    ],
    "terminal_shell_editor_tools": ["od_bash.png", "od_emacs.png", "od_lazygit.png", "od_git.png", "od_shell.png",
      "od_torvalds.png", "od_sysd.png", "od_vim.png", "od_zsh.png", "od_nano.png", "od_nvim.png"
    ]
  }
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
      FOLDERS_DATA[baseFolder][
        subfolder
      ].forEach(file => {
        uniqueImageUrls.add(getImageUrl(baseFolder, subfolder, file));
      });
    });
  });
  document.getElementById('total-images').textContent = uniqueImageUrls.size;
}
