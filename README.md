# 🕋 Africa Voyage SARL – Application Web Officielle (Hajj & Omra)

Bienvenue sur le dépôt de l'application web officielle de l'agence **Africa Voyage SARL**, spécialisée dans l'organisation de pèlerinages de prestige pour le **Hajj 2026** et la **Omra** au départ de l'Afrique de l'Ouest (Dakar, Abidjan, Bamako, Conakry).

![Design System Spiritual Luxury](https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Fonctionnalités Principales

### 📱 1. Navigation & Expérience Utilisateur
* **Menu Hamburger Latéral (Slide-In Drawer)** : Accès rapide et fluide à toutes les sections et pages.
* **Convertisseur Multidevise en Temps Réel** : Conversion instantanée des tarifs en **FCFA (XOF)**, **Euros (€)** et **Dollars ($)**.
* **Widget des Horaires de Prière** : Calcul dynamique de la prochaine prière à La Mecque.
* **Assistance WhatsApp 24/7** : Bouton d'action flottant et intégration de messages pré-remplis pour chaque forfait.

### 🧳 2. Catalogue des Forfaits & Comparatif ([`offres.html`](offres.html))
* **Hajj 2026 – Forfait Royal Prestige VIP 5★** (Fairmont Clock Tower à 0m Kaaba, Oberoi Madinah, Tentes privées climatisées Mina/Arafat, TGV Haramain 1ère classe, médecin dédié).
* **Omra Ramadan 2026 – Laylat Al-Qadr (15 Jours)** (Pullman Zamzam & Dar Al Taqwa).
* **Hajj 2026 – Confort & Sérénité Famille** (Swissôtel Al Maqam & Mövenpick).
* **Omra Mensuelle & Sur-Mesure**.
* **Tableau Comparatif Complet** : Visualisation claire des prestations incluses (hôtels, distances, repas, transport, tarifs).

### 📖 3. Guide Pratique & Rites du Pèlerin ([`guide.html`](guide.html))
* **Parcours Pas à Pas des Rites** : *Ihram, Tawaf autour de la Kaaba, Sa'i, Station à Arafat, Nuitée à Mouzdalifah et Jamarat*.
* **Checklist Interactive de la Valise du Pèlerin** : Liste de vérification interactive pour les documents, vêtements et trousse médicale.
* **Formalités Sanitaires & Visas Nusuk 2026** : Vaccinations requises (méningite ACYW135, fièvre jaune) et gestion des permis officiels.

### ⚖️ 4. Simulateur de Devis Personnalisé ([`index.html`](index.html))
* Calcul en direct du tarif selon la formule, la ville de départ, la typologie de chambre (Single, Double, Triple, Quadruple), et les options VIP.
* Export direct du devis formaté sur WhatsApp en un clic.

---

## 🛠️ Stack Technique

* **Build Tool & Dev Server** : [Vite 5](https://vitejs.dev/)
* **Structure & Sémantique** : HTML5 sémantique multi-pages (`index.html`, `offres.html`, `guide.html`)
* **Styles & Design System** : Vanilla CSS moderne avec variables CSS (*Spiritual Luxury*, Glassmorphism, animations)
* **Logique & Interactivité** : JavaScript (ES Modules, multi-currency engine, responsive drawers, modals)
* **Typographie** : *Playfair Display*, *Plus Jakarta Sans*, *Montserrat*
* **Iconographie** : *FontAwesome 6 Pro/Free CDN*

---

## 🚀 Installation & Lancement Local

### Prérequis
* [Node.js](https://nodejs.org/) (version 18 ou supérieure)
* [Git](https://git-scm.com/)

### 1. Cloner le projet
```bash
git clone https://github.com/votre-compte/africa-voyage-sarl.git
cd africa-voyage-sarl
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:3000`.

### 4. Compiler pour la production
```bash
npm run build
```
Les fichiers optimisés seront générés dans le dossier `dist/`.

---

## 🏛️ Agences Africa Voyage SARL

* **Sénégal (Dakar)** : Immeuble Prestige, Fann Résidence / Corniche Ouest – Tel: `+221 33 824 50 00` / `+221 77 654 32 10`
* **Côte d'Ivoire (Abidjan)** : Boulevard de la République, Le Plateau – Tel: `+225 27 20 30 40`
* **Mali (Bamako)** : ACI 2000, Près du Monument de la Paix – Tel: `+223 20 22 33 44`

---

## 📜 Licence
© 2026 Africa Voyage SARL. Tous droits réservés. Agence Agréée Ministère du Hajj & IATA.
