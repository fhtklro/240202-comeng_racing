const docInputFile = document.getElementById("input_file")
const docSelectTelop = document.getElementById("select_telop")

let inputData = ""
let csvData = []

docInputFile.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);

    reader.onload = function(event) {
        inputData = event.target.result;
        input2Csv(inputData);
        // console.log("debug "+csvData)
        genSelectBox(csvData);

    };
});

function genSelectBox(cData) {
    let count = cData.length;

    console.log(cData)

    for(let i=0; i<count; i++) {
        const option = document.createElement('option');
        option.text = cData[i][0];
        option.value = i;
        docSelectTelop.add(option);
    }
}

function input2Csv(text) {
    const inputData = text.split('\n');
    const lineCount = inputData.length;

    // console.log(inputData)

    for(let i=0; i<lineCount; i++) {
        let pushdata = inputData[i].split(",")
        
        if(pushdata.length == 2) {
            // console.log(pushdata)
            csvData.push(pushdata)
        }
        // console.log("---")
    }
    // console.log(csvData)
}
