// Define commonly used variables
const filters = {
    text: "",
    sort: "dateA"
}

const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const notesSection = document.querySelector(".notesListContainer");
const addNote = document.querySelector("#newNote");
const editNoteTitle = document.querySelector("h2");

const resetAddNotes = () => {
    editNoteTitle.textContent = "Add a Note";
    addNote.reset();
    addNote.dataset.editing = "";
}

const renderNotes = () => {

    notesSection.innerHTML = "";

    const filteredNotes = () => {

        notes.sort((a, b) => {
            if (filters.sort === "dateA") {
                return a.date - b.date;
            } else if (filters.sort === "dateD") {
                return b.date - a.date;
            } else if (filters.sort === "titleA") {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                } else {
                    return 0;
                }
            } else if (filters.sort === "titleZ") {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return -1;
                } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return 1;
                } else {
                    return 0;
                }
            }
        })

        return notes.filter(note => note.title.toLowerCase().includes(filters.text.toLowerCase()) || note.body.toLowerCase().includes(filters.text.toLowerCase()));
    }

    filteredNotes().forEach((note) => {
        const date = new Date(note.date);
        const container = document.createElement("div");
        const noteTitle = document.createElement("p");
        const noteText = document.createElement("p");
        const noteFooter = document.createElement("div");
        const noteDate = document.createElement("p");
        const noteFooterR = document.createElement("div");
        const editNote = document.createElement("button");
        const deleteNote = document.createElement("button");

        container.classList.add("noteContainer");

        noteTitle.textContent = note.title;
        noteTitle.classList.add("noteTitle");

        noteText.textContent = note.body;
        noteText.classList.add("noteBody");

        noteDate.textContent = `${monthArr[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;

        editNote.textContent = "Edit";
        editNote.addEventListener("click", (e) => {
            addNote.noteTitle.value = note.title;
            addNote.noteBody.value = note.body;
            addNote.dataset.editing = note.date;
            editNoteTitle.textContent = "Editing Note";
        })

        deleteNote.textContent = "Delete";
        deleteNote.addEventListener("click", () => {
            notes = notes.filter(indNote => indNote.date !== note.date);
            localStorage.setItem("notes", JSON.stringify(notes));
            renderNotes();
        })

        noteFooterR.classList.add("noteFooterR");
        noteFooterR.appendChild(editNote);
        noteFooterR.appendChild(deleteNote);

        noteFooter.classList.add("noteFooter");
        noteFooter.appendChild(noteDate);
        noteFooter.appendChild(noteFooterR);

        container.appendChild(noteTitle);
        container.appendChild(noteText);
        container.appendChild(noteFooter);

        notesSection.appendChild(container);
    })
}

// Adding note listeners

addNote.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.target.dataset.editing !== "") {
        const i = notes.findIndex(note => note.date === +e.target.dataset.editing);
        notes[i].title = e.target.noteTitle.value;
        notes[i].body = e.target.noteBody.value;
    } else {
        notes.push({
            title: e.target.noteTitle.value !== "" ? e.target.noteTitle.value : "Untitled Note",
            body: e.target.noteBody.value,
            date: new Date().getTime()
        })
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    resetAddNotes();
    renderNotes();
})

document.querySelector("#resetForm").addEventListener("click", resetAddNotes);

// Filtering listeners

document.querySelector("#sorting").addEventListener("change", (e) => {
    filters.sort = e.target.value;
    renderNotes();
})

const filterInput = document.querySelector("#filter");

filterInput.addEventListener("input", (e) => {
    filters.text = e.target.value;
    renderNotes();
})

filterInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
})

// Initialize app

let notes = JSON.parse(localStorage.getItem("notes")) ?? [];
document.querySelectorAll("form").forEach(form => form.reset());
renderNotes();

// Style. Add getter/setter later