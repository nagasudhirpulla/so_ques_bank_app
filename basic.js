// convert csv to json using http://www.convertcsv.com/csv-to-json.htm
//var topicsCache = ["1.POC", "2.DSM", "3.RRAS", "4.RLDC_F&C ", "5.OA-Connectivity", "6.Congestion", "7.Power Market Reg", "8. Trading License Reg", "9.Reg of Power Sup", "10.TCT14-19", "11.Metering", "12.PSDF", "13.CEA_Transaction of busi ness", "14.REC", "15.gridstandard", "16.IEGC", "17.grant of trans'on licence", "18.Technical details by Gen", "19.TCT-RE_2012", "20.Act-NEP_Tariff-Policy", "21.NE Policy", "22.Ring fencing", "23.CompBidding", "24.Regulatory_mix", "25.CEA Tech Std for Con", "26.CEA safety requirement", "27.CEA Tech.Std.Construction", "28.Grant of reg approval to CTU", "29. Intervening Tr facility", "30. Revn'e shar'g from business", "31.CEA Safety & Elec Supply", "32. Tr Plg Reg2018", "33. Conduct of Busines", "34. ESCert", "35. FSD Procedure", "36. En Conservation Act", "37.SOP", "38_Comm Sys_Reg", "All"];
var topicsCache = ["CompBidding",
"Congestion",
"RLDC_F&C ",
"VLPGO",
"POWER SYSTEM",
"RingFencing",
"Regulatory",
"Metering",
"GenTransFreq",
"ProtectionMVAR",
"PoC-Regulatory",
"PowerExchange",
"OA-Connectivity-Regulatory",
"DSM-Regulatory",
"TCT14-19-Regulatory",
"REC-Regulatory",
"REC",
"SCADA_EMS",
"IT",
"Regulatory_mix",
"gridstandard",
"IEGC",
"CEA Tech Std for Con", "All"];
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

    // change page title
    if (selectedTopic_g != "All") {
        document.title = selectedTopic_g;
    } else {
        document.title = 'System Operator Question Bank';
    }

    // get questions based on the topic
    var topicQuestions = [];
    for (var i = 0; i < questions.length; i++) {
        selectedTopic_g = selEl.value;
        if ((selectedTopic_g == "All") || questions[i]["Topic"] == selectedTopic_g) {
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

    // clear results
    updateResultsText("");
}

function createQuesDiv(questionObj, quesIter) {
    // create the question Element
    var quesDiv = document.createElement("div");
    quesDiv.className += ' question_div';
    // todo assign question number from the function argument and save as the div attribute

    // append question string
    var quesStrEl = document.createElement("span");
    quesStrEl.className += ' question_string';

    var quesStr = "";
    if (selectedTopic_g == "All") {
        var quesTopicEl = document.createElement("span");
        // not a good practice to use global variables or not checking of variable existence, but using due to lesser scope of development of code
        quesTopicEl.innerHTML = "[" + questionObj["Topic"] + "] ";
        quesTopicEl.className += ' topic_label';
        quesDiv.appendChild(quesTopicEl);
    }
    quesStr += (quesIter + 1) + ". ";
    quesStr += questionObj["Question"];
    quesStrEl.innerHTML = quesStr;
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
        opt3El.className += " answerClass";
    } else if (correctAnsIndex == 4) {
        opt4El.className += " answerClass";
    }
    return quesDiv;
}

function createOptEl(optionStr, quesIter, optIndex) {
    var optEl = document.createElement("label");
    optEl.style['margin-right'] = '24px';
    optEl.className += ' option_label';

    var radioItem = createRadioItem(quesIter, optIndex);
    optEl.appendChild(radioItem);

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
    radioItem.className += ' option_radio';
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

function evaluateAnswers() {
    // initialize the results
    var unansweredCount = 0;
    var correctCount = 0;
    var wrongCount = 0;

    // iterate all the question divs
    const ques_divs = document.getElementsByClassName("question_div");
    for (let quesInd = 0; quesInd < ques_divs.length; quesInd++) {
        const ques_div = ques_divs[quesInd];
        let ques_res = null;
        // iterate all the option labels
        const opt_labels = ques_div.getElementsByClassName("option_label");
        for (let opt_iter = 0; opt_iter < opt_labels.length; opt_iter++) {
            let opt_label = opt_labels[opt_iter];

            // check if option label corresponds to answer
            let opt_correct = opt_label.classList.contains("answerClass");

            // get the option checked status using the radio child of the option
            let opt_checked = false;
            let ans_radios = opt_label.getElementsByClassName("option_radio");
            if (ans_radios.length > 0) {
                ans_radio = ans_radios[0];
                opt_checked = ans_radio.checked;
                // determine if answer is correct, wrong, unanswered
                if (opt_checked == true) {
                    if (opt_correct == true) {
                        ques_res = true;
                    } else {
                        ques_res = false;
                    }
                }
            }
        }

        // increment the respective counters
        if (ques_res == true) {
            correctCount += 1;
        } else if (ques_res == false) {
            wrongCount += 1;
        } else {
            unansweredCount += 1;
        }
    }

    // update the results text    
    updateResultsText("correct = " + correctCount + ", wrong = " + wrongCount + ", unanswered = " + unansweredCount + ", total = " + (unansweredCount + correctCount + wrongCount));
}

function updateResultsText(resStr) {
    document.getElementById("resultsSpan").innerHTML = resStr;
}