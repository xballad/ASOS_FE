# ASOS_FE
# Angular Aplikácia na Správu Úloh

Tento projekt je Angular aplikácia na správu úloh, tímov a používateľov, ktorá využíva modulárnu štruktúru pre lepšiu škálovateľnosť a údržbu. Aplikácia sa integruje s FastAPI backendom na spracovanie autentifikácie používateľov, správy úloh a spolupráce v tímoch.

## Obsah
- [Funkcie](#funkcie)
- [Štruktúra projektu](#štruktúra-projektu)
- [Inštalačné pokyny](#inštalačné-pokyny)
- [Vývoj](#vývoj)
- [Moduly a komponenty](#moduly-a-komponenty)

## Funkcie

### Autentifikácia:
- Prihlásenie a registrácia
- Funkcionalita "Zabudnuté heslo"
- Chránené trasy pre prístup k stránkam

### Správa úloh:
- Vytváranie úloh
- Úprava úloh
- Správa stavov úloh (Na vykonanie, V priebehu, Dokončené)
- Vyskakovacie okno pre rýchle akcie s úlohami

### Spolupráca v tímoch:
- Vytváranie a úprava tímov
- Pridávanie členov do tímov prostredníctvom e-mailu

### Dashboard:
- Navigačný panel
- Stránka nastavení pre preferencie používateľa

## Štruktúra projektu

Aplikácia používa modulárnu štruktúru podľa funkcií na organizáciu kódu. Nižšie je prehľad:

```
src/
├── app/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   ├── guard/
│   │   │   ├── service/
│   │   ├── dashboard/
│   │   │   ├── component/
│   │   │   │   ├── create-task/
│   │   │   │   ├── navbar/
│   │   │   │   ├── settings/
│   │   │   │   ├── task-list/
│   │   │   │   ├── task-popup/
│   │   │   │   ├── team/
│   │   │   │   │   ├── create-team/
│   │   │   │   │   ├── edit-team/
│   │   ├── home/
│   │   ├── service/
```

## Inštalačné pokyny

Nasledujte tieto kroky na nastavenie projektu lokálne:

### Predpoklady
- Node.js (verzia 16 alebo novšia)
- Angular CLI (posledná verzia)
- Bežiaci FastAPI backend

### Inštalácia

1. Klonujte repozitár:
   ```bash
   git clone <URL_repozitára>
   cd <názov_priečinka>
   ```

2. Nainštalujte závislosti:
   ```bash
   npm install
   ```

3. Spustite vývojový server:
   ```bash
   ng serve
   ```

4. Pristupujte k aplikácii v prehliadači:
   ```
   http://localhost:4200
   ```

## Vývoj

### Skripty
- Spustiť aplikáciu:
  ```bash
  ng serve
  ```
- Spustiť testy:
  ```bash
  ng test
  ```
- Vytvoriť pre produkciu:
  ```bash
  ng build --prod
  ```

### Konfiguračné súbory
- `environment.ts`: Vývojová konfigurácia
- `environment.prod.ts`: Produkčná konfigurácia

## Moduly a komponenty

### Autentifikácia (auth/)
Rieši prihlasovanie, registráciu a obnovu hesla. Obsahuje aj strážcov (guards) na zabezpečenie prístupu k chráneným trasám.

**Komponenty:**
- login
- register
- forgot-password

**Služby:**
- `auth.service.ts`: Spracovanie autentifikačných HTTP požiadaviek.

### Dashboard (dashboard/)
Hlavný modul pre správu úloh a spoluprácu v tímoch.

**Komponenty:**
- create-task: Formulár na vytváranie úloh
- edit-team: Úprava detailov tímu
- navbar: Navigačný panel
- task-list: Zobrazenie úloh podľa stavu
- task-popup: Vyskakovacie okno pre rýchle akcie s úlohami
- settings: Stránka nastavení používateľa

### Správa tímov (team/)
Modul zameraný na tvorbu a úpravu tímov.

**Komponenty:**
- create-team
- edit-team

### Home (home/)
Úvodná stránka alebo iný predvolený obsah pre prihlásených používateľov.

## Pokyny pre príspevky
1. Forknite repozitár a vytvorte vlastnú vetvu.
2. Uistite sa, že kód prejde všetkými lintermi a jednotkovými testami pred odoslaním pull requestu.
3. Píšte zmysluplné commit správy a zdokumentujte akékoľvek významné zmeny.