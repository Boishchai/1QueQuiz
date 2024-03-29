class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    textSize(30);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined)
    {
      fill("blue");
      textSize(20);
      text("Result of The Quiz", 400, 50);
      //write code to add a note here
      text("*Note : The Name marked in Green is the winner!!!", 130, 230);
      var display = 120;
      //write code to highlight contest who answered correctly
      for(var plr in allContestants)
      {
        var correctAns = "2";
        
        if(correctAns === allContestants[plr].answer)
        {
          fill("green");
        }
        else
        {
          fill("red");
        }
        display = display + 200;
        text(allContestants[plr].name + ":" + allContestants[plr].answer, display, 300);
      }
    }
}
}
