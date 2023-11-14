let notes = JSON.parse(localStorage.getItem("notes")) ?? [];

const filters = {
    text: "",
    sort: "dateA"
}

const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const notesSection = document.querySelector(".notesListContainer");
const filterInput = document.querySelector("#filter");
const addNote = document.querySelector("#newNote");
const editNoteTitle = document.querySelector("h2");
const resetFormButton = document.querySelector("#resetForm");
const sortInput = document.querySelector("#sorting");


const renderNotes = () => {

    notesSection.innerHTML = "";

    const filteredNotes = () => {

        notes.sort((a, b) => {
            if (filters.sort === "dateA") {
                if (a.date > b.date) {
                    return 1
                } else if (a.date < b.date) {
                    return -1
                } else {
                    return 0
                }
            } else if (filters.sort === "dateD") {
                if (a.date > b.date) {
                    return -1
                } else if (a.date < b.date) {
                    return 1
                } else {
                    return 0
                }
            } else if (filters.sort === "titleA") {
                if (a.title > b.title) {
                    return 1
                } else if (a.title < b.title) {
                    return -1
                } else {
                    return 0
                }
            } else if (filters.sort === "titleZ") {
                if (a.title > b.title) {
                    return -1
                } else if (a.title < b.title) {
                    return 1
                } else {
                    return 0
                }
            }
        })

        return notes.filter(note => note.title.toLowerCase().includes(filters.text.toLowerCase()) || note.body.toLowerCase().includes(filters.text.toLowerCase()))
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

        container.setAttribute("data-id", note.date);
        container.classList.add("noteContainer");

        noteTitle.textContent = note.title;
        noteTitle.classList.add("noteTitle");

        noteText.textContent = note.body;
        noteText.classList.add("noteBody");

        editNote.textContent = "Edit";
        deleteNote.textContent = "Delete";

        editNote.addEventListener("click", (e) => {
            addNote.noteTitle.value = note.title;
            addNote.noteBody.value = note.body;
            addNote.dataset.editing = note.date;
            editNoteTitle.textContent = "Editing Note"
        })

        deleteNote.addEventListener("click", () => {
            notes = notes.filter(indNote => indNote.date !== note.date)
            localStorage.setItem("notes", JSON.stringify(notes))
            renderNotes();
        })

        noteFooterR.appendChild(editNote);
        noteFooterR.appendChild(deleteNote);
        noteFooterR.classList.add("noteFooterR")

        noteDate.textContent = `${monthArr[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`
        noteFooter.appendChild(noteDate);
        noteFooter.appendChild(noteFooterR);
        noteFooter.classList.add("noteFooter")

        container.appendChild(noteTitle);
        container.appendChild(noteText);
        container.appendChild(noteFooter);

        notesSection.appendChild(container);
    })
}

addNote.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.target.dataset.editing !== "") {
        const i = notes.findIndex(note => note.date === +e.target.dataset.editing)
        notes[i].title = e.target.noteTitle.value;
        notes[i].body = e.target.noteBody.value;
    } else {
        notes.push({
            title: e.target.noteTitle.value,
            body: e.target.noteBody.value,
            date: new Date().getTime()
        })
    }

    editNoteTitle.textContent = "Add a Note"
    addNote.reset()
    addNote.dataset.editing = "";
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
})

filterInput.addEventListener("input", (e) => {
    filters.text = e.target.value;
    renderNotes();
})

filterInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
})

sortInput.addEventListener("change", (e) => {
    filters.sort = e.target.value;
    renderNotes();
})

resetFormButton.addEventListener("click", () => {
    editNoteTitle.textContent = "Add a Note"
    addNote.reset()
    addNote.dataset.editing = "";
})


document.querySelectorAll("form").forEach(form => form.reset());
renderNotes();