function currentTime() {
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString();
    }
}

function updateClock() {
    const d = new Date();
    let utchr = d.getUTCHours();
    const timeDiff = -8; // Change this value for different time zones
    let adjTimeDiff = utchr + timeDiff;
    let timeZone;

    if (adjTimeDiff >= 24) adjTimeDiff -= 24;
    else if (adjTimeDiff < 0) adjTimeDiff += 24;

    if (timeDiff === -8) timeZone = "PST (Pacific Standard Time)";
    else if (timeDiff === -5) timeZone = "EST (Eastern Standard Time)";
    else timeZone = "UTC";

    const utcClock = document.getElementById('utcClock');
    if (utcClock) {
        utcClock.textContent = `${adjTimeDiff}:00 ${timeZone}`;
    }
}

setInterval(currentTime, 1000);
setInterval(updateClock, 1000);

$(document).ready(function() {
    $(".selectable").click(function() {
        if ($(this).text() !== "Not Available") {
            $(this).toggleClass("highlight");

            let colIndex = $(this).index(); // Get the column index of the clicked cell
            let cliffName = $("thead th").eq(colIndex).text(); // Extract cliff name from header

            let activityName = $(this).text(); // Get the activity name

            let displaySelected = $("#displaySelected");
            let result = $("#result");

            if ($(this).hasClass("highlight")) {
                displaySelected.css("visibility", "visible").css("margin-top", "2em");

                let newActivity = $("<p></p>").text(activityName + " at " + cliffName);
                result.append(newActivity);
            } else {
                result.find("p").each(function() {
                    if ($(this).text() === activityName + " at " + cliffName) {
                        $(this).remove();
                    }
                });

                if (result.find("p").length === 0) {
                    displaySelected.css("visibility", "hidden").css("margin-top", "0");
                }
            }
        }
    });
});
