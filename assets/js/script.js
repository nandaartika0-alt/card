const playlist = [
            {
                title: "Every Summertime",
                artist: "NIKI ✨",
                url: "assets/audio/NIKI - Every Summertime (Lyrics) Every year we get older.mp3"
            },
            {
                title: "lover girl",
                artist: "lauvey 🎒",
                url: "assets/audio/Laufey - Lover Girl (Official Music Video) [obLSGG-oEyw].mp3"
            },
            {
                title: "See You Again",
                artist: "Tyler, The Creator 🌸",
                url: "assets/audio/Tyler, The Creator - SEE YOU AGAIN (ft. Kali Uchis).mp3"
            },
            {
                title: "style",
                artist: "H2H 🍦",
                url: "assets/audio/Hearts2Hearts STYLE Easy Lyrics [ozcdNL1PisA].mp3"
            }
        ];

        let currentTrack = 0;
        const audio = document.getElementById('bg-audio');
        const playIcon = document.getElementById('play-icon');
        const musicDisc = document.getElementById('music-disc');
        const trackTitle = document.getElementById('track-title');
        const trackArtist = document.getElementById('track-artist');

        function loadTrack(index) {
            audio.src = playlist[index].url;
            trackTitle.innerText = playlist[index].title;
            trackArtist.innerText = playlist[index].artist;
        }

        function togglePlay() {
            if (audio.paused) {
                audio.play().then(() => {
                    playIcon.className = "fa-solid fa-pause";
                    musicDisc.classList.add('playing');
                }).catch(err => console.log("Audio play blocked:", err));
            } else {
                audio.pause();
                playIcon.className = "fa-solid fa-play";
                musicDisc.classList.remove('playing');
            }
        }

        function nextTrack() {
            currentTrack = (currentTrack + 1) % playlist.length;
            loadTrack(currentTrack);
            audio.play().catch(e => console.log(e));
            playIcon.className = "fa-solid fa-pause";
            musicDisc.classList.add('playing');
        }

        function prevTrack() {
            currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
            loadTrack(currentTrack);
            audio.play().catch(e => console.log(e));
            playIcon.className = "fa-solid fa-pause";
            musicDisc.classList.add('playing');
        }

        // Full Screen Falling Petals Across 100vw
        function createPetals() {
            const container = document.getElementById('petals-container');
            container.innerHTML = '';
            const petalCount = 35;

            for (let i = 0; i < petalCount; i++) {
                let petal = document.createElement('div');
                petal.classList.add('petal');
                
                // Distributed uniformly across 0% - 100% of viewport width
                let startX = Math.random() * 98; // in vw
                let duration = Math.random() * 6 + 6;
                let delay = Math.random() * 8;
                let endX = (Math.random() - 0.5) * 15; // drift in vw
                let endRotation = Math.random() * 720;
                let size = Math.random() * 10 + 10;

                petal.style.width = size + 'px';
                petal.style.height = (size * 1.2) + 'px';
                petal.style.left = startX + 'vw';
                petal.style.animationDuration = duration + 's';
                petal.style.animationDelay = delay + 's';
                petal.style.setProperty('--end-x', endX + 'vw');
                petal.style.setProperty('--end-rotation', endRotation + 'deg');

                container.appendChild(petal);
            }
        }

        // Bouquet Builder State
        const flowerSelection = {
            'rose': true,
            'tulip-pink': true,
            'lily': true,
            'tulip-yellow': true,
            'lavender': true
        };

        const flowerEmojis = {
            'rose': '🌹',
            'tulip-pink': '🌷',
            'lily': '🌺',
            'tulip-yellow': '🌼',
            'lavender': '🪻'
        };

        function toggleFlower(flowerKey, element) {
            flowerSelection[flowerKey] = !flowerSelection[flowerKey];
            if (flowerSelection[flowerKey]) {
                element.classList.add('selected');
            } else {
                element.classList.remove('selected');
            }
            updateBouquetPreview();
        }

        function updateBouquetPreview() {
            const previewBox = document.getElementById('bouquet-preview-list');
            previewBox.innerHTML = '';
            let hasFlower = false;
            for (let key in flowerSelection) {
                if (flowerSelection[key]) {
                    hasFlower = true;
                    let span = document.createElement('span');
                    span.innerText = flowerEmojis[key];
                    previewBox.appendChild(span);
                }
            }
            if (!hasFlower) {
                previewBox.innerHTML = '<span class="text-xs text-pink-400 font-normal">Pilih minimal 1 bunga ya!</span>';
            }
        }

        function renderBouquetSVG() {
            const container = document.getElementById('bouquetContainerSVG');
            
            let showRose = flowerSelection['rose'];
            let showTulipPink = flowerSelection['tulip-pink'];
            let showLily = flowerSelection['lily'];
            let showTulipYellow = flowerSelection['tulip-yellow'];
            let showLavender = flowerSelection['lavender'];

            container.innerHTML = `
                <svg viewBox="0 0 140 130" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <path d="M55 75 Q40 98 30 120" stroke="#52b788" stroke-width="4" fill="none" stroke-linecap="round"/>
                    <path d="M70 70 L70 125" stroke="#38b000" stroke-width="4.5" fill="none" stroke-linecap="round"/>
                    <path d="M85 75 Q100 98 110 120" stroke="#52b788" stroke-width="4" fill="none" stroke-linecap="round"/>
                    
                    <path d="M45 95 Q20 90 32 105 Z" fill="#70e000"/>
                    <path d="M95 95 Q120 90 108 105 Z" fill="#70e000"/>

                    <path d="M50 90 Q70 80 90 90 Q70 105 50 90 Z" fill="#ff4d6d"/>
                    <circle cx="70" cy="90" r="6" fill="#c9184a"/>
                    <path d="M65 94 L52 118 M75 94 L88 118" stroke="#ff4d6d" stroke-width="3.5" stroke-linecap="round"/>

                    ${showLily ? `
                    <!-- White Lily Center -->
                    <g transform="translate(70, 38)">
                        <path d="M0 0 Q-16 -22 0 -40 Q16 -22 0 0" fill="#ffffff" stroke="#ffb3c1" stroke-width="1.5"/>
                        <path d="M0 0 Q-28 -10 -32 -28 Q-12 -28 0 0" fill="#ffffff" stroke="#ffb3c1" stroke-width="1.5"/>
                        <path d="M0 0 Q28 -10 32 -28 Q12 -28 0 0" fill="#ffffff" stroke="#ffb3c1" stroke-width="1.5"/>
                        <circle cx="0" cy="-18" r="3" fill="#ffb703"/>
                        <circle cx="-10" cy="-14" r="2.5" fill="#ffb703"/>
                        <circle cx="10" cy="-14" r="2.5" fill="#ffb703"/>
                        <line x1="0" y1="0" x2="0" y2="-18" stroke="#ffb703" stroke-width="1.5"/>
                    </g>` : ''}

                    ${showTulipPink ? `
                    <!-- Pink Tulip Left -->
                    <g transform="translate(38, 52)">
                        <path d="M0 0 Q-15 -18 -10 -35 Q0 -24 0 0" fill="#ff758f"/>
                        <path d="M0 0 Q15 -18 10 -35 Q0 -24 0 0" fill="#ff4d6d"/>
                        <path d="M-8 -32 Q0 -40 8 -32 Q0 -18 -8 -32" fill="#ffb3c1"/>
                    </g>` : ''}

                    ${showTulipYellow ? `
                    <!-- Yellow Tulip Right -->
                    <g transform="translate(102, 52)">
                        <path d="M0 0 Q-15 -18 -10 -35 Q0 -24 0 0" fill="#ffb703"/>
                        <path d="M0 0 Q15 -18 10 -35 Q0 -24 0 0" fill="#ff9e00"/>
                        <path d="M-8 -32 Q0 -40 8 -32 Q0 -18 -8 -32" fill="#ffd166"/>
                    </g>` : ''}

                    ${showRose ? `
                    <!-- Pink Rose Top Right -->
                    <g transform="translate(88, 30)">
                        <circle cx="0" cy="0" r="10" fill="#ff4d6d"/>
                        <circle cx="-2" cy="-2" r="6" fill="#ff758f"/>
                        <circle cx="-3" cy="-3" r="3" fill="#ffffff"/>
                    </g>` : ''}

                    ${showLavender ? `
                    <!-- Lavender Left -->
                    <g transform="translate(25, 40)">
                        <circle cx="0" cy="0" r="4" fill="#b5179e"/>
                        <circle cx="-3" cy="-6" r="3.5" fill="#7209b7"/>
                        <circle cx="3" cy="-12" r="3" fill="#b5179e"/>
                    </g>` : ''}
                </svg>
            `;
        }

        function finishBouquet() {
            renderBouquetSVG();
            nextSection('sec-envelope');
        }

        const sectionsList = ['sec-opening', 'sec-bouquet', 'sec-envelope', 'sec-cake', 'sec-gallery', 'sec-closing'];
        let currentSectionIndex = 0;

        function startSurprise(targetSection) {
            nextSection(targetSection);
            if (audio.paused) {
                togglePlay();
            }
        }

        function nextSection(sectionId) {
            document.querySelectorAll('.section').forEach(sec => {
                sec.classList.remove('active');
            });

            const target = document.getElementById(sectionId);
            if(target) {
                target.classList.add('active');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });

            currentSectionIndex = sectionsList.indexOf(sectionId);
            updateNavDots(currentSectionIndex);

            if (sectionId === 'sec-cake' && !audioContext) {
                initMic();
            }
        }

        function updateNavDots(index) {
            const dots = document.querySelectorAll('.nav-dot');
            dots.forEach((dot, i) => {
                if(i === index) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }

        // Keyboard Navigation (Arrow Keys)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                if (currentSectionIndex < sectionsList.length - 1) {
                    nextSection(sectionsList[currentSectionIndex + 1]);
                }
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                if (currentSectionIndex > 0) {
                    nextSection(sectionsList[currentSectionIndex - 1]);
                }
            }
        });

        function openEnvelope() {
            const wrapper = document.getElementById('envelopeWrapper');
            if (!wrapper.classList.contains('open')) {
                wrapper.classList.add('open');
                playSound();
                setTimeout(() => {
                    const btn = document.getElementById('btn-to-cake');
                    btn.classList.remove('opacity-0', 'pointer-events-none');
                }, 1200);
            }
        }

        let audioContext;
        let analyser;
        let microphone;
        let isBlown = false;

        async function initMic() {
            const micText = document.getElementById('mic-text');
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                microphone = audioContext.createMediaStreamSource(stream);
                
                microphone.connect(analyser);
                analyser.fftSize = 256;
                
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                
                micText.innerText = "Mic aktif! Silakan tiup ke arah microphone-mu 💨";

                function checkVolume() {
                    if (isBlown) return;

                    analyser.getByteFrequencyData(dataArray);
                    let sum = 0;
                    for (let i = 0; i < bufferLength; i++) {
                        sum += dataArray[i];
                    }
                    let average = sum / bufferLength;

                    if (average > 65) { 
                        celebrateWish();
                    } else {
                        requestAnimationFrame(checkVolume);
                    }
                }
                checkVolume();

            } catch (err) {
                console.warn("Microphone access denied:", err);
                micText.innerText = "Mic tidak aktif. Klik tombol tiup di bawah ya!";
            }
        }

        function celebrateWish() {
            if (isBlown) return;
            isBlown = true;
            
            const flame = document.getElementById('candle-flame');
            flame.classList.add('out');
            
            const micText = document.getElementById('mic-text');
                micText.innerText = "YAYY! Lilin berhasil ditiup! 🎉✨";

            playSound();
            createConfetti();

            if(audioContext) {
                audioContext.close();
            }

            setTimeout(() => {
                nextSection('sec-gallery');
            }, 2400);
        }

        function createConfetti() {
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 120,
                    spread: 85,
                    origin: { y: 0.6 },
                    colors: ['#ff4d6d', '#ffccd5', '#ffb703', '#ffffff', '#ff8fa3']
                });
            }
        }

        function playSound() {
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = ctx.createOscillator();
                const gainNode = ctx.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(ctx.destination);
                
                oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.3);
            } catch(e) {
                console.log("Audio sound play:", e);
            }
        }

        window.onload = function() {
            createPetals();
            loadTrack(currentTrack);
            renderBouquetSVG();
            console.log('🌷 Birthday Surprise Ready! 🎉');
        };

        function renderBouquetSVG() {
            const container = document.getElementById('bouquetContainerSVG');
            const selected = flowerSelection;
            const flower = (condition, markup) => condition ? markup : '';

            container.innerHTML = `
                <svg viewBox="0 0 180 160" width="100%" height="100%" role="img" aria-label="Buket bunga pilihan">
                    <path d="M90 82 C77 104 64 126 57 146 M90 82 C95 108 107 128 122 147 M90 82 L90 148" fill="none" stroke="#2d8a5b" stroke-width="4" stroke-linecap="round"/>
                    <path d="M74 116 C52 105 41 112 56 126 C66 130 73 125 80 119 M106 116 C129 105 139 112 124 126 C114 130 107 125 100 119" fill="#58b979" stroke="#277a50" stroke-width="2"/>
                    ${flower(selected.lily, `<g transform="translate(90 42)"><path d="M0 8 C-25 -15 -25 -31 0 -20 C25 -31 25 -15 0 8Z" fill="#fff" stroke="#ff9fb2" stroke-width="2"/><path d="M0 8 C-10 -17 -5 -34 0 -25 C5 -34 10 -17 0 8Z" fill="#ffeef2"/><circle cy="-8" r="4" fill="#f2b84b"/></g>`)}
                    ${flower(selected.rose, `<g transform="translate(128 57)"><circle r="15" fill="#e83e67"/><path d="M-12 0 Q-7 -17 4 -8 Q17 -10 10 3 Q8 15 -5 9 Q-17 12 -12 0Z" fill="#ff718c"/><circle r="5" fill="#c52952"/></g>`)}
                    ${flower(selected['tulip-pink'], `<g transform="translate(52 62)"><path d="M-17 -21 Q-13 6 0 9 Q13 6 17 -21 Q7 -12 0 -4 Q-7 -12 -17 -21Z" fill="#ff5d7c" stroke="#e33f61" stroke-width="2"/></g>`)}
                    ${flower(selected['tulip-yellow'], `<g transform="translate(133 91)"><path d="M-15 -22 Q-12 5 0 8 Q12 5 15 -22 Q7 -13 0 -4 Q-7 -13 -15 -22Z" fill="#ffc857" stroke="#e6a928" stroke-width="2"/></g>`)}
                    ${flower(selected.lavender, `<g transform="translate(39 58)" fill="#8961b8"><ellipse cy="-15" rx="6" ry="10"/><ellipse cx="-8" cy="-7" rx="6" ry="10"/><ellipse cx="8" cy="-7" rx="6" ry="10"/><ellipse cy="2" rx="6" ry="10"/></g>`)}
                    <path d="M53 136 Q90 151 127 136 L118 157 Q90 166 62 157Z" fill="#ff6b86" stroke="#d94363" stroke-width="2"/>
                    <path d="M90 151 C73 151 65 161 54 158 C62 145 73 142 90 148 C107 142 118 145 126 158 C115 161 107 151 90 151Z" fill="#ff9fb2" stroke="#d94363" stroke-width="2"/>
                </svg>`;
        }

