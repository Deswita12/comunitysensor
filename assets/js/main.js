// --- STATE MANAGEMENT ---
let currentStep = 1;
let currentPackage = 'basic';
const totalSteps = 6;

const stepTitles = [
    "Langkah 1: Persiapan Alat",
    "Langkah 2: Persiapan Software",
    "Langkah 3: Pemasangan Kabel (Wiring)",
    "Langkah 4: Uji Coba Perangkat",
    "Langkah 5: Pendaftaran Akun SmartCitizen",
    "Langkah 6: Tahap Akhir: Deploy Sensor!"
];

const stepTips = [
    "Selalu simpan kabel cadangan di dekatmu, siapa tahu yang satu macet!",
    "Kalau download lambat, coba ganti koneksi WiFi ke hotspot HP atau tunggu beberapa detik untuk compile pertama kali ya.",
    "Warna kabel tidak wajib sama, yang penting tujuannya benar! Jangan sampai pin SCL dan SDA tertukar.",
    "Jangan panik kalau sensor tidak terbaca atau Serial Monitor kosong, coba ganti kabel data USB-C atau tekan tombol RESET di XIAO.",
    "Token itu rahasia, jangan dibagikan ke sembarang orang di grup chat atau repositori publik GitHub Anda!",
    "Kamu sudah di garis finish! Tinggal pasang di balkon atau luar jendela untuk berkontribusi langsung pada udara Tangerang."
];

// --- CORE: GOTO STEP ---
function goToStep(targetStep) {
    if (targetStep < 1 || targetStep > totalSteps) return;

    const currentElement = document.getElementById(`step-${currentStep}`);
    if (currentElement) {
        currentElement.classList.add('hidden');
        currentElement.classList.remove('block', 'active');
    }

    currentStep = targetStep;

    const nextElement = document.getElementById(`step-${currentStep}`);
    if (nextElement) {
        nextElement.classList.remove('hidden');
        nextElement.classList.add('block', 'active');
    }

    applyPackageFilter(currentPackage);
    updateUI();
    updateWizardUI();
    updateStepIndicators();

    const wizardSection = document.getElementById('wizard-section');
    if (wizardSection) {
        window.scrollTo({ top: wizardSection.offsetTop - 100, behavior: 'smooth' });
    }
}

function changeStep(direction) {
    goToStep(currentStep + direction);
}

// --- UPDATE STEP INDICATORS ---
function updateStepIndicators() {
    for (let i = 1; i <= totalSteps; i++) {
        const ind = document.getElementById(`ind-${i}`);
        if (!ind) continue;

        if (i === currentStep) {
            ind.className = "step-ind flex-1 h-2 rounded-full transition-all bg-primary hover:opacity-80 cursor-pointer";
        } else if (i < currentStep) {
            ind.className = "step-ind flex-1 h-2 rounded-full transition-all bg-primary/40 hover:opacity-80 cursor-pointer";
        } else {
            ind.className = "step-ind flex-1 h-2 rounded-full transition-all bg-surface-container hover:bg-outline-variant cursor-pointer";
        }
    }
}

// --- UPDATE UI ---
function updateUI() {
    const stepTitle = document.getElementById('step-title');
    if (stepTitle) stepTitle.innerText = stepTitles[currentStep - 1];

    const stepCounter = document.getElementById('step-counter');
    if (stepCounter) stepCounter.innerText = `${currentStep} dari ${totalSteps}`;

    const dynamicTip = document.getElementById('dynamic-tip');
    if (dynamicTip) dynamicTip.innerText = stepTips[currentStep - 1];

    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
        prevBtn.disabled = (currentStep === 1);
        prevBtn.style.opacity = (currentStep === 1) ? "0.3" : "1";
        prevBtn.style.cursor = (currentStep === 1) ? "not-allowed" : "pointer";
    }

    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');
    if (nextBtn && finishBtn) {
        if (currentStep === totalSteps) {
            nextBtn.classList.add('hidden');
            finishBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            finishBtn.classList.add('hidden');
        }
    }
}

function updateWizardUI() {
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
        if (currentStep === 1) {
            prevBtn.setAttribute('disabled', 'true');
            prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            prevBtn.removeAttribute('disabled');
            prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
}

// --- PACKAGE FILTER ---
function applyPackageFilter(pkg) {
    const plusItem  = document.getElementById('plus-item');
    const btnBasic  = document.getElementById('btn-basic');
    const btnPlus   = document.getElementById('btn-plus');
    const plusRows  = document.querySelectorAll('.plus-wiring-row');
    const txtPackage = document.getElementById('active-package-text');
    const diagBasic = document.getElementById('diagram-basic');
    const diagPlus  = document.getElementById('diagram-plus');
    const videoBasic = document.getElementById('video-basic');
    const videoPlus  = document.getElementById('video-plus');

    const isPlus = pkg === 'plus';

    if (plusItem) {
        plusItem.classList.toggle('opacity-40', !isPlus);
        plusItem.classList.toggle('grayscale', !isPlus);
    }

    if (btnBasic && btnPlus) {
        const activeClass   = "px-4 sm:px-6 py-2 rounded-md font-label-caps text-xs sm:text-sm bg-primary text-on-primary transition-all";
        const inactiveClass = "px-4 sm:px-6 py-2 rounded-md font-label-caps text-xs sm:text-sm text-on-surface-variant hover:bg-surface-variant transition-all";
        btnBasic.className = isPlus ? inactiveClass : activeClass;
        btnPlus.className  = isPlus ? activeClass : inactiveClass;
    }

    if (videoBasic) videoBasic.classList.toggle('hidden', isPlus);
    if (videoPlus)  videoPlus.classList.toggle('hidden', !isPlus);

    if (txtPackage) txtPackage.innerText = isPlus ? "Paket Plus (+ Layar OLED)" : "Paket Basic";
    if (diagBasic)  diagBasic.classList.toggle('hidden', isPlus);
    if (diagPlus)   diagPlus.classList.toggle('hidden', !isPlus);
    plusRows.forEach(row => row.classList.toggle('hidden', !isPlus));
}

function togglePackage(pkg) {
    currentPackage = pkg;
    applyPackageFilter(pkg);
}

// --- UTILITY ---
function scrollToWizard() {
    const wizardSection = document.getElementById('wizard-section');
    if (wizardSection) wizardSection.scrollIntoView({ behavior: 'smooth' });
}

async function copyText(text, btn) {
    if (!btn) return;
    await navigator.clipboard.writeText(text);
    const originalContent = btn.innerHTML;
    btn.innerHTML = `<span class="material-symbols-outlined text-sm">check</span>`;
    setTimeout(() => { btn.innerHTML = originalContent; }, 2000);
}

async function copyCode(id, btn) {
    const element = document.getElementById(id);
    if (!element || !btn) return;
    await navigator.clipboard.writeText(element.innerText);
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="material-symbols-outlined text-sm">check</span> Berhasil!`;
    setTimeout(() => { btn.innerHTML = originalText; }, 2000);
}

function finishWizard() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) successMessage.classList.remove('hidden');

    const celebrationHeader = document.getElementById('celebration-header');
    if (celebrationHeader) {
        celebrationHeader.classList.add('hidden');
        celebrationHeader.scrollIntoView({ behavior: 'smooth' });
    }

    const finishBtn = document.getElementById('finish-btn');
    if (finishBtn) {
        finishBtn.innerText = "Sudah Terpasang! ✨";
        finishBtn.disabled = true;
    }

    alert("Hore! Selamat sudah berkontribusi untuk Tangerang yang lebih bersih!");
}

// ===================== SETTINGS PANEL =====================
function openSettings() {
    document.getElementById('settings-panel').classList.remove('translate-x-full');
    document.getElementById('settings-overlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function closeSettings() {
    document.getElementById('settings-panel').classList.add('translate-x-full');
    document.getElementById('settings-overlay').classList.add('hidden');
    document.body.style.overflow = '';
}

// ===================== THEME =====================
function setTheme(mode) {
    const root     = document.documentElement;
    const lightBtn = document.getElementById('theme-light-btn');
    const darkBtn  = document.getElementById('theme-dark-btn');

    if (mode === 'dark') {
        root.classList.remove('light');
        root.classList.add('dark');
        localStorage.setItem('sk-theme', 'dark');

        darkBtn.classList.add('border-primary', 'bg-primary-container/20');
        darkBtn.classList.remove('border-outline-variant');
        darkBtn.querySelector('.material-symbols-outlined').style.color = 'var(--tw-color-primary, #416744)';
        darkBtn.querySelector('span:last-child').style.color = 'var(--tw-color-primary, #416744)';

        lightBtn.classList.remove('border-primary', 'bg-primary-container/20');
        lightBtn.classList.add('border-outline-variant');
        lightBtn.querySelector('.material-symbols-outlined').style.color = '';
        lightBtn.querySelector('span:last-child').style.color = '';
    } else {
        root.classList.remove('dark');
        root.classList.add('light');
        localStorage.setItem('sk-theme', 'light');

        lightBtn.classList.add('border-primary', 'bg-primary-container/20');
        lightBtn.classList.remove('border-outline-variant');
        lightBtn.querySelector('.material-symbols-outlined').style.color = 'var(--tw-color-primary, #416744)';
        lightBtn.querySelector('span:last-child').style.color = 'var(--tw-color-primary, #416744)';

        darkBtn.classList.remove('border-primary', 'bg-primary-container/20');
        darkBtn.classList.add('border-outline-variant');
        darkBtn.querySelector('.material-symbols-outlined').style.color = '';
        darkBtn.querySelector('span:last-child').style.color = '';
    }
}

(function () {
    if (localStorage.getItem('sk-theme') === 'dark') {
        document.addEventListener('DOMContentLoaded', () => setTheme('dark'));
    }
})();

// ===================== HELP MODAL =====================
function openHelpModal() {
    const modal = document.getElementById('help-modal-overlay');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeHelpModal(e) {
    if (e && e.target !== document.getElementById('help-modal-overlay')) return;
    const modal = document.getElementById('help-modal-overlay');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
}

function submitHelpForm() {
    const name    = document.getElementById('help-name').value.trim();
    const email   = document.getElementById('help-email').value.trim();
    const message = document.getElementById('help-message').value.trim();

    if (!name || !email || !message) {
        alert('Mohon lengkapi semua field terlebih dahulu.');
        return;
    }

    const subject = encodeURIComponent(`[SensorKita] Pertanyaan dari ${name}`);
    const body    = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPertanyaan:\n${message}`);
    window.open(`mailto:developer@sensorkita.id?subject=${subject}&body=${body}`, '_blank');

    document.getElementById('help-form-state').classList.add('hidden');
    document.getElementById('help-success-state').classList.remove('hidden');
}

function resetHelpForm() {
    document.getElementById('help-name').value    = '';
    document.getElementById('help-email').value   = '';
    document.getElementById('help-message').value = '';
    document.getElementById('help-form-state').classList.remove('hidden');
    document.getElementById('help-success-state').classList.add('hidden');
    const modal = document.getElementById('help-modal-overlay');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
}

// ===================== FAQ ACCORDION =====================
function toggleFaq(btn) {
    const body   = btn.nextElementSibling;
    const icon   = btn.querySelector('.material-symbols-outlined');
    const isOpen = !body.classList.contains('hidden');

    document.querySelectorAll('.faq-body').forEach(b => b.classList.add('hidden'));
    document.querySelectorAll('.faq-item button .material-symbols-outlined')
            .forEach(i => i.style.transform = 'rotate(0deg)');

    if (!isOpen) {
        body.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    }
}

// ===================== SWITCH SUB TAB =====================
function switchSubTab(tab) {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'data.html') {
        const dashboardWrap = document.getElementById('tab-dashboard');
        const infoWrap      = document.getElementById('tab-info');
        if (!dashboardWrap || !infoWrap) return;

        if (tab === 'info') {
            dashboardWrap.classList.replace('block', 'hidden');
            infoWrap.classList.replace('hidden', 'block');
        } else {
            dashboardWrap.classList.replace('hidden', 'block');
            infoWrap.classList.replace('block', 'hidden');
        }
    } else {
        window.location.href = 'data.html?tab=' + tab;
    }
}

// ===================== DOM READY (SATU BLOK SAJA) =====================
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu ---
    const menuBtn    = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon   = document.getElementById('menu-icon');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('flex');
            mobileMenu.classList.toggle('hidden', isOpen);
            mobileMenu.classList.toggle('flex', !isOpen);
            if (menuIcon) menuIcon.textContent = isOpen ? 'menu' : 'close';
        });
    }

    // --- Dropdown Desktop ---
    const desktopDataBtn  = document.getElementById('desktop-data-btn');
    const desktopDropdown = document.getElementById('desktop-dropdown');
    const dataArrow       = document.getElementById('data-arrow');

    if (desktopDataBtn && desktopDropdown) {
        desktopDataBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !desktopDropdown.classList.contains('hidden');
            desktopDropdown.classList.toggle('hidden', isOpen);
            if (dataArrow) dataArrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        });

        document.addEventListener('click', () => {
            desktopDropdown.classList.add('hidden');
            if (dataArrow) dataArrow.style.transform = 'rotate(0deg)';
        });
    }

    // --- Dropdown Mobile ---
    const mobileDataBtn = document.getElementById('mobile-data-btn');
    const mobileDataSub = document.getElementById('mobile-data-sub');
    const mobileArrow   = document.getElementById('mobile-data-arrow');

    if (mobileDataBtn && mobileDataSub) {
        mobileDataBtn.addEventListener('click', () => {
            const isOpen = !mobileDataSub.classList.contains('hidden');
            mobileDataSub.classList.toggle('hidden', isOpen);
            if (mobileArrow) mobileArrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    }

});

function playHeroVideo() {
    const video   = document.getElementById('hero-video');
    const overlay = document.getElementById('video-overlay');
    overlay.classList.add('hidden');
    video.controls = true;
    video.play();
}