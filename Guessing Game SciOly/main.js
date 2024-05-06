
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
let fullGL=["Justin", "Spencer", "Michael", "Chloe", "Marcus", "Tucker", "Finander", "Lavasani","Kai", "Lucas", "Ethan", "Sujatha", "Aadi", "Luke","Isaac Newton", "Albert Einstein", "Marie Curie", "Charles Darwin", "Galileo Galilei", "Nikola Tesla", "Stephen Hawking", "Leonardo da Vinci", "Alexander Fleming", "Jane Goodall", "Ada Lovelace", "Max Planck", "Rosalind Franklin", "Carl Sagan", "Erwin Schrödinger", "Alan Turing", "Rachel Carson", "Louis Pasteur", "Barbara McClintock", "Neil deGrasse Tyson","Niels Bohr", "Lise Meitner", "Richard Feynman", "Emmy Noether", "James Clerk Maxwell", "André-Marie Ampère", "Enrico Fermi", "Dorothy Hodgkin", "Edwin Hubble", "Ernest Rutherford", "Werner Heisenberg", "Linus Pauling", "Richard Dawkins", "Jocelyn Bell Burnell", "Sigmund Freud", "Margaret Mead", "Edmond Halley", "Jonas Salk", "Claude Shannon", "Hans Bethe", "Srinivasa Ramanujan", "Max Born", "Michael Faraday", "Paul Dirac", "George Washington Carver", "Ada Yonath", "Edward Jenner", "Alessandro Volta", "Brian Cox", "Marie Tharp", "Katherine Johnson", "Shirley Ann Jackson", "Grace Hopper", "Hedy Lamarr", "Gerty Cori", "Chien-Shiung Wu", "James Watson", "Francis Crick", "J. Robert Oppenheimer", "Frederick Sanger", "Barbara McClintock", "Gertrude Elion", "Richard Leakey", "Allan Wilson", "Paul Nurse", "Carol Greider", "Elizabeth Blackburn", "Dorothy Crowfoot Hodgkin", "May-Britt Moser", "Emilie du Châtelet", "Frances Arnold", "Pierre Curie", "Sylvia Earle", "John Bardeen", "Walter Gilbert", "Jennifer Doudna", "Roger Penrose", "George Smoot", "John von Neumann", "Edward Witten", "Paul Erdős", "Gauss", "Blaise Pascal", "Hippocrates", "William Harvey", "Ivan Pavlov", "Carl Linnaeus", "Mendel", "Konrad Lorenz", "Alfred Wegener", "Paul Ehrlich", "Baruch Spinoza", "Claude Bernard", "Gregor Mendel", "Carl Woese", "Thomas Hunt Morgan", "Max Perutz", "Hermann von Helmholtz", "Louis Agassiz", "Hans Geiger", "Hermann Muller", "Fritz Haber", "Theodor Schwann", "Ernst Mayr", "Baruch Blumberg", "Martin Rodbell", "Francis Collins"

];
let guessList=[];
let cList=[];
let iList=[];
let currentIndex=null;
let timer=0;
let timerOn=false;
let delay=0;
let score=0;
let keys = {
    "s": {pressed: false},
    " ": {pressed: false}
};
function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    guessList=fullGL;
    addAllListeners();
    animate();      // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(timerOn){
        timer++;
        delay++;
    }
    playGame();
    //draws stuff
    context.beginPath();
    context.fillStyle="black";
    context.textAlign="center";
    context.font=("bold 80px serif");
    if(currentIndex!=null){
        context.fillText(guessList[currentIndex],canvas.width/2,canvas.height/2);
    }
    if(timer>60*90){
        context.fillText("Correct: "+cList, canvas.width/2, canvas.height/2+300);
        context.fillText("Incorrect: "+iList,canvas.width/2,canvas.hieght/2+400);
    }
    context.fillText("Score: "+score,canvas.width/2, canvas.height/2+100);
    context.fillText("Time: "+Math.round((90*60-timer)/60), canvas.width/2,canvas.height/2+200);
    context.closePath();
    requestAnimationFrame(animate); // next cycle
}
function addAllListeners(){
    window.addEventListener("keydown", (event) => {
        if (keys[event.key])
        {
            keys[event.key].pressed = true;
        }
    });
    
    window.addEventListener("keyup", (event) => {
        if (keys[event.key])
        {
            keys[event.key].pressed = false;
        }
    });
}
function playGame(){
    if(!timerOn){
        if(keys[" "].pressed){
            let r=Math.floor((Math.random()*guessList.length));
            currentIndex=r;
            timerOn=true;
            delay=0;
            score=0;
            timer=0;
            guessList=fullGL;
            cList=[];
            iList=[];
        }
    } else { 
        if(timer>60*90){
            timerOn=false;
        }
        if(keys[" "].pressed&&delay>30){
            score++;
            cList.splice(0,0,guessList[currentIndex]);
            guessList.splice(currentIndex,1);
            let r=Math.floor((Math.random()*guessList.length));
            currentIndex=r;
            delay=0;
        } else if(keys["s"].pressed&&delay>30){
            iList.splice(0,0,guessList[currentIndex]);
            guessList.splice(currentIndex,1);
            let r=Math.floor((Math.random()*guessList.length));
            currentIndex=r;
            delay=0;
        }
        
    }
}



