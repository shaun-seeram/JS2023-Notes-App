const notes = JSON.parse(localStorage.getItem("notes")) ?? [{
    title: "Apple",
    body: "Apple",
    date: 2
},{
    title: "Banana",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: 1699915639025
}];

const filters = {
    text: "",
    sort: "dateA"
}

const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const notesSection = document.querySelector(".notesListContainer");

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

        return notes.filter((note) => {
            return note.title.toLowerCase().includes(filters.text.toLowerCase()) || note.body.toLowerCase().includes(filters.text.toLowerCase())
        })
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

const sortInput = document.querySelector("#sorting");

sortInput.addEventListener("change", (e) => {
    filters.sort = e.target.value;
    renderNotes();
})


document.querySelector("#headerForm").reset();
renderNotes();