# ⭐ Star Shop

En Temu-inspirerad webshop med massor av billiga klädesplagg — mest herrmode,
men även dam, barn och accessoarer. Ren frontend, ingen backend.

## Funktioner

- Bläddra bland ~100 produkter, filtrera per kategori och sök
- Lägga till produkter i varukorgen, ändra antal och ta bort dem
  (sparas i webbläsarens `localStorage`)
- Kassaflöde med ordersammanställning, val av betalsätt och orderbekräftelse
  (simulerat i frontend, utan riktig betalningshantering)

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
- `js/main.js` – rendering, filter, sök, kassaflöde
