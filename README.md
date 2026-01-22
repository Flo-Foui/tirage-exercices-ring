# Tirage au sort des exercices (React)

Vite + React + TypeScript, déploiement GitHub Pages via GitHub Actions.

## Retours intégrés
- Suppression totale de toute mention de **"appâts au sol"** (n'apparaît nulle part).
- La notion d'**intercalation est portée dans les règles** via un **pattern alterné** :
  - Obéissance : `obeissanceDressage` ↔ `obeissanceObjet` (A, B, A, B, ...)
  - Mordant : `mordantInterceptions` ↔ `mordantDressages` (A, B, A, B, ...)
- Renommages effectués :
  - `apresObstaclesBase` → `obeissanceDressage`
  - `apresObstaclesIntercalables` → `obeissanceObjet`
  - `mordantInterceptions` → (inchangé)
  - `mordantIntercalables` → `mordantDressages`

## Dev
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## GitHub Pages
Settings → Pages → Source: GitHub Actions
