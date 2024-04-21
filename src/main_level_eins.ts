/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { ActionMessage } from "@workadventure/iframe-api-typings";

console.log('Script started successfully');

async function main() {
    // Funktion zum Öffnen oder Schließen der Tür
    function displayDoor(state: boolean) {
        if (state === true) {
            WA.room.showLayer('dark_mode');
        } else {
            WA.room.hideLayer('dark_mode');
        }
    }

    try {
        // Bootstrapping der Scripting API Extra Library
        await bootstrapExtra();
        console.log('Scripting API Extra ready');

        // Initialisierung der Türanzeige basierend auf dem aktuellen Zustand
        displayDoor(WA.state.light as boolean);

        // Überwachung von Variablenänderungen für die Türanzeige
        WA.state.onVariableChange('doorState').subscribe((doorState) => {
            displayDoor(doorState as boolean);
        });
        let openCloseMessage: ActionMessage | undefined;
        // Nachricht beim Betreten des Raums
        WA.room.onEnterLayer('visibleLight').subscribe(() => {
            openCloseMessage = WA.ui.displayActionMessage({
                message: "Press 'space' to turn on the light",
                callback: () => {
                    WA.state.doorState = false;
                }
            });
        });

        // Öffnen des Dialogs beim Betreten der Karte
        const noteWebsite = await WA.ui.website.open({
            url: "src/dialog_note_test.html",
            position: {
                vertical: "top",
                horizontal: "middle",
            },
            size: {
                height: "30vh",
                width: "50vw",
            },
            margin: {
                top: "10vh",
            },
            allowApi: true,
        });

        // Schließen des Dialogs beim Verlassen der Ebene
        WA.room.onLeaveLayer("visibleDialog").subscribe(() => {
            noteWebsite.close();
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

// Warten auf die Bereitschaft der API und Ausführung der Hauptfunktion
WA.onInit().then(main).catch(console.error);

export {};