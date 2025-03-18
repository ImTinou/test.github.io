// Compteurs de victoires par jeu
const gameVictories = {
    total: 0,
    blackjack: 0,
    typing: 0,
    platform: 0
};

// Charger les victoires depuis le stockage local
function loadVictories() {
    if (localStorage.getItem('camilleGameVictories')) {
        const savedVictories = JSON.parse(localStorage.getItem('camilleGameVictories'));
        gameVictories.total = savedVictories.total || 0;
        gameVictories.blackjack = savedVictories.blackjack || 0;
        gameVictories.typing = savedVictories.typing || 0;
        gameVictories.platform = savedVictories.platform || 0;
    }
    
    // Mettre à jour l'affichage
    updateVictoryDisplays();
}

// Sauvegarder les victoires dans le stockage local
function saveVictories() {
    localStorage.setItem('camilleGameVictories', JSON.stringify(gameVictories));
}

// Ajouter une victoire
function addVictory(game) {
    gameVictories[game]++;
    gameVictories.total++;
    saveVictories();
    updateVictoryDisplays();
}

// Mettre à jour l'affichage des victoires
function updateVictoryDisplays() {
    // Cette fonction sera définie différemment dans chaque page
    if (window.updateVictoryDisplaysPage) {
        window.updateVictoryDisplaysPage();
    }
}

// Contexte audio pour les sons
let audioContext = null;

// Initialiser le contexte audio lors de la première interaction
function initAudio() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio non disponible');
        }
    }
}

// Système de son simple
function playSound(type) {
    if (!audioContext) return;
    
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch (type) {
            case 'select':
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
            case 'start':
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(660, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(1320, audioContext.currentTime + 0.2);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + 0.2);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
            case 'back':
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(440, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
            case 'hit':
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(110, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'card':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.05);
                gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'win':
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(660, audioContext.currentTime + 0.2);
                oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.4);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.6);
                break;
            case 'lose':
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(220, audioContext.currentTime + 0.2);
                oscillator.frequency.setValueAtTime(110, audioContext.currentTime + 0.4);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.6);
                break;
            case 'type':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(700, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'correct':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(1320, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
            case 'incorrect':
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(175, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
            case 'jump':
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(330, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(660, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
            case 'coin':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(1320, audioContext.currentTime + 0.05);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'death':
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(440, audioContext.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(220, audioContext.currentTime + 0.2);
                oscillator.frequency.setValueAtTime(110, audioContext.currentTime + 0.3);
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.4);
                break;
        }
    } catch (e) {
        console.error('Audio error:', e);
        // Échec silencieux si l'audio n'est pas disponible
    }
}

// Animation de transition entre les écrans
function createTransition() {
    const transition = document.getElementById('transition');
    
    // Remplir la transition avec des pixels si ce n'est pas déjà fait
    if (transition.children.length === 0) {
        for (let i = 0; i < 300; i++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            transition.appendChild(pixel);
        }
    }
}

// Fonction pour obtenir une couleur aléatoire
function getRandomColor() {
    const colors = ['#ff0000', '#ffff00', '#00ffff', '#ff00ff', '#00ff00', '#0000ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Charger les victoires au démarrage
document.addEventListener('DOMContentLoaded', () => {
    loadVictories();
    createTransition();
});