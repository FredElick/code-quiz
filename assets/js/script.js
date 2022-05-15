///tag existing elements
var buttonEl=document.querySelector(".start");
var divEl=document.querySelector("div");
var timerEl=document.querySelector(".timer")
var bodyEl=document.querySelector("body");
//make elements for quiz pages
var newDiv=document.createElement("div");
var question=document.createElement("h3");
var ansrA=document.createElement("button");
ansrA.setAttribute("answer", "a");
var ansrB=document.createElement("button");
ansrB.setAttribute("answer", "b");
var ansrC=document.createElement("button");
ansrC.setAttribute("answer", "c");
var ansrD=document.createElement("button");
ansrD.setAttribute("answer", "d")
//score screen elements
var scoreDivEl=document.createElement("div");
var allDoneEl=document.createElement("h1");
var finalScoreEl=document.createElement("p");
var initialBlockEl=document.createElement("div");
var initialText=document.createElement("p")
var formEl=document.createElement("input");
var scoreButtonEl=document.createElement("button");
//global variables- correct answer marker and question list
var correct="";
var time=0;
var qList= [
    q1={
        question: "An HTML document can contain _____",
        a: "Attributes",
        b: "Tags",
        c: "Raw text",
        d: "All the answers are true",
        correct: "d",

    },
    q2={
        question: "If we want to place text around an image, which CSS property should we use?",
        a: "push",
        b: "float",
        c: "align",
        d: "wrap",
        correct: "b",

    },
    q3={
        question: "A page designed in HTML is called _____",
        a: "Application",
        b: "Cover page",
        c: "Front-end",
        d: "Web Page",
        correct: "d",
    },
    q4={
        question: "An HTML document is saved with the ____ extension.",
        a: ".htl",
        b: ".html",
        c: ".hml",
        d: ".htnl",
        correct: "b",
    },
    q5={
        question: "The HTML document contains a root tag called ____",
        a: "HEAD",
        b: "Title",
        c: "Body",
        d: "HTML",
        correct: "d",
    },
    q6={
        question: "Suppose we want to arrange three DIVs so that DIV 3 is placed above DIV1. Now, which CSS property are we going to use to control the stack order?",
        a: "d-index",
        b: "s-index",
        c: "x-index",
        d: "z-index",
        correct: "d",
    },
    q7={
        question: "Choose the correct HTML tag for a large title.",
        a: "H1",
        b: "Heading",
        c: "Head",
        d: "H6",
        correct: "a"
    },
    q8={
        question: "The full form of CSS is:",
        a: "Cascading Style Sheets",
        b: "Coloured Special Sheets",
        c: "Color and Style Sheets",
        d: "none of the above",
        correct: "a"
    },
    q9={
        question: "Which of the following tag is used to embed css in html page?",
        a: " <css>",
        b: "<!DOCTYPE html>",
        c: "<script>",
        d: "<style>",
        correct: "d"
    },
    q10={
        question: "Which of the following CSS selector is used to specify a rule to bind a particular unique element?",
        a: "tag",
        b: "id",
        c: "class",
        d: "both class and tag",
        correct: "b"
    },

];

function countdown(){
    timerEl.textContent="Time: "+time;
timeInterval= setInterval(function(){
    if(time>0){
time--;
timerEl.textContent="Time: "+time;
}
else{
    timerEl.textContent="Time: "+time;
    clearInterval(timeInterval);
    scoreScreen();
}
}, 1000)
}


var setQuestion= function( arr, index){
    var questObj=arr[index];
    question.textContent=questObj.question;
    ansrA.textContent=questObj.a;
    ansrB.textContent=questObj.b;
    ansrC.textContent=questObj.c;
    ansrD.textContent=questObj.d;
    correct=questObj.correct;
}
function addQuestion(){
    bodyEl.appendChild(newDiv);
    newDiv.appendChild(question);
    newDiv.appendChild(ansrA);
    newDiv.appendChild(ansrB);
    newDiv.appendChild(ansrC);
    newDiv.appendChild(ansrD);
}

function stopTime(){
    clearInterval(timeInterval);
}

function nextQuestion(index){
    setQuestion(qList,index);
}

function scoreScreen(){
    /**var scoreDivEl=document.createElement("div");
    var allDoneEl=document.createElement("h1");
    var finalScoreEl=document.createElement("p");
    var initialBlockEl=document.createElement("div");
    var initialText=document.createElement("p")
    var formEl=document.createElement("input");
    var scoreButtonEl=document.createElement("button"); */
    allDoneEl.textContent="All done!";
    finalScoreEl.textContent="Your final Score is "+time+".";
    initialText.textContent="Enter initials: ";
    scoreButtonEl.textContent="Submit";
    newDiv.remove();
    bodyEl.appendChild(scoreDivEl);
    scoreDivEl.appendChild(allDoneEl);
    scoreDivEl.appendChild(finalScoreEl);
    scoreDivEl.appendChild(initialBlockEl);
    initialBlockEl.appendChild(initialText);
    initialBlockEl.appendChild(formEl);
    initialBlockEl.appendChild(scoreButtonEl);

}

var startQuiz= function(){
    time=75;
    divEl.remove();
    addQuestion();
    questionNumber=0;
    nextQuestion(0);
    countdown();
    newDiv.addEventListener("click", function(event){
        console.log(event.target.getAttribute("answer"));
        console.log(correct);
        if(event.target.getAttribute("answer")!=correct){
           time=time-10;
           timerEl.textContent="Time: "+time;
        }
        if(questionNumber<qList.length-1){
            questionNumber++;
        nextQuestion(questionNumber)

        }
        else{
            console.log('thats all folks')
            stopTime();
            console.log(timerEl.textContent);
            console.log(time);
            newDiv.remove();
            scoreScreen();
        }
    })
};

buttonEl.addEventListener("click", function(){
startQuiz();
} );
