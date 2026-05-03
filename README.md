# Azashoots.fr

Portfolio cinématique — Idrolle Enrique, photographe & vidéaste performance.

## Démarrage

Aucun build. Ouvrir `index.html` dans Chrome/Firefox :

```
E:\Site Internet\Azashoots.fr\index.html
```

## Structure des fichiers

```
Azashoots.fr/
├── index.html                        ← page d'accueil
├── css/
│   ├── style.css                     ← styles principaux
│   └── project.css                   ← styles pages projet
├── js/
│   └── main.js                       ← smooth scroll + animations
├── projects/
│   ├── athlete-fabio.html            ← Athlète 1
│   ├── athlete-gregoire.html         ← Athlète 2 (Fitness Park Valenciennes)
│   ├── athlete-julia.html            ← Athlète 3
│   ├── evenement-croosfit.html       ← Événement CrossFit
│   ├── evenement-fyb.html            ← Événement FYB
│   ├── evenement-kettlebell.html     ← Événement Kettlebell
│   ├── evenement-usagym.html         ← Événement USA Gym
│   ├── automobile-particulier.html   ← Shoot auto particulier
│   └── automobile-usagym.html        ← Shoot auto USA Gym
├── assets/
│   ├── Athlete/
│   │   ├── Fabio/                    ← cover.jpg, 01.jpg → 20.jpg
│   │   ├── Gregoire/                 ← cover.jpg, 01.jpg → 20.jpg, video.mp4
│   │   └── Julia/                    ← cover.jpg, 01.jpg → 20.jpg
│   ├── Evenement/
│   │   ├── CroosFit/                 ← cover.jpg, 01.jpg → 20.jpg
│   │   ├── FYB/                      ← cover.jpg, 01.jpg → 20.jpg
│   │   ├── Kettlebell/               ← cover.jpg, 01.jpg → 20.jpg
│   │   └── USAGYM/                   ← cover.jpg, 01.jpg → 20.jpg
│   ├── Automobile/
│   │   ├── Particulier/              ← cover.jpg, 01.jpg → 20.jpg
│   │   └── USAGYM/                   ← cover.jpg, 01.jpg → 20.jpg
│   └── about/
│       └── portrait.jpg              ← portrait "Derrière l'objectif"
└── README.md
```

## Convention des assets

**Pour chaque projet (package)** :

- `cover.jpg` → image de couverture affichée dans la vignette du portfolio ET dans le hero de la page projet
- `01.jpg`, `02.jpg`, ..., `20.jpg` → photos de la galerie (ordre d'affichage)
- `video.mp4` (optionnel, uniquement Grégoire pour l'instant)

**Important** :

- Les noms de fichiers sont **sensibles à la casse** sur les serveurs Linux (Vercel, Netlify). Respecte strictement `cover.jpg` en minuscules, `01.jpg`, etc.
- Pas besoin d'avoir les 20 photos. Les `<figure>` dont l'image est absente sont masqués automatiquement via `onerror`.
- La vignette portfolio affiche "— À VENIR —" tant que `cover.jpg` est absent.
- La galerie gère automatiquement les formats mixtes (portrait / paysage / carré) via masonry CSS colonnes.

## Ajouter un nouveau projet

### 1. Créer le dossier assets

Dépose les photos dans le bon chemin :

```
assets/Athlete/NouveauNom/cover.jpg
assets/Athlete/NouveauNom/01.jpg
assets/Athlete/NouveauNom/02.jpg
...
```

### 2. Dupliquer une page projet

Copie `projects/athlete-fabio.html` → `projects/athlete-nouveaunom.html`.
Fais un **Remplacer tout** : `Fabio` → `NouveauNom`, et `assets/Athlete/Fabio/` → `assets/Athlete/NouveauNom/`.

### 3. Ajouter la vignette dans `index.html`

Dans la section concernée (Athlètes / Événements / Automobile), duplique un bloc `<a class="tile">` et adapte `href`, `img src` et les textes.

## Sections du site (ordre actuel)

1. **Hero** — IDROLLE ENRIQUE / Photographe et vidéaste
2. **Athlètes** — 3 vignettes cliquables
3. **Événements** — 4 vignettes cliquables
4. **Automobile** — 2 vignettes (format large)
5. **Derrière l'objectif** — portrait + bio
6. **Services** — 3 blocs
7. **Contact** — formulaire mailto:

## Optimiser les photos avant upload

Tes RAW originaux sont probablement énormes (5-15 Mo). Le web a besoin de versions optimisées :

- **Taille** : max 2400 px de large
- **Format** : JPG qualité 82-85 ou WebP
- **Poids** : < 300 Ko par image

Outils gratuits :

- https://squoosh.app (drag & drop, recommandé)
- https://tinypng.com

## Couleurs & typos

Tout dans `css/style.css`, section `:root` :

```css
--bg: #0a0a0a;
--white: #ffffff;
--text: #d1d1d1;
```

Polices Google Fonts (Bebas Neue + Inter) chargées via `<link>` dans `<head>`.

## Formulaire de contact (Formspree)

Le formulaire envoie les messages à `enriqueidrlpro@gmail.com` via **Formspree** (envoi AJAX, 100% client-side, **pas de backend**).

L'endpoint est déjà configuré dans `js/config.js` et committé dans le repo : **le formulaire fonctionne out-of-the-box**, rien à faire pour qu'il marche en local ou en prod.

### Tester en local

1. Ouvrir `index.html` dans le navigateur
2. Remplir le formulaire avec un email valide et envoyer
3. L'email arrive sur `enriqueidrlpro@gmail.com` dans la minute (vérifier les spams la 1ère fois)
4. Sur le site, le toast violet **"Message bien reçu"** apparaît en bas

### Changer d'endpoint (optionnel)

Si tu veux migrer le form vers un autre compte Formspree (ou tout autre service compatible POST JSON) :

1. Crée un nouveau form sur https://formspree.io et configure-le pour `enriqueidrlpro@gmail.com`
2. Copie le nouvel endpoint (format `https://formspree.io/f/xxxxxxxx`)
3. Édite `js/config.js`, remplace la valeur de `formspreeEndpoint`
4. Commit + push

### Sécurité & anti-spam

- **Honeypot** `_gotcha` (champ caché) : les bots qui remplissent tout sont bloqués silencieusement côté Formspree
- **Validation HTML5** côté client (email, champs requis)
- **Rate limit** : bouton désactivé 30s après un envoi réussi
- Pour activer reCAPTCHA en plus : Formspree Dashboard → Settings → reCAPTCHA

### Limites du plan gratuit Formspree

- 50 envois/mois sur le plan gratuit
- Si tu dépasses régulièrement : upgrade payant Formspree, ou migration vers EmailJS (200/mois gratuit) — me faire signe pour adapter le code

### Si l'endpoint devient invalide / le form ne marche plus

- Au submit : toast rouge avec un message d'erreur + le `mailto:enriqueidrlpro@gmail.com` cliquable comme fallback
- Le bloc `.contact__direct` (mail + téléphone + Insta) reste TOUJOURS visible en dessous comme fallback permanent

## Déployer

### Option 1 — Vercel (recommandé)

1. Compte https://vercel.com (login Google)
2. Drag-drop le dossier `Azashoots.fr` sur le dashboard
3. Connecter le domaine `azashoots.fr` (OVH → Vercel via DNS)

### Option 2 — Netlify

Pareil. Drag-drop sur https://app.netlify.com/drop

### Option 3 — OVH hébergement

FTP → upload tout dans `/www/` ou `/public_html/`.

## Notes techniques

- **Smooth scroll** : Lenis via CDN
- **Animations scroll** : GSAP + ScrollTrigger via CDN
- **Accessibilité** : `prefers-reduced-motion` respecté
- **Images** : `loading="lazy"` partout, `onerror` pour masquer les manquantes
- **Pas de filtres N&B** : photos originales en couleur
- **Responsive** : 3 colonnes → 2 → 1 selon viewport

## Contact dev

Pour ajouter :

- Backend form (Formspree / Resend)
- Page blog / actualités
- Google Analytics / Plausible
- Optimisation batch des images
- Déploiement

→ Demande à Claude.
