/**
 * AFRICA VOYAGES SARL - Moteur Web Épuré & Haute Performance
 * Siège : Samandin secteur 05, en face de la station Total du Mogho Naaba à Ouagadougou
 * Tél : +226 25 31 06 77 | +226 70 24 55 74 | WhatsApp : +226 73 18 74 17
 * Email : africavoyagebf74@gmail.com
 * Agréments : RCCM BF OUA 2018 B 9910 | IFU 00114097X | Licence Catégorie A | Capital 15 000 000 FCFA
 */

import contentData from './data/content.json';

export const APP_DATA = contentData;
export const PACKAGES = APP_DATA.offers;

// Taux de conversion devises
const EXCHANGE_RATES = {
  FCFA: 1,
  EUR: 1 / 655.957,
  USD: 1 / 610.00
};

let currentCurrency = 'FCFA';

document.addEventListener('DOMContentLoaded', () => {
  initCurrencySelector();
  renderOffers();
  initContactForm();
});

/* ==========================================================================
   Convertisseur de Devise
   ========================================================================== */
function initCurrencySelector() {
  const selector = document.getElementById('currencySelector');
  if (!selector) return;

  selector.addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    updateAllPrices();
  });
}

function formatPrice(amountFCFA) {
  const rate = EXCHANGE_RATES[currentCurrency] || 1;
  const converted = Math.round(amountFCFA * rate);
  
  if (currentCurrency === 'FCFA') {
    return `${converted.toLocaleString('fr-FR')} FCFA`;
  } else if (currentCurrency === 'EUR') {
    return `${converted.toLocaleString('fr-FR')} €`;
  } else {
    return `$${converted.toLocaleString('en-US')}`;
  }
}

function updateAllPrices() {
  document.querySelectorAll('.offer-card').forEach(card => {
    const pkgId = card.dataset.id;
    const pkg = PACKAGES.find(p => p.id === pkgId);
    if (pkg) {
      const priceVal = card.querySelector('.offer-price-val');
      if (priceVal) {
        priceVal.textContent = formatPrice(pkg.basePriceFCFA);
      }
    }
  });
}

/* ==========================================================================
   Rendu des 3 Offres Claires
   ========================================================================== */
function renderOffers() {
  const container = document.getElementById('packagesGrid');
  if (!container) return;

  container.innerHTML = PACKAGES.map(pkg => `
    <article class="offer-card ${pkg.id === 'hadj-2027' ? 'featured' : ''}" data-id="${pkg.id}">
      <span class="offer-badge">${pkg.tag}</span>
      
      <div class="offer-img-box">
        <img src="${pkg.image}" alt="${pkg.title}" class="offer-img" loading="lazy">
      </div>

      <div class="offer-body">
        <h3 class="offer-title">${pkg.title}</h3>
        
        <div class="offer-meta">
          <span><i class="fa-regular fa-clock"></i> ${pkg.duration}</span>
          <span><i class="fa-solid fa-plane-departure"></i> Départ : Ouaga</span>
        </div>

        <div class="offer-notice">
          <i class="fa-solid fa-id-card"></i> <strong>Condition :</strong> ${pkg.conditions}
        </div>

        <ul class="offer-features">
          ${pkg.inclusions.slice(0, 4).map(inc => `
            <li class="offer-feature-item">
              <i class="fa-solid fa-circle-check"></i>
              <span>${inc}</span>
            </li>
          `).join('')}
        </ul>

        <div class="offer-footer">
          <div>
            <span class="offer-price-label">${pkg.priceLabel}</span>
            <div class="offer-price-val">${formatPrice(pkg.basePriceFCFA)}</div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline" style="padding: 8px 12px; font-size: 0.82rem;" onclick="openItineraryModal('${pkg.id}')">
              Détails
            </button>
            <button class="btn btn-whatsapp" style="padding: 8px 14px; font-size: 0.82rem;" onclick="bookPackageWhatsApp('${pkg.id}')">
              <i class="fa-brands fa-whatsapp"></i> Réserver
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

/* ==========================================================================
   Modale de Détails & Itinéraire
   ========================================================================== */
function openItineraryModal(pkgId) {
  const pkg = PACKAGES.find(p => p.id === pkgId);
  if (!pkg) return;

  const modal = document.getElementById('itineraryModal');
  const title = document.getElementById('itineraryModalTitle');
  const body = document.getElementById('itineraryModalBody');

  if (!modal || !title || !body) return;

  title.textContent = pkg.title;
  body.innerHTML = `
    <div style="margin-bottom: 20px;">
      <p style="font-size: 0.95rem; color: #334155; margin-bottom: 12px;">
        <strong>Tarif :</strong> ${formatPrice(pkg.basePriceFCFA)} • <strong>Durée :</strong> ${pkg.duration}
      </p>
      <div style="background: rgba(6, 78, 59, 0.08); padding: 10px 14px; border-radius: 6px; border-left: 3px solid var(--primary); font-size: 0.85rem; margin-bottom: 16px;">
        <strong>Pièce requise :</strong> ${pkg.conditions}
      </div>
      <h4 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
        Programme détaillé :
      </h4>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${pkg.itinerary.map(item => `
          <div style="background: #f8fafc; border-left: 3px solid var(--gold); padding: 10px 14px; border-radius: 4px;">
            <strong style="color: var(--primary); font-size: 0.92rem; display: block;">${item.day} : ${item.title}</strong>
            <p style="color: #475569; font-size: 0.85rem; margin-top: 2px;">${item.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
    <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
      <button class="btn btn-outline" onclick="closeModal('itineraryModal')">Fermer</button>
      <button class="btn btn-whatsapp" onclick="bookPackageWhatsApp('${pkg.id}')">
        <i class="fa-brands fa-whatsapp"></i> S'inscrire sur WhatsApp
      </button>
    </div>
  `;

  modal.style.display = 'flex';
  modal.style.opacity = '1';
  modal.style.visibility = 'visible';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
  }
}

function bookPackageWhatsApp(pkgId) {
  const pkg = PACKAGES.find(p => p.id === pkgId);
  const title = pkg ? pkg.title : 'le pèlerinage';
  const price = pkg ? formatPrice(pkg.basePriceFCFA) : '';
  const message = `Salam Aleykoum AFRICA VOYAGES SARL,\n\nJe souhaite m'inscrire pour l'offre "${title}" (${price}).\nJe dispose de ma pièce d'identité (CNIB ou Passeport).\n\nMerci de m'indiquer la marche à suivre pour déposer mon dossier à Samandin (Ouagadougou).`;
  window.open(`https://wa.me/22673187417?text=${encodeURIComponent(message)}`, '_blank');
}

/* ==========================================================================
   Formulaire de Contact
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value || 'Client';
    const phone = document.getElementById('contactPhone')?.value || '';
    const alertBox = document.getElementById('formSuccessAlert');

    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.innerHTML = `
        <strong>Alhamdulillah ! Merci ${name}.</strong> Votre demande a été reçue par notre agence de Ouagadougou. Nous vous répondrons au ${phone}. Vous pouvez aussi nous joindre au <strong>+226 25 31 06 77</strong> ou sur WhatsApp au <strong>+226 73 18 74 17</strong>.
      `;
    }

    form.reset();
  });
}

// Scope global pour boutons HTML
window.openItineraryModal = openItineraryModal;
window.closeModal = closeModal;
window.bookPackageWhatsApp = bookPackageWhatsApp;
