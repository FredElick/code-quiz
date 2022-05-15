///tag existing elements
var buttonEl=document.querySelector(".start");
var headerEl=document.querySelector("header");
var divEl=document.querySelector("div");
var timerEl=document.querySelector(".timer")
var bodyEl=document.querySelector("body");
var viewScoreEl=document.querySelector(".view-score")
//make elements for quiz pages
var newDiv=document.createElement("div");
newDiv.className="questDiv";
var question=document.createElement("h3");
var ansrA=document.createElement("button");
ansrA.setAttribute("answer", "a");
var ansrB=document.createElement("button");
ansrB.setAttribute("answer", "b");
var ansrC=document.createElement("button");
ansrC.setAttribute("answer", "c");
var ansrD=document.createElement("button");
ansrD.setAttribute("answer", "d")
// enter score elements
var scoreDivEl=document.createElement("div");
var allDoneEl=document.createElement("h1");
var finalScoreEl=document.createElement("p");
var initialBlockEl=document.createElement("div");
var initialText=document.createElement("p")
var formEl=document.createElement("input");
var scoreButtonEl=document.createElement("button");
scoreButtonEl.id=("submit");
// list scores elements
var listScoreEl= document.createElement("div");
listScoreEl.className='list-score';
var highScoreEl=document.createElement("h1");
highScoreEl.textContent="High Scores";
var listEl=document.createElement("ol");
var goBackEl=document.createElement("button");
goBackEl.textContent="Go back"
var clearEl=document.createElement("button");
clearEl.textContent="Clear high scores";
goBackEl.className="go-back";
clearEl.className="clear";
var answerMessage=document.createElement("footer");
//global variables- correct answer marker, time and question list
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
//check for scoreList and import, if none make one
if(localStorage.getItem('scoreList')){
    scoreList=JSON.parse(localStorage.getItem('scoreList'));
}

else{
    scoreList=[];
}
//define the countdown function
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

//sets the element text of buttons and questions
var setQuestion= function( arr, index){
    var questObj=arr[index];
    question.textContent=questObj.question;
    ansrA.textContent=questObj.a;
    ansrB.textContent=questObj.b;
    ansrC.textContent=questObj.c;
    ansrD.textContent=questObj.d;
    correct=questObj.correct;
}
//adds the elements to the page for the quiz portion
function addQuestion(){
    bodyEl.appendChild(newDiv);
    newDiv.appendChild(question);
    newDiv.appendChild(ansrA);
    newDiv.appendChild(ansrB);
    newDiv.appendChild(ansrC);
    newDiv.appendChild(ansrD);
}
//stops the timer
function stopTime(){
    clearInterval(timeInterval);
}
//sets the new questions when needed, in retrospect superfluous, but makes it so you don't need to plug the question array every time.
function nextQuestion(index){
    setQuestion(qList,index);
}
//event listener for score submission button. Updates the score array and saves it to storage, also takes us to the score list
scoreButtonEl.addEventListener("click",function(event){
    event.preventDefault();
    var score ={
        score: time,
        name: formEl.value.trim()
    }
    scoreList.push(score);
    var stringScore=JSON.stringify(scoreList);
    localStorage.setItem("scoreList",stringScore);
    listScores();
})
//function defines the score entry screen, and removes the quiz elements
function scoreScreen(){
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

//event listener for the score list screen, lets you clear scores or return to the main menu.
listScoreEl.addEventListener("click",function(event){
    if(event.target.className=='clear'){

        scoreList=[];
        var stringScore=JSON.stringify(scoreList);
        localStorage.setItem("scoreList",stringScore);
        while(listEl.firstChild){
            listEl.removeChild(listEl.firstChild);
        }
    }
    if(event.target.className=='go-back'){
        while(listEl.firstChild){
            listEl.removeChild(listEl.firstChild);
        }
        listScoreEl.remove();
        bodyEl.appendChild(headerEl);
        bodyEl.appendChild(divEl);
       
    }
})
//defines the score list screen. Loops through the array of scores and displays them. No sorting of high scores,
//although that wasn't asked for in project description.
function listScores(){
scoreDivEl.remove();
headerEl.remove();
bodyEl.appendChild(listScoreEl);
listScoreEl.appendChild(highScoreEl);
listScoreEl.appendChild(listEl);
listScoreEl.appendChild(goBackEl);
listScoreEl.appendChild(clearEl);
stringScore=localStorage.getItem("scoreList")
scoreList=JSON.parse(stringScore);

for(var j=0; j<scoreList.length;j++){
var temp=document.createElement("li");
var initials=scoreList[j];

temp.textContent=scoreList[j].name+" - "+scoreList[j].score;
listEl.appendChild(temp);
}
}
//event listener for questions. will match the button attribute to the correct answer to check for accuracy. Reduces timer if wrong and updates to next question until
//array is empty or time=0, then stops time and kicks to score screen
newDiv.addEventListener("click", function(event){
    if(event.target.getAttribute("answer")!=correct){
        answerMessage.textContent='Incorrect';
       time=time-10;
       if(time<0){
           time=0;
       }
       timerEl.textContent="Time: "+time;
    }
    else{
        answerMessage.textContent='Correct';
    }
    newDiv.appendChild(answerMessage);
    if(questionNumber<qList.length-1){
        questionNumber++;
    nextQuestion(questionNumber)

    }
    else{
        stopTime();
        newDiv.remove();
        scoreScreen();
    }
})
//function for starting the quiz. removes old ui elements, initializes timer, and puts first question on screen. Added something to remove the correct/incorrect
//message as it was sticking around if you jumped between score list after answering questions.
var startQuiz= function(){
    time=75;
    divEl.remove();
    addQuestion();
    questionNumber=0;
    nextQuestion(0);
    countdown();
    answerMessage.remove();

};
//event listener for start button. ezpz

buttonEl.addEventListener("click", function(){
startQuiz();

} );
//view score button along top. I set it as an onclick function so I didn't have to muck about with making it a button or link to a new html page.
viewScoreEl.onclick=function(){
    headerEl.remove();
    divEl.remove();
    newDiv.remove();
    listScores();
}

