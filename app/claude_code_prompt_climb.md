# App: Top 10 Ratespiel – Climb Modus

## Überblick
Mobile Party-Quiz-App (iOS + Android). Lokal auf einem Gerät, kein Backend. Zwei Teams/Spieler spielen gegeneinander.

## Spielmodus: Climb

### Konzept
- 11 Items werden angezeigt (z.B. "Länder nach Einwohnerzahl")
- Alle Items sind sichtbar, aber OHNE Rangfolge
- Teams tippen abwechselnd auf das Item, das sie für das SCHLECHTESTE/NIEDRIGSTE halten
- Getipptes Item wird entfernt, nächstes Team ist dran

### Punktevergabe
- **2 Punkte:** Item war tatsächlich das Niedrigste
- **1 Punkt:** Item war nicht das Niedrigste, aber auch nicht Platz 1
- **💀 Game Over:** Item war Platz 1 → Gegner gewinnt sofort

### Spielende
Wenn nur noch Platz 1 übrig ist, gewinnt das Team mit den meisten Punkten.

### Beispiel
Kategorie: "Top 11 bevölkerungsreichste Länder"

Items: Bangladesch, Brasilien, China, Indien, Indonesien, Japan, Mexiko, Nigeria, Pakistan, Russland, USA

1. Team Blau tippt "Japan" → War Platz 11 ✅ → 2 Punkte
2. Team Rot tippt "Mexiko" → War Platz 10 ✅ → 2 Punkte
3. Team Blau tippt "Russland" → War Platz 9 ✅ → 2 Punkte
4. Team Rot tippt "Bangladesch" → War Platz 8, nicht Niedrigstes → 1 Punkt
5. ...weiter bis nur Indien (Platz 1) übrig ist

---

## Design-Vorgaben
- Clean, minimalistisch
- Hauptfarbe: Weiß
- Keine Bilder, nur Emojis für Kategorien (⚽ Sport, 🌍 Geografie, etc.)
- Mobile-first (iOS + Android)

---

## Tech Stack (Vorschlag)
- Framework: React Native oder Flutter
- State Management: Lokal (kein Backend)
- Datenstruktur: JSON für Kategorien/Items

---

## Figma-Designs
[Werden separat hochgeladen]

---

## Nächster Schritt
Erstelle einen funktionierenden Prototyp des Climb-Modus mit:
1. Kategorie-Auswahl Screen
2. Team-Setup Screen (2 Teams benennen)
3. Spiel-Screen (11 Items anzeigen, antippen, Punkte tracken)
4. Ergebnis-Screen (Gewinner anzeigen)
