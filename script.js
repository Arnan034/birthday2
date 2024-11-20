const targetDate = new Date('2024-11-20T20:10:00'); // Sesuaikan dengan tanggal yang diinginkan
const music = document.getElementById('birthdayMusic');

function playMusic() {
    // Set atribut untuk memaksa autoplay
    music.setAttribute('autoplay', '');
    music.setAttribute('muted', false);
    
    // Memulai musik dengan volume rendah dan fade in
    music.volume = 0;
    
    // Promise untuk memastikan musik dimulai
    const playPromise = music.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Fade in musik
            let volume = 0;
            const fadeIn = setInterval(() => {
                if (volume < 1) {
                    volume += 0.1;
                    music.volume = volume;
                } else {
                    clearInterval(fadeIn);
                }
            }, 200);
        }).catch(error => {
            console.log("Autoplay was prevented");
        });
    }
}

function updateCountdown() {
    const currentDate = new Date();
    const difference = targetDate - currentDate;

    if (difference <= 0) {
        // Waktu ulang tahun telah tiba!
        document.getElementById('countdown').style.display = 'none';
        document.querySelector('.container-text').classList.add('show-birthday');
        document.body.classList.remove('container');
        
        // Mainkan musik ketika animasi dimulai
        playMusic();
        return;
    }

    // Hitung waktu tersisa
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update tampilan countdown
    document.querySelector('.days').textContent = days.toString().padStart(2, '0');
    document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
    document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
    document.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    const countdown = document.getElementById('countdown');
    countdown.classList.add('active');
    
    // Cek apakah sudah waktunya untuk menampilkan animasi ulang tahun
    if (new Date() < targetDate) {
        document.body.classList.add('container');
    } else {
        document.querySelector('.container-text').classList.add('show-birthday');
        playMusic(); // Mainkan musik jika langsung menampilkan animasi
    }
    
    // Update countdown setiap detik
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Panggil pertama kali
});
