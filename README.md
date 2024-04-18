
# Labyrinth-Konfigurator 🕹️

Dieses Projekt bietet die Möglichkeit, eigene Labyrinthe zu konfigurieren und diese dann in einem Spiel zu erkunden. Die Anwendung ermöglicht die Konfiguration von Bodenplatten, Hindernissen, dem Ziel und dem Charakter selbst. Bei Registrierung ist es ebenfalls möglich, Highscores aufzustellen und sich mit anderen Mitgliedern zu vergleichen.

## Technologien

Dieses Projekt verwendet folgende Technologien:

-   **DotNet**: Wird verwendet, um eine API zur Verfügung zu stellen, über die Benutzer Labyrinth-Konfigurationen speichern und abrufen können
-   **NestJS**: Wird verwendet, um eine API zur Verfügung zu stellen, über die Benutzer Labyrinth-Konfigurationen speichern und abrufen können
-   **Angular**: Wird verwendet, um die Benutzeroberfläche der Anwendung zu erstellen
-   **Unity**: Wird verwendet, um das Labyrinth-Spiel zu erstellen

## Installation 💾

Im Folgenden wird erklärt, wie Sie das Projekt lokal ausführen können. 

### Repository klonen 📥
Beginnen Sie damit, das Repository zu Klonen, indem Sie es entweder aus GitLab direkt herunterladen oder folgenden Befehl ausführen:

```bash
    git clone https://github.com/tschanni/Labyrinth-Configurator.git
```

### Ziel-Backend wählen
Sie können mit dem gleichen Frontend entweder das **.NET** oder das **NestJS** Backend verwenden. Beachten Sie bitte, dass immer nur eines der beiden Backends gleichzeitig ausgeführt werden sollte und die Backends verschiedene Datenbanken verwenden.
Beim Wechsel des Backends sollte ein evtl. angemeldeter Benutzeraccount zuvor abgemeldet werden, um Inkonsistenzen in der Datenbank zu vermeiden.

#### Backend wechseln
Navigieren Sie im Angular Projekt zur Datei `Konfigurator-Frontend/src/swagger/api/api.ts` und kommentieren Sie die entsprechende Zeile ein.

### Angular-Frontend

1. Stellen Sie sicher, dass Sie [Node.js](https://nodejs.org/en/) installiert haben
2. Stellen Sie sicher, dass Sie die Angular CLI installiert haben
3. Öffnen Sie ein Terminal im Ordner `Konfigurator-Frontend` und führen Sie den Befehl `npm install` aus
4. mit dem Befehl `ng serve` wird das Projekt gestartet

 ### .NET-Backend
 
#### Installation mit Visual Studio
1. Installieren Sie [Visual Studio 2022](https://visualstudio.microsoft.com/de/downloads/). Wichtig ist, dass Sie während des Installationsprozesses ***ASP.NET and web development*** auswählen
2. Öffnen Sie in Visual Studio das Projekt ***Konfigurator-aspnetcore-Backend.sln*** im Ordner `Konfigurator-aspnetcore-Backend`
3. Stellen Sie sicher, dass alle NuGet Pakete installiert sind. Sie können die Installierten NuGet Pakete unter `Extras/NuGet-Paket-Manager/NuGet-Pakete für Projektmappe verwalten...` einsehen.
4. Führen Sie das Projekt in Visual Studio mit **Strg+F5** oder unter **Starten ohne Debuggen** aus
5. Vertrauen Sie dem selbst signierten Entwicklerzertifikat
6. Um auf die Swagger-Seite des Backends zuzugreifen, rufen Sie bitte die Seite `https://localhost:7246/swagger/index.html` in Ihrem Webbrowser auf.

### NestJS
1. Stellen Sie sicher, dass Sie [Node.js](https://nodejs.org/en/) installiert haben
2. Öffnen Sie ein Terminal im Ordner `Konfigurator-nestjs-Backend/konfigurator-nestjs-backend` und geben Sie dort den Befehl `npm install` ein
3. Starten Sie das Projekt mit dem Befehl  `npm start`
4. Um auf die Swagger-Seite des Backends zuzugreifen, rufen Sie bitte die Seite `http://localhost:7246/api` in Ihrem Webbrowser auf.

## einige Hinweise zur Projektstruktur
- Controller-Dateien enhalten die API-Methoden, welche durch eine entsprechende Request des Clients ausgeführt werden
- die Logik und der Datenbankzugriff sind in Service-Dateien ausgelagert, um die Flexibiliät zu erhöhen
- Dateien in den Ordern Models (.NET) und Entities (NestJS) stellen eine Datenbanktabelle als Klasse im Programmcode dar
- Dateien im Order DTOs (Data Transfer Objects) enthalten die Datentypen, die für Kommunikation zwischen Client und Server genutzt werden

## Benutzung 🗺️

Nachdem Sie die Anwendung installiert und gestartet haben, können Sie eigene Labyrinth-Konfigurationen erstellen und spielen.

1.  Öffnen Sie die Angular-App in Ihrem Browser unter `http://localhost:4200`.
    
2.  Erstellen Sie sich einen Account unter Sign-up

3.  Starten Sie die Konfiguration mit einem Klick auf Configurator in der Menüzeile
    
4.  Konfigurieren Sie das Labyrinth, indem Sie Bodenplatten, Hindernisse, das Ziel und den Charakter auswählen und platzieren
    
5.  Klicken Sie am Ende der Konfiguration auf die Schaltfläche "Upload and Play", um das Labyrinth in der Datenbank zu speichern
    
6.  Daraufhin öffnet sich das Spiel und Sie können beginnen, das Labyrinth zu erkunden, indem Sie den Charakter durch die Gänge navigieren, um das Ziel zu erreichen
    
7.  Klicken Sie auf Created Maps, um alle verfügbaren Labyrinthe zu finden
    
8.  Erspielen Sie Highscores und Messen Sie sich mit anderen
    
