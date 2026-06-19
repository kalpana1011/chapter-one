[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Hc-bEhvt)
# Inlämningsuppgift - The Library

Denna inlämningsuppgift fokuserar på att du skall lära dig hantera server side kod i next. Du skall hämta data från ett api: <https://openlibrary.org/dev/docs/api/search>

Läs gärna på kring dokumentationen om detta api och se över vilka querystrings som just du kommer behöva i ditt projekt.

## Uppgiften

Denna uppgift består av två delar.

### Hämta böcker

Du skall söka efter böcker från openlibrary och presentera den med:

- Titel
- Författare
- Utgivningsår
- Omslagsbild (om det finns)

Detta skall ske i en server component så att du hämtar data till din applikation från servern istället för via webbläsaren.

För att se böckerna skall en egen route användas, t.ex. /books

### Skapa en läslista

För att träna lite mer på att hantera egen data kommer du i denna del att skapa den egen läslista och lagra den i en mongoose-databas.

Här behöver du hitta anslutningssträngen till din databas igen, kika gärna i den tidigare kursens kod om du behöver. Sedan behöver du skapa en mongoose model för ett objekt i din läslista. Och nu behöver du sedan skapa crud-operationerna för denna model så att du kan hantera läslistan via server actions.

För att se din läslista skall en egen route användas, t.ex. /reading-list

## Krav

### Betyg G

- Göra en sökning av böcker baserat på en textruta
- Hantera all data på servern
- Ha kontroll över antalet böcker som du hämtar (bör inte vara alla utan ett begränsat antal)
- Presentera böckerna enligt beskrivningen ovan
- Kunna klicka på en bok för att lägga till den i din läslista
- Kunna se din läslista
- Samtliga punkter ovan skall skötas via server actions och server components
- Responsiv design med hjälp av tailwind

### Betyg VG

- Kunna ta bort böcker från läslistan
- Använda paginering för att presentera böckerna i /books
- Använda paginering för att presentera läslistan i /reading-list
- Validering av data som skall sparas i databasen
- Felhantering implementeras om t.ex. databasen eller api:t inte svarar
- Statusmeddelande om när en bok läggs till i läslistan eller tas bort ur läslistan
