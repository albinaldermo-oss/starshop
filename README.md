# ⭐ Star Shop

En Temu-inspirerad demo-webshop med massor av billiga klädesplagg — mest herrmode,
men även dam, barn och accessoarer. Byggd som en ren frontend-demo: ingen
backend, inget riktigt köp.

## Vad fungerar?

- Bläddra bland ~100 produkter, filtrera per kategori och sök
- Lägga till produkter i varukorgen, ändra antal och ta bort dem
  (sparas i webbläsarens `localStorage`)
- Allt annat — betalning, konton, leverans — är endast dekoration.
  Kassaknappen visar ett meddelande om att köp inte stöds.

## Köra lokalt

Statisk sida, ingen build behövs:

```bash
python3 -m http.server 8000
# öppna http://localhost:8000
```

## Struktur

- `index.html` – sidstruktur
- `css/style.css` – styling
- `js/data.js` – produktdata (genereras programmatiskt)
- `js/cart.js` – varukorgslogik (localStorage)
- `js/main.js` – rendering, filter, sök, UI-interaktioner
