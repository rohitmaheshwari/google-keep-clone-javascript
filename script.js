const addButton = document.querySelector("#add");

const updateLocalStorageData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note, index) => {
        return notes.push(note.value);
    })

    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `<div class="operation">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>  `;

    note.insertAdjacentHTML('afterbegin', htmlData);

    //get references
    // document.querySelector() won't be used here, because its in note not in document yet
    //  so we will use note.querySelector()
    const editButton = note.querySelector(".edit");
    const deleteButton = note.querySelector(".delete");
    const mainDiv = note.querySelector(".main");
    const textarea = note.querySelector("textarea");

    // if any value present 
    textarea.value = text;
    mainDiv.innerHTML = text;

    // deleting the note
    deleteButton.addEventListener('click', () => {
        note.remove();

        updateLocalStorageData();
    })

    // editing the note, by toggling using editButton
    editButton.addEventListener('click', () => {
        textarea.classList.toggle('hidden');
        mainDiv.classList.toggle('hidden');
    })

    // input triggers when you click a key whereas change triggers when anything changes
    textarea.addEventListener('change', (event) => {
        textarea.value = event.target.value;
        mainDiv.innerHTML = event.target.value;

        updateLocalStorageData();
    })

    // it appends a node as the last child of node
    document.body.appendChild(note);

}

// getting data back from local storage
const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
        console.log(note);
    })
}

addButton.addEventListener('click', () => addNewNote());