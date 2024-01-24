const docName = document.getElementById("name");
const docDescription = document.getElementById("description");

const repValue = nodecg.Replicant("repValue");

function display_change(name, description) {
    docName.innerText = name;
    docDescription.innerText = description;
}

repValue.on("change", newValue => {
    display_change(newValue[0], newValue[1]);
});
