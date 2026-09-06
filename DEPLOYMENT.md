# 🚀 Guide de Déploiement : ShykAuto (Netlify + Supabase)

Ce document contient les instructions étape par étape pour déployer le projet **ShykAuto** avec une base de données PostgreSQL sur **Supabase** et un hébergement serverless Next.js sur **Netlify**.

---

## 1. Configuration des Connexions Supabase (Compatible IPv4 & IPv6)

Le nom de domaine direct Supabase (`db.[REF].supabase.co`) n'utilise que des adresses **IPv6**. Sur de nombreux réseaux Internet/box locaux (IPv4 uniquement), la connexion directe peut échouer avec l'erreur `P1001: Can't reach database server`.

Pour garantir une compatibilité totale à 100% sur tous les réseaux locaux et serverless, nous utilisons le **Supabase Connection Pooler** (`aws-1-eu-west-1.pooler.supabase.com`) qui prend en charge l'IPv4 :

- **`DATABASE_URL` (Port 6543 - Transaction Mode)** : Utilisé par l'application en production / Netlify Serverless Functions.
  ```env
  DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:6543/postgres"
  ```
- **`DIRECT_URL` (Port 5432 - Session Mode)** : Utilisé par Prisma pour créer les tables (`db push`) et les migrations.
  ```env
  DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"
  ```

---

## 2. Initialisation Réussie du Schéma et des Données (Déjà Effectué ✅)

Les tables et données de démonstration ont déjà été synchronisées et injectées avec succès dans votre base Supabase :

```bash
# 1. Synchroniser le schéma Prisma avec Supabase
npx prisma db push

# 2. Injecter les données de démarrage (Services, Produits, Réalisations & Compte Admin)
npx tsx prisma/seed.ts
```

> **Identifiants du compte Administrateur crée :**
> - **Email** : `admin@shykauto.com`
> - **Mot de passe** : `Admin@123456`

---

## 3. Déploiement sur Netlify

1. Poussez votre code sur **GitHub / GitLab / Bitbucket**.
2. Allez sur [Netlify.com](https://netlify.com) et cliquez sur **Add new site** > **Import an existing project**.
3. Sélectionnez le dépôt `shyk-auto`.
4. Netlify détecte automatiquement le fichier `netlify.toml` inclus à la racine du projet.
5. Dans **Site Configuration** > **Environment variables**, ajoutez les variables suivantes :
   - `DATABASE_URL` = `postgresql://postgres.qpnfddacnycscjzqdfxd:Supa%40degla1919@aws-1-eu-west-1.pooler.supabase.com:6543/postgres`
   - `DIRECT_URL` = `postgresql://postgres.qpnfddacnycscjzqdfxd:Supa%40degla1919@aws-1-eu-west-1.pooler.supabase.com:5432/postgres`
   - `JWT_SECRET` = `shykauto_super_secret_jwt_key_2026_secure`
   - `NODE_ENV` = `production`
6. Cliquez sur **Deploy site**.

---

## 4. Vérification Post-Déploiement

- Ouvrez l'URL finale fournie par Netlify.
- Rendez-vous sur `/admin` et connectez-vous avec `admin@shykauto.com` / `Admin@123456`.
- Les produits, services, réalisations et messages sont directement lus et écrits dans votre base **Supabase en cloud** !
