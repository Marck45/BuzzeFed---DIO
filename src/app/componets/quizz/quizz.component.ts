import { Component } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent {

  title: string = '';

  questions:any;
  questionSelected:any;

  answers:string[] = [];
  answeraSelectd:string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished:boolean = false;

  constructor(){}

  ngOnInit(){
    if(quizz_questions){
      this.finished = false;
      this.title =quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value:string){
    this.answers.push(value);
    this.nextStep()
    console.log(this.answers, 'sua resposta foi salva');
  }

 async nextStep(){
    this.questionIndex +=1;

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    } else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true;
      this.answeraSelectd = quizz_questions.results
      [finalAnswer as keyof typeof quizz_questions.results]
      // verificar opção vencedora

    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr)=>{
      if(
      arr.filter(item => item === previous).length >
      arr.filter(item => item === current).length)
      {
        return previous;

      } else{

        return current;

      }
    })
    return result;
  }
}
