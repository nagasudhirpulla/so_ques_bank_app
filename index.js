// convert csv to json using http://www.convertcsv.com/csv-to-json.htm
var topicsCache = ["POC", "DSM", "RRAS", "RLDC F&C", "OA_Connectivity", "Congestion", "Power Market Regulation", "Trading License Regulation", "Regulation of Power Supply", "TCT 14-19", "Metering", "PSDF", "CEA_Transaction of business", "REC", "Grid Standard", "IEGC", "grant of transmission on licence", "Technical details by Gen", "TCT-RE_2012", "Act-NEP_Tariff-Policy", "NE Policy", "Ring Fencing", "Competitive Bidding", "Regulatory Mix", "CEA Tech Std for Con", "CEA safety requirement", "CEA Tech.Std.Construction", "Grant of reg approval to CTU", "Intervening Tr facility", "Revn'e shar'g from business", "CEA Safety & Elec Supply", "Tr Plg Reg2018", "Conduct of Busines", "ESCert", "FSD Procedure", "En Conservation Act", "SOP", "Comm Sys_Reg"];
var topicsComboBoxId = "topicsComboBox";
var selectedTopic_g = "";

var populateTopics = function (comboId) {
    var selEl = document.getElementById(comboId);
    for (let optInd = 0; optInd < topicsCache.length; optInd++) {
        const topicStr = topicsCache[optInd];
        var option = document.createElement('option');
        option.value = topicStr;
        option.innerHTML = topicStr;
        selEl.appendChild(option);
    }
}

window.onload = function () {
    populateTopics(topicsComboBoxId);
}

function loadQuestions() {
    // todo check if same topic is requested, if so ask via alert
    var selEl = document.getElementById(topicsComboBoxId);
    selectedTopic_g = selEl.value;

    // get questions based on the topic
    var topicQuestions = [];
    for (var i = 0; i < questions.length; i++) {
        selectedTopic_g = selEl.value;
        if (questions[i]["Topic"] == selectedTopic_g) {
            topicQuestions.push(questions[i]);
        }
    }

    // populate questions
    var questionsDivEl = document.getElementById("questionsDiv");
    questionsDivEl.innerHTML = "";
    for (let quesIter = 0; quesIter < topicQuestions.length; quesIter++) {
        const quesObj = topicQuestions[quesIter];
        var quesDiv = createQuesDiv(quesObj, quesIter);
        questionsDivEl.appendChild(quesDiv);
    }

}

function createQuesDiv(questionObj, quesIter) {
    // create the question Element
    var quesDiv = document.createElement("div");

    // append question string
    var quesStrEl = document.createElement("span");
    quesStrEl.innerHTML = (quesIter + 1) + ". " + questionObj["Question"];
    quesDiv.appendChild(quesStrEl);
    quesDiv.appendChild(document.createElement("br"));
    quesDiv.appendChild(document.createElement("br"));

    // create options divs
    var opt1El = createOptEl(questionObj["Option1"], quesIter, 1);
    var opt2El = createOptEl(questionObj["Option2"], quesIter, 2);
    var opt3El = createOptEl(questionObj["Option3"], quesIter, 3);
    var opt4El = createOptEl(questionObj["Option4"], quesIter, 4);
    quesDiv.appendChild(opt1El);
    quesDiv.appendChild(opt2El);
    quesDiv.appendChild(opt3El);
    quesDiv.appendChild(opt4El);

    // add new lines at the end
    quesDiv.appendChild(document.createElement("br"));
    quesDiv.appendChild(document.createElement("br"));

    // add bottom border
    quesDiv.style['border-bottom'] = '2px dotted black';

    // add class to the correct options
    var correctAnsIndex = questionObj["answer"];
    if (correctAnsIndex == 1) {
        opt1El.className += " answerClass";
    } else if (correctAnsIndex == 2) {
        opt2El.className += " answerClass";
    } else if (correctAnsIndex == 3) {
        opt4El.className += " answerClass";
    } else if (correctAnsIndex == 4) {
        opt4El.className += " answerClass";
    }
    return quesDiv;
}

function createOptEl(optionStr, quesIter, optIndex) {
    var optEl = document.createElement("label");
    optEl.style['margin-right'] = '24px';
    var radioItem1 = createRadioItem(quesIter, optIndex);
    optEl.appendChild(radioItem1);
    
    var spanEl = document.createElement("span");
    spanEl.innerHTML = optionStr;
    optEl.appendChild(spanEl);

    return optEl;  
}

function createRadioItem(quesIter, ItemNum) {
    var radioItem = document.createElement("input");
    radioItem.type = "radio";
    radioItem.name = "radio" + quesIter;
    radioItem.value = ItemNum;
    return radioItem;
}

function showAnswers() {
    var correctOptEls = document.getElementsByClassName("answerClass");
    for (let ansIter = 0; ansIter < correctOptEls.length; ansIter++) {
        const ansEl = correctOptEls[ansIter];
        ansEl.style.color = 'green';
        ansEl.style['font-weight'] = 'bold';
        ansEl.style['text-decoration'] = 'underline';
    }

}