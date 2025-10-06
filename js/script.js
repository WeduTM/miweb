document.addEventListener('DOMContentLoaded', function() {

    // --- ELEMENTOS PRINCIPALES ---
    const preloader = document.getElementById('preloader');
    const clickToStart = document.getElementById('click-to-start');
    const bootText = document.querySelector('.boot-text');
    const bootSound = document.getElementById('typing-sound');
    const startSimButton = document.getElementById('start-sim-button');
    const confirmSound = document.getElementById('confirm-sound');
    const loreSound = document.getElementById('lore-sound');

    // --- FUNCIÓN PARA INICIAR LA EXPERIENCIA (AL HACER CLICK) ---
    function startExperience() {
        clickToStart.classList.add('hidden');
        bootText.classList.remove('hidden');
        
        bootSound.play().catch(error => console.warn("Error al reproducir audio:", error));
        
        setTimeout(() => {
            preloader.style.opacity = '0';
            fadeOutSound(bootSound);
            setTimeout(() => { preloader.classList.add('hidden'); }, 500);
        }, 4500);
        
        setTimeout(() => {
            typeWriter();
        }, 5100); // Retrasado un poco más para dar tiempo a la transición
    }

    // --- EVENT LISTENER ÚNICO PARA COMENZAR ---
    window.addEventListener('click', startExperience, { once: true });
    
    // --- EVENT LISTENER PARA EL BOTÓN DE "INICIAR SIMULACIÓN" ---
    startSimButton.addEventListener('click', function() {
        confirmSound.currentTime = 0;
        confirmSound.play();
    });

    // --- FUNCIÓN DE FADE OUT DEL SONIDO ---
    function fadeOutSound(sound) {
        if (!sound.paused) {
            let fadeOutInterval = setInterval(() => {
                if (sound.volume > 0.1) { sound.volume -= 0.1; } 
                else {
                    clearInterval(fadeOutInterval);
                    sound.pause();
                    sound.currentTime = 0;
                    sound.volume = 1;
                }
            }, 50);
        }
    }

    // --- FUNCIÓN DEL CONTADOR (sin cambios) ---
    const countdown = () => {
        const targetDate = new Date('October 24, 2025 19:30:00 GMT+0200').getTime();
        const now = new Date().getTime();
        const gap = targetDate - now;
        if (gap < 0) { document.getElementById('days').innerText = '00'; document.getElementById('hours').innerText = '00'; document.getElementById('minutes').innerText = '00'; document.getElementById('seconds').innerText = '00'; return; }
        const day = 1000 * 60 * 60 * 24, hour = day / 24, minute = hour / 60;
        const textDay = Math.floor(gap / day);
        const textHour = Math.floor((gap % day) / hour);
        const textMinute = Math.floor((gap % hour) / minute);
        const textSecond = Math.floor((gap % minute) / (1000));
        document.getElementById('days').innerText = textDay < 10 ? '0' + textDay : textDay;
        document.getElementById('hours').innerText = textHour < 10 ? '0' + textHour : textHour;
        document.getElementById('minutes').innerText = textMinute < 10 ? '0' + textMinute : textMinute;
        document.getElementById('seconds').innerText = textSecond < 10 ? '0' + textSecond : textSecond;
    };
    setInterval(countdown, 1000);

    // --- FUNCIÓN DE MÁQUINA DE ESCRIBIR ---
    const storyText = `[26/10/2015: 0400Z] - En 2015, un choque naval entre Estados Unidos y China desató una crisis sin precedentes. Washington reaccionó con rapidez, desplegando fuerzas en el Pacífico, mientras Pekín movilizaba su armada y declaraba que defendería sus rutas comerciales “a cualquier precio”.

[26/10/2015: 0830Z] - Rusia no tardó en aprovechar el caos: reforzó el Báltico, amenazó con cortar el suministro energético a Europa y desplegó submarinos en el Ártico. España, atada por la OTAN pero dividida internamente, se vio obligada a entrar en el conflicto.

[26/10/2015: 1400Z] - La guerra empezó en el ciberespacio. Lo último que se sabe con certeza es que una flota ruso-china se aproximaba al Estrecho de Gibraltar. A partir de ese punto, los registros oficiales se interrumpen y solo quedan rumores.`;
    const typewriterElement = document.getElementById('typewriter');
    let i = 0;
    const speed = 30;

    function typeWriter() {
        if (i === 0) {
            loreSound.currentTime = 0;
            loreSound.loop = true;
            loreSound.play();
        }
        if (i < storyText.length) {
            typewriterElement.innerHTML += storyText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            loreSound.loop = false;
            fadeOutSound(loreSound);
        }
    }
});