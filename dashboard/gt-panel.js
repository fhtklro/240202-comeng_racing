const docInputFile = document.getElementById("input_file");
const docSelectTelop = document.getElementById("select_telop");
const docTelopName = document.getElementById("telop_name");
const docTelopDescription = document.getElementById("telop_description");
const docButtonReset = document.getElementById("reset")
const docButtonSubmit = document.getElementById("submit")

// const repValue = nodecg.replicant("repValue")

let inputData = "";
let csvData = [];

// ファイルのアップロード
docInputFile.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);

    reader.onload = function(event) {
        inputData = event.target.result;
        input2Csv(inputData);
        genSelectBox(csvData);
        selectDefault();
    };
});

// csvファイルの読み込み
function input2Csv(text) {
    const inputData = text.replace(/\r/g, '').split('\n');
    const lineCount = inputData.length;

    for(let i=0; i<lineCount; i++) {
        const pushdata = inputData[i].split(",");
        
        if(pushdata.length == 2) {
            csvData.push(pushdata);
        }
    }
}

// セレクトボックスへの反映
function genSelectBox(cData) {
    let count = cData.length;

    for(let i=0; i<count; i++) {
        const option = document.createElement('option');
        option.text = cData[i][0];
        option.value = i;
        docSelectTelop.add(option);
    }
}

// セレクトボックスの初期化
function selectDefault() {
    docSelectTelop.selectedIndex = -1;
}

// テキストボックスに反映
docSelectTelop.addEventListener('change', (e) => {
    const selectValue = e.target.value;
    console.log(selectValue, csvData[selectValue]);
    docTelopName.value = csvData[selectValue][0];
    docTelopDescription.innerHTML = csvData[selectValue][1];
});

// リセット
docButtonReset.onclick = () => {
    docTelopName.value = "";
    docTelopDescription.innerHTML = "";
}

// 反映
docButtonSubmit.onclick = () => { 
    // repValue = [docTelopName.value, docTelopDescription.innerHTML];
}