const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const notesDiv = document.getElementById('notes');
const deletedNotesDiv = document.getElementById('deletedNotes');
const archivedNotesDiv = document.getElementById('archivedNotes');

showNotes();
showDeletedNotes();
showArchivedNotes();

function addNotes() {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        notes = [];
    } else {
        notes = JSON.parse(notes);
    }

    if (addText.value == '') {
        alert('Add your note');
        return;
    }

    const noteObj = {
        title: addTitle.value,
        text: addText.value,
        archived: false,
        deleted: false
    }
    addTitle.value = '';
    addText.value = '';
    notes.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function showNotes() {
    let notesHTML = '';
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }
    for (let i = 0; i < notes.length; i++) {
        if (!notes[i].deleted && !notes[i].archived) {
            notesHTML += `<div class="note">
                            <button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
                            <button class="editNote" id=${i} onclick="editNote(${i})">Edit</button>
                            <button class="archiveNote" id=${i} onclick="archiveNote(${i})">Archive</button>
                            <span class="title">${notes[i].title === "" ? 'Note' : notes[i].title}</span>
                            <div class="text">${notes[i].text}</div>
                        </div>`;
        }
    }
    notesDiv.innerHTML = notesHTML;
}

function deleteNote(ind) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }
    notes[ind].deleted = true;
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
    showDeletedNotes();
}

function showDeletedNotes() {
    let deletedNotesHTML = '';
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].deleted && !notes[i].archived) {
            deletedNotesHTML += `<div class="note">
                                    <button class="deleteNote" id=${i} onclick="deleteNotePermanently(${i})">Delete Permanently</button>
                                    <span class="title">${notes[i].title === "" ? 'Note' : notes[i].title}</span>
                                    <div class="text">${notes[i].text}</div>
                                </div>`;
        }
    }
    deletedNotesDiv.innerHTML = deletedNotesHTML;
}

function restoreNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        notes = [];
    } else {
        notes = JSON.parse(notes);
    }

    notes[index].deleted = false; // set deleted flag to false to restore note
    notes[index].archived = false; // set archived flag to false to restore note
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
    showDeletedNotes();
    showArchivedNotes();
}

function archiveNote(ind) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }
    notes[ind].archived = true;
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
    showArchivedNotes();
}

function showArchivedNotes() {
    let archivedNotesHTML = '';
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].archived) {
            archivedNotesHTML += `<div class="note">
                                    <button class="deleteNote" id=${i} onclick="deleteNotePermanently(${i})">Delete Permanently</button>
                                    <button class="restoreNote" id=${i} onclick="restoreNote(${i})">Restore</button>
                                    <span class="title">${notes[i].title === "" ? 'Note' : notes[i].title}</span>
                                    <div class="text">${notes[i].text}</div>
                                </div>`;
        }
    }
    archivedNotesDiv.innerHTML = archivedNotesHTML;
}
// Function to permanently delete a note
function deleteNotePermanently(index) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        notes = [];
    } else {
        notes = JSON.parse(notes);
    }

    notes.splice(index, 1); // remove note from array
    localStorage.setItem('notes', JSON.stringify(notes));
    showDeletedNotes();
    showArchivedNotes();
}


function editNote(ind) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        return;
    } else {
        notes = JSON.parse(notes);
    }
    const editedTitle = prompt('Enter new title:', notes[ind].title);
    const editedText = prompt('Enter new text:', notes[ind].text);
    if (editedTitle !== null && editedTitle.trim() !== '') {
        notes[ind].title = editedTitle;
    }
    if (editedText !== null && editedText.trim() !== '') {
        notes[ind].text = editedText;
    }
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

addNoteButton.addEventListener('click', addNotes);

