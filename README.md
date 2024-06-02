Flight Tracker
Av Nadir Ali Huseini, Tarik Serezlic, Oswaldo Quijada


Beskrivning
Flight Tracker är en webbapplikation som visar flygdata i realtid på en karta. Med hjälp av data från OpenSky Network API:et visar sidan aktiva flygplan över Europa. Användare kan söka efter flyg utifrån ursprungslandet eller flyg-id. Dessutom kan användarna lägga till flygplan i en favoritlista, så att de snabbt kan komma åt och spåra sina favoritflygplan. 

Val av ramverk
Vi valde React och React-Leaflet främst för att de gör det möjligt för oss att enkelt skapa interaktiva kartor utan onödig komplexitet som kan komma med externa API: er som Google Maps eller Mapbox. React-Leaflet erbjuder en mängd React-komponenter för Leaflet-kartor, vilket har gjort det smidigare att implementera kartfunktioner direkt i vår React-applikation. Hade vi använt oss av andra ramverk som Vue eller Angular hade denna process (av att skapa interaktiva kartor) förmodligen blivit svårare. React är dessutom en av de mest använda ramverken i dagens IT-bolag och vi ansåg därför att vi har mer att vinna på att använda det än de mindre kända ramverken. 

OpenSkyNetwork
Vi valde att använda OpenSkyNetwork som API för att hämta flygdata eftersom detta API:et erbjuder en sömlös integrering i vår applikation. Vi provade andra API:er som AviationStack men fick ofta problem med anropen och att hämta och visa korrekt data. OpenSkyNetwork är dessutom open source och kräver inga kontaktuppgifter eller bankinformation som många av de andra API:erna gör. Utöver detta behöver man inte heller använda API-nycklar heller för att åstadkomma flygdatan vilket har gjort integreringen av API:et i vår webbapp enklare. 
