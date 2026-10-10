// Bank Soal Teks Eksposisi
const questionsData = [
    {
        question: "Apa tujuan utama dari Teks Eksposisi?",
        options: [
            "Menceritakan rekaan peristiwa secara merinci dan berurutan",
            "Menjelaskan dan memaparkan informasi serta pengetahuan secara akurat dan objektif",
            "Membujuk dan mempengaruhi pembaca agar membeli produk tertentu",
            "Menggambarkan keindahan suatu objek dengan impresi indra panca"
        ],
        correct: 1,
        explanation: "Teks eksposisi bertujuan menyampaikan informasi atau pengetahuan secara ilmiah, jelas, dan objektif untuk memperluas wawasan pembaca."
    },
    {
        question: "Bagian awal teks eksposisi yang berisi isu, masalah, atau pandangan umum penulis mengenai topik dinamakan...",
        options: [
            "Tesis (Pernyataan Pendapat)",
            "Rangkaian Argumen",
            "Penegasan Ulang",
            "Deskripsi Bagian"
        ],
        correct: 0,
        explanation: "Tesis adalah bagian pembuka yang berisi pendapat umum atau pendirian penulis tentang masalah yang dibahas."
    },
    {
        question: "Bagian teks eksposisi yang berisi alasan, bukti ilmiah, dan fakta pendukung untuk memperkuat pendapat penulis adalah...",
        options: [
            "Tesis",
            "Rangkaian Argumen",
            "Penegasan Ulang",
            "Koda"
        ],
        correct: 1,
        explanation: "Rangkaian argumen berisi data pendukung, alasan rasional, dan fakta untuk membuktikan kebenaran dari tesis."
    },
    {
        question: "Bagian akhir teks eksposisi yang memuat simpulan dan penegasan kembali atas pendapat sebelumnya dinamakan...",
        options: [
            "Orientasi",
            "Rangkaian Argumen",
            "Penegasan Ulang (Reorientasi)",
            "Komplikasi"
        ],
        correct: 2,
        explanation: "Penegasan ulang berada di akhir teks untuk merangkum dan menguatkan kembali tesis berdasarkan argumen-argumen yang telah dipaparkan."
    },
    {
        question: "Manakah kalimat berikut yang menggunakan istilah/kata teknis dalam bidang lingkungan?",
        options: [
            "Polusi udara akibat emisi karbon mengancam keragaman hayati dan ekosistem.",
            "Hari ini cuaca sangat dingin dan angin bertiup kencang sekali.",
            "Mereka berjalan-jalan ke taman untuk menikmati pemandangan sore.",
            "Banyak orang menyukai makanan manis saat sedang bersantai."
        ],
        correct: 0,
        explanation: "Kata 'emisi karbon', 'keragaman hayati', dan 'ekosistem' merupakan kata teknis (istilah khusus) dalam bidang lingkungan."
    },
    {
        question: "Di antara kalimat berikut, mana yang menggunakan Konjungsi Kausalitas (sebab-akibat)?",
        options: [
            "Pencemaran sungai terus meningkat, oleh karena itu bencana banjir sering terjadi.",
            "Pertama buka bungkusnya, lalu tuangkan air panas secukupnya.",
            "Meskipun hujan turun dengan deras, ia tetap pergi ke sekolah.",
            "Anak itu sangat pintar dan rajin membantu kedua orang tuanya."
        ],
        correct: 0,
        explanation: "Kata 'oleh karena itu' adalah konjungsi kausalitas yang menghubungkan hubungan sebab dan akibat."
    },
    {
        question: "Manakah contoh kalimat FAKTA dalam teks eksposisi?",
        options: [
            "Pemandangan gunung di pagi hari sangat indah dan menakjubkan.",
            "Berdasarkan data BPS tahun 2023, produksi padi nasional mencapai 53,98 juta ton.",
            "Menurut perkiraan saya, es krim cokelat adalah makanan paling lezat.",
            "Sebaiknya pemerintah segera membangun fasilitas olahraga baru."
        ],
        correct: 1,
        explanation: "Kalimat tersebut memuat data resmi yang dapat dibuktikan kebenarannya secara empiris."
    },
    {
        question: "Kata kerja yang menunjukkan persepsi, afeksi, atau kognisi manusia (seperti 'memperkirakan', 'menduga', 'berpendapat') disebut...",
        options: [
            "Verba Material",
            "Verba Mental",
            "Verba Transitif",
            "Verba Pasif"
        ],
        correct: 1,
        explanation: "Verba mental mengungkapkan respons atau proses pemikiran/perasaan seseorang terhadap suatu hal."
    },
    {
        question: "Di bawah ini yang BUKAN merupakan ciri-ciri umum Teks Eksposisi adalah...",
        options: [
            "Menyampaikan fakta secara objektif",
            "Memiliki alur cerita fiktif, latar tempat, dan tokoh rekaan",
            "Menggunakan bahasa yang baku, tegas, dan lugas",
            "Bertujuan menambah wawasan dan ilmu pengetahuan"
        ],
        correct: 1,
        explanation: "Memiliki alur fiktif dan tokoh rekaan merupakan ciri Teks Narasi / Cerpen, bukan Teks Eksposisi."
    },
    {
        question: "Kalimat rekomendasi pada bagian penegasan ulang teks eksposisi sering menggunakan kata persuasif seperti...",
        options: [
            "Hendaknya, harus, sebaiknya, perlu",
            "Kemarin, besok, lusa, minggu depan",
            "Satu, dua, tiga, banyak",
            "Merah, kuning, hijau, biru"
        ],
        correct: 0,
        explanation: "Kata 'sebaiknya', 'hendaknya', dan 'harus' adalah contoh kata persuasif yang memberikan imbauan/rekomendasi."
    }
];

// State Game
let currentQuestionIndex = 0;
let score = 0;
let lives = 3;
let combo = 1;
let maxCombo = 1;
let correctAnswersCount = 0;
let soundEnabled = true;

// Audio Synthesizer (Web Audio API)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (!soundEnabled || !audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        if (type === 'correct') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === 'wrong') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(130, now + 0.2);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === 'powerup') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.25);
        }
    } catch (e) {
        console.log("Audio play suppressed:", e);
    }
}

// Elemen DOM
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const endScreen = document.getElementById('endScreen');

const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const reviewBtn = document.getElementById('reviewBtn');

const scoreDisplay = document.getElementById('scoreDisplay');
const comboDisplay = document.getElementById('comboDisplay');
const livesDisplay = document.getElementById('livesDisplay');

const questionProgress = document.getElementById('questionProgress');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');

const p5050Btn = document.getElementById('p5050');

const finalScoreDisplay = document.getElementById('finalScore');
const highScoreText = document.getElementById('highScoreText');
const correctCountDisplay = document.getElementById('correctCount');
const maxComboCountDisplay = document.getElementById('maxComboCount');
const reviewContainer = document.getElementById('reviewContainer');
const reviewList = document.getElementById('reviewList');

// Event Listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
reviewBtn.addEventListener('click', () => {
    reviewContainer.classList.toggle('hidden');
});

p5050Btn.addEventListener('click', use5050Powerup);

// Jalankan Game
function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    lives = 3;
    combo = 1;
    maxCombo = 1;
    correctAnswersCount = 0;

    scoreDisplay.textContent = '0';
    comboDisplay.textContent = 'x1';
    p5050Btn.disabled = false;
    reviewContainer.classList.add('hidden');

    updateLivesUI();
    showScreen(quizScreen);
    loadQuestion();
}

function showScreen(screen) {
    [startScreen, quizScreen, endScreen].forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

function updateLivesUI() {
    livesDisplay.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.textContent = i < lives ? '❤️' : '🖤';
        livesDisplay.appendChild(heart);
    }
}

function loadQuestion() {
    const q = questionsData[currentQuestionIndex];
    
    questionProgress.textContent = `Soal ${currentQuestionIndex + 1}/${questionsData.length}`;
    questionText.textContent = q.question;

    optionsContainer.innerHTML = '';
    q.options.forEach((optText, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span style="font-weight:700; margin-right:10px; color:#38bdf8;">${String.fromCharCode(65 + index)}.</span> ${optText}`;
        btn.addEventListener('click', () => handleAnswer(index));
        optionsContainer.appendChild(btn);
    });
}

function handleAnswer(selectedIndex) {
    const q = questionsData[currentQuestionIndex];
    const optionBtns = optionsContainer.children;

    // Nonaktifkan semua opsi saat memilih
    Array.from(optionBtns).forEach(btn => btn.classList.add('disabled'));

    if (selectedIndex === q.correct) {
        // Jawaban Benar
        playSound('correct');
        optionBtns[selectedIndex].classList.add('correct');

        const baseScore = 100;
        const earned = Math.round(baseScore * combo);
        score += earned;
        scoreDisplay.textContent = score;

        correctAnswersCount++;
        combo++;
        if (combo > maxCombo) maxCombo = combo;
        comboDisplay.textContent = `x${combo}`;
    } else {
        // Jawaban Salah
        playSound('wrong');
        optionBtns[selectedIndex].classList.add('wrong');
        optionBtns[q.correct].classList.add('correct');
        
        quizScreen.classList.add('shake');
        setTimeout(() => quizScreen.classList.remove('shake'), 400);

        combo = 1;
        comboDisplay.textContent = 'x1';
        lives--;
        updateLivesUI();
    }

    setTimeout(() => {
        if (lives <= 0 || currentQuestionIndex >= questionsData.length - 1) {
            endGame();
        } else {
            currentQuestionIndex++;
            loadQuestion();
        }
    }, 1400);
}

// Power-Up 50:50
function use5050Powerup() {
    if (p5050Btn.disabled) return;
    playSound('powerup');
    p5050Btn.disabled = true;

    const q = questionsData[currentQuestionIndex];
    const wrongIndexes = [];
    q.options.forEach((_, idx) => {
        if (idx !== q.correct) wrongIndexes.push(idx);
    });

    wrongIndexes.sort(() => Math.random() - 0.5);
    const toHide = wrongIndexes.slice(0, 2);

    const optionBtns = optionsContainer.children;
    toHide.forEach(idx => {
        optionBtns[idx].classList.add('hidden-option');
    });
}

// Akhir Permainan
function endGame() {
    showScreen(endScreen);

    const savedHighScore = localStorage.getItem('teks_eksposisi_highscore') || 0;
    let newHighScore = savedHighScore;
    if (score > savedHighScore) {
        newHighScore = score;
        localStorage.setItem('teks_eksposisi_highscore', score);
    }

    finalScoreDisplay.textContent = score;
    highScoreText.textContent = `Skor Tertinggi: ${newHighScore}`;
    correctCountDisplay.textContent = `${correctAnswersCount}/${questionsData.length}`;
    maxComboCountDisplay.textContent = `x${maxCombo}`;

    reviewList.innerHTML = '';
    questionsData.forEach((q, idx) => {
        const item = document.createElement('div');
        item.className = 'review-item';
        item.innerHTML = `
            <div class="review-q">${idx + 1}. ${q.question}</div>
            <div class="review-a">Jawaban Benar: ${q.options[q.correct]}</div>
            <div class="review-exp">💡 ${q.explanation}</div>
        `;
        reviewList.appendChild(item);
    });
}

// --- ANIMASI BACKGROUND CANVAS (KONSTELEASI PARTIKEL & KATA KUNCI) ---
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;
function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const keywords = ["TESIS", "ARGUMEN", "PENEGASAN ULANG", "FAKTA", "OPINI", "KONJUNGSI", "VERBA MENTAL", "KATA TEKNIS", "PERSUASIF"];
const particles = [];
const particleCount = 45;

class Particle {
    constructor() {
        this.reset(true);
    }

    reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 20;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = -(Math.random() * 0.5 + 0.3);
        this.size = Math.random() * 3 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.text = Math.random() < 0.35 ? keywords[Math.floor(Math.random() * keywords.length)] : null;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.y < -30 || this.x < -30 || this.x > width + 30) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        if (this.text) {
            ctx.font = '11px Poppins, sans-serif';
            ctx.fillStyle = `rgba(168, 85, 247, ${this.alpha * 0.8})`;
            ctx.fillText(this.text, this.x + 8, this.y + 4);
        }
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateBackground() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
                ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 110)})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateBackground);
}

animateBackground();