import { Component, Renderer2, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import {WebsocketService} from '../../../websocket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

   //user auto gen client id from web socket
   private clientID="";
   //user team id
   meTeamId:any='';
   //teamA users
   teamAMembers: any[] = [];
   teamBMembers: any[] = [];
   //random quection
   quection?:string;
   //team select
   team ?: string;
   //answers
   answers: any[] = [];

   q ?: number;
   //answers
   cAnswerIndex ?:number;

   CAnswer?:string;
   //team select
   who ?: string;



   constructor(private wsService: WebsocketService,private renderer: Renderer2, private el: ElementRef,private route: ActivatedRoute) {   

        this.wsService.receive().subscribe(message => {
          if(message.method=="connect"){
           
            this.clientID=message.clientId;
            
            const id = this.route.snapshot.paramMap.get('id');
            this.meTeamId=id;

            if (!id) {
              alert('No id provided');
            }
            else{ 
              this.join(id);
            }
    
          };

          if(message.method=="join"){
            console.log("You joined Successfully");
            //this.teamAMembers.push(message.members)
            this.teamAMembers=[];
            message.members.forEach((member: any) => {
              if(member.team=="teamB"){
                this.teamAMembers.push(member);
              }
              if(member.team=="teamA"){
                this.teamBMembers.push(member);
              }
             
            });
          
    

          };
          if(message.method=="gameon"){
            this.CAnswer="";
            this.who="";
            this.quection=message.quection.quiz;
            this.team=message.team;
            this.q=message.qNum+1;
            this.cAnswerIndex=message.quection.correct_answer
            if(message.quection.answers) {
              this.answers=message.quection.answers;
            }

          };

          if(message.method=="gameOver"){
            this.CAnswer="Game Over! Team A Win";
            this.who="";
            this.answers=[];
          };

          if(message.method=="gAnswer"){
            console.log(message.markID);
            this.changeColor(message.markID);        
          };

          if(message.method=="answer"){
            this.CAnswer=message.isCorrect;
            this.who="Answer by:"+message.who;
          };
        });
  }

  ngAfterViewInit() {
    console.log('View has been initialized');
  }


  join(id:any) {

    const payLoad = {
      method: 'join',
      clientId: this.clientID,
      team:id,
      marks:0,
      username:this.clientID
    };
    this.wsService.send(payLoad);
    console.log("send join request ")
  }

  onLoad(){
    // const payLoad = {
    //   method: 'play',
    //   clientId: this.clientID,
    //   gameId:this.GameID,
    //   ballId:'',
    //   color:this.playerColor
    // };
    // this.wsService.send(payLoad);
  }

  clickOnAnswer(answerId: any){

    let status ="Incorrect Answer";
    if(answerId==this.cAnswerIndex){
      status ="Correct Answer"
    }
    const payLoad = {
      method: 'clickOn',
      clientId: this.clientID,
      team:this.meTeamId,
      cAnswer:this.cAnswerIndex,
      username:this.clientID,
      statusQ:status,
      userAnswer:answerId
    };
    this.wsService.send(payLoad);
    console.log("check request")
  }

  changeColor(i: any) {
    const div = document.getElementById(i);
    this.renderer.setStyle(div, 'background-color', "red");

}











  
  

}
