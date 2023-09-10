Danův časovač
=============
Jde o webovou aplikaci, kterou si navrhl sám Dan. Nejedná se o nic jiného, než o časovač, který si ukládá své nastavení v prohližeči a "odpočítává" o po zavření prohližeče. Právě běžící časovač se dá exportovat do souboru, kterým se dá stejný časovač importovat na jiném zařízení. Aplikace funguje i offline, jakmile se jednou otevře v prohlížeči, tak se všechny potřebné soubory uloží a není potřeba připojení k internetu.

- URL: https://app-daniel-clock.web.app/
- Hosting: [Firebase](https://console.firebase.google.com/project/app-daniel-clock/hosting/sites/app-daniel-clock) (pod účtem M.Baroňe; je možné přidat dalšího uživatele)
- Zdrojové kódy: https://github.com/PlayXman/app-daniel-clock

Jak to funguje?
---------------

### Struktura složek
- `/components` - Vue komponenty. Jedná se o HTML kód, který se dá použít na více místech webu. Například hlavička stránky, která se zobrazuje na každé stránce. Nebo formulářové políčko.
- `/public` - Soubory, které se přímo zkopírují do výsledného webu. Například obrázky, fonty, atd.
- `/utils` - Pomocné Javascriptové soubory, které se používají na více místech webu. Například soubor `time.js` obsahuje funkce pro práci s časem.
- `app.vue` - Hlavní Vue komponenta. Prakticky se jedná o `index.html` soubor. Všimni si, že v něm chybí `<head>` a `<body>`. Ty se automaticky doplní z Nuxt.js.
- `nuxt.config.ts` - Konfigurační soubor Nuxt.js. Zde se nastavuje například hlavička stránky, která se zobrazuje na každé stránce. Nebo nastavení pro generování URL adres obrázků, css souborů a jiných stránek.
- `package.json` - Soubor s informacemi o projektu a jeho závislostech. Zde se nastavuje například verze Nuxt.js, Vue.js, a dalších Javascriptových knihoven. Existuje velmi široká komunita Javascriptových vývojářů, kteří sdílejí svoje knihovny/moduly (k nalezení na [NPM](https://www.npmjs.com/)). Ty se dají jednoduše nainstalovat pomocí `npm install <nazev knihovny>`. V tomto souboru se také nastavuje, jak se má projekt spustit, jak se má zkompilovat do výsledného webu, atd.

Zbytek souborů není momentálně příliž důležitý. Jejich důvod se dá zjistit v dokumentaci Nuxt.js, Vue.js, a NPM.

### Uživatelské rozhraní (HTML, CSS) a základní logika (Javascript)
Aplikace je napsaná v [Nuxt.js](https://nuxt.com/), což je framework využívající [Vue.js](https://vuejs.org/) k dynamickému aktualizování HTML. Nuxt.js zjednodušuje tvorbu dynamických webových stránek, nebo dokonce webových aplikací. Davá strukturu projektům a zjednodušuje jejich správu a konfiguraci. V praxi se používá ke sjednocování hlaviček (= `<head>`) na všech stránkach, ke generování URL adres na obrázky, css soubory a jiné stránky. Mnoho zákládního nastavení webu jejiž zakomponováno a vylaďeno v Nuxt.js. Pokud je ale potřeba nějaké nastavení změnit, tak je to možné v souboru `nuxt.config.js`.

Vue.js je Javascriptová knihovna podobná [jQuery](https://jquery.com/) nebo [React.js](https://react.dev/), která slouží k jednoduší tvorbě dynamického HTML.

#### Například:
Máme jedno formulářové políčko. K jeho hodnotě se má připočíst jednička. A výsledek zobrazit pod ním.

HTML by vypadalo takto:
```html
<input type="number" name="mojePole" value="5">
<p>Vysledek: 6</p>
```
Kdyź ale změníme hodnotu v poli, tak se výsledek neaktualizuje. Na to je potřeba Javascript. Ve Vue.js by to vypadalo takto:
```vue
<div id="mojeAplikace">
  <input type="number" :value="vysledek" @input="function(udalost) {
    vysledek = udalost.target.value + 1;
  }">
  <p>Vysledek: {{vysledek}}</p>
</div>
<script>
  createApp({
    setup() {
      const vysledek = ref(0); // Vue proměnná. Jakmile se změní, tak se automaticky aktualizuje i HTML.
      return {
        vysledek: vysledek, // První "výsledek" je název proměnné přístupné v HTML, druhý je proměnná v Javascriptu. Většinou je název stejný, aby se kód lépe četl.
      }
    }
  }).mount('#mojeAplikace'); // Připojí Vue aplikaci do HTML elementu s id="mojeAplikace". Od této chvíle Vue začne aktualizovat vše v tomto elementu.
</script>
```

### Ukládání dat
Jakmile uživatel nastaví nový časovač jeho údaje se uloží do `localStorage` v prohližeči. Jedná se o permanentní uložiště přímo v prohlížeči. Nicméně se dá jednoduše smazat odstraněním "cache" (= dočasný souborů prohlížeče)! Proto je v aplikaci i možnost stáhnout data z `localStorage` ve formě souboru, který lze znovu naimportovat.

Veškeré funkce obhospodařující ukládání dat jsou v souboru `utils/localStorage.js`.


Vývoj a úpravy aplikace
-----------------------

### Instalace
1. Nainstaluj si [Node.js](https://nodejs.org/en/). Jedná se o server pro Javascript. Využívá se pro spouštění NPM příkazů, Javascriptových aplikaci, atd. Je to podobé jako Xampp pro PHP, nebo Java Javové aplikace.
2. Otevři si terminál (příkazový řádek) a přejdi do složky s projektem. Například `cd C:\Users\Daniel\Documents\app-daniel-clock`.
3. Nainstaluj všechny závislosti z `package.json` pomocí příkazu `npm install`. Tím se nainstaluje Nuxt.js, Vue.js a další knihovny, které jsou potřeba pro vývoj aplikace.

### Vývoj
1. Spusť vývojový server pomocí příkazu `npm run dev`. Tím se spustí server na adrese `http://localhost:3000`. Pokud se změní nějaký soubor, tak se aplikace automaticky zkompiluje a aktualizuje v prohlížeči.
2. **Pusť se do úprav!**
3. Jakmile budeš hotový, tak zastav vývojový server a zkompiluj aplikaci do výsledného webu pomocí příkazu `npm run generate`. Tím se vytvoří složka `dist` s výsledným webem. Tuto složku můžeš nahrát na jakýkoli server.

### Nasazení změn
1. Buď obsah složky `dist` zkopíruj na nějaký server, nebo aktualizuj verzi na Firebase, kde aplikace aktualně leží.
   1. Pro přístup k projektu na Firebase musíš mít účet na Google. A ten musí být propojený s projektem.
   2. Dále si nainstaluj [nástroje pro správu Firebase](https://firebase.google.com/docs/cli?authuser=0&hl=en#install-cli-windows) pomocí příkazu `npm install -g firebase-tools`. Tím se nainstaluje nástroj `firebase` do celého systému. Ten se pak dá použít v jakémkoli projektu.
   3. Přihlaš se do Firebase pomocí příkazu `firebase login`. Otevře se ti prohlížeč, kde se přihlásíš do svého Google účtu.
3. V terminálu (příhazovém řádku) přejdi do složky s projektem. Například `cd C:\Users\Daniel\Documents\app-daniel-clock`.
4. A nyní můžeš nahrát novou verzi aplikace na Firebase pomocí příkazu `npm run deploy`. Tím se nahraje obsah složky `dist` na Firebase a aplikace se automaticky aktualizuje.
