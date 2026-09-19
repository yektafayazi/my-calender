// =====================================
// MONTHS
// =====================================

const months = [

    {
        name: "Mehr",
        monthNumber: 7,
        days: 30,
        start: 4
    },

    {
        name: "Aban",
        monthNumber: 8,
        days: 30,
        start: 6
    },

    {
        name: "Azar",
        monthNumber: 9,
        days: 30,
        start: 1
    },

    {
        name: "Dey",
        monthNumber: 10,
        days: 30,
        start: 3
    },

    {
        name: "Bahman",
        monthNumber: 11,
        days: 30,
        start: 5
    },

    {
        name: "Esfand",
        monthNumber: 12,
        days: 29,
        start: 0
    }

];


// =====================================
// VARIABLES
// =====================================

let currentMonth = 0;

let selectedDay = null;


// =====================================
// GET ELEMENTS
// =====================================

const calendar =
    document.getElementById("calendar");

const monthTitle =
    document.getElementById("monthTitle");

const monthNumber =
    document.getElementById("monthNumber");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const selectedDate =
    document.getElementById("selectedDate");

const mobileNote =
    document.getElementById("mobileNote");

const mobileSaveBtn =
    document.getElementById("mobileSaveBtn");
    // =====================================
// STORAGE
// =====================================

function getNoteKey(monthIndex, day) {

    return "calendar1405-" +
        monthIndex +
        "-" +
        day;

}


// =====================================
// SHOW CALENDAR
// =====================================

function showCalendar() {

    const month = months[currentMonth];


    // Clear old calendar

    calendar.innerHTML = "";


    // Reset selected day

    selectedDay = null;


    // Month title

    monthTitle.textContent =
        month.name;


    monthNumber.textContent =
        "Month " + month.monthNumber;


    selectedDate.textContent =
        "Select a day";


    mobileNote.value = "";


    // Navigation buttons

    prevBtn.disabled =
        currentMonth === 0;

    nextBtn.disabled =
        currentMonth === months.length - 1;


    // =================================
    // EMPTY SPACES
    // =================================

    for (
        let i = 0;
        i < month.start;
        i++
    ) {

        const empty =
            document.createElement("div");

        empty.className = "empty";

        calendar.appendChild(empty);
    }


    // =================================
    // CREATE DAYS
    // =================================

    for (
        let day = 1;
        day <= month.days;
        day++
    ) {

        createDay(day);
    }

}
// =====================================
// CREATE DAY
// =====================================

function createDay(day) {

    const month =
        months[currentMonth];


    // Day box

    const dayBox =
        document.createElement("div");

    dayBox.className = "day";


    // =================================
    // WEEKDAY
    // =================================

    const weekday =
        (month.start + day - 1) % 7;


    // Friday

    if (weekday === 6) {

        dayBox.classList.add("friday");
    }


    // =================================
    // NUMBER
    // =================================

    const number =
        document.createElement("div");

    number.className = "day-number";


    // ONLY NUMBER
    number.textContent = day;


    dayBox.appendChild(number);


    // =================================
    // NOTE
    // =================================

    const note =
        document.createElement("textarea");

    note.className = "day-note";

    note.placeholder =
        "Write a note...";


    const key =
        getNoteKey(
            currentMonth,
            day
        );


    const savedNote =
        localStorage.getItem(key);


    if (savedNote) {

        note.value = savedNote;

        dayBox.classList.add("has-note");
    }
    // Save note automatically

    note.addEventListener(
        "input",
        function () {

            localStorage.setItem(
                key,
                note.value
            );


            if (
                note.value.trim() !== ""
            ) {

                dayBox.classList.add(
                    "has-note"
                );

            } else {

                dayBox.classList.remove(
                    "has-note"
                );
            }

        }
    );


    dayBox.appendChild(note);


    // =================================
    // SELECT DAY
    // =================================

    dayBox.addEventListener(
        "click",
        function () {

            selectDay(day);
        }
    );


    calendar.appendChild(dayBox);

}


// =====================================
// SELECT DAY
// =====================================

function selectDay(day) {

    selectedDay = day;


    const month =
        months[currentMonth];


    const key =
        getNoteKey(
            currentMonth,
            day
        );


    const savedNote =
        localStorage.getItem(key) || "";


    // Remove previous selection

    const allDays =
        document.querySelectorAll(".day");


    allDays.forEach(
        function (box) {

            box.classList.remove(
                "selected"
            );

        }
    );
    // =================================
    // FIND CORRECT DAY
    // =================================

    const dayIndex =
        day - 1;


    const selectedBox =
        allDays[dayIndex];


    if (selectedBox) {

        selectedBox.classList.add(
            "selected"
        );
    }


    // =================================
    // MOBILE NOTE
    // =================================

    selectedDate.textContent =
        month.name +
        " " +
        day +
        ", 1405";


    mobileNote.value =
        savedNote;


    // Scroll on phone

    if (window.innerWidth <= 600) {

        document
            .getElementById(
                "mobileNoteBox"
            )
            .scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
    }

}


// =====================================
// MOBILE SAVE
// =====================================

mobileSaveBtn.addEventListener(
    "click",
    function () {

        if (selectedDay === null) {

            alert(
                "Please select a day first."
            );

            return;
        }


        const key =
            getNoteKey(
                currentMonth,
                selectedDay
            );


        localStorage.setItem(
            key,
            mobileNote.value
        );


        const savedDay =
            selectedDay;


        showCalendar();


        selectDay(savedDay);


        alert(
            "Note saved successfully! 💙"
        );

    }
);
// =====================================
// PREVIOUS
// =====================================

prevBtn.addEventListener(
    "click",
    function () {

        if (currentMonth > 0) {

            currentMonth--;

            showCalendar();
        }

    }
);


// =====================================
// NEXT
// =====================================

nextBtn.addEventListener(
    "click",
    function () {

        if (
            currentMonth <
            months.length - 1
        ) {

            currentMonth++;

            showCalendar();
        }

    }
);


// =====================================
// START
// =====================================

showCalendar();
