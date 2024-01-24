const docInputFile = document.getElementById("input_file");
const docSelectTelop = document.getElementById("select_telop");
const docTelopName = document.getElementById("telop_name");
const docTelopDescription = document.getElementById("telop_description");
const docButtonReset = document.getElementById("reset");
const docButtonSubmit = document.getElementById("submit");

const repValue = nodecg.Replicant("repValue");

let INPUTDATA = "";
let CSVDATA = [];
let NAME = ""
let DESCRIPTION = ""

// ファイルのアップロード
docInputFile.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);

    reader.onload = function(event) {
        INPUTDATA = event.target.result;
        input2Csv(INPUTDATA);
        genSelectBox(CSVDATA);
        selectDefault();
    };
});

// csvファイルの読み込み
function input2Csv(text) {
    const INPUTDATA = text.replace(/\r/g, '').split('\n');
    const lineCount = INPUTDATA.length;

    for(let i=0; i<lineCount; i++) {
        const pushdata = INPUTDATA[i].split(",");

        if(pushdata.length == 2) {
            CSVDATA.push(pushdata);
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

    NAME = CSVDATA[selectValue][0];
    DESCRIPTION = CSVDATA[selectValue][1];

    docTelopName.value = NAME;
    docTelopDescription.innerHTML = DESCRIPTION;
});

// リセット
docButtonReset.onclick = () => {
    NAME = ""
    DESCRIPTION = ""

    docTelopName.value = "";
    docTelopDescription.innerHTML = "";
}

// 反映
docButtonSubmit.onclick = () => {
    repValue.value = [NAME, DESCRIPTION];
}