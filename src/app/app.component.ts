import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MasterService } from './sevice/master.service';
import { ApiResponceModel,ITask,Task } from './model/task';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FontAwesomeModule,DatePipe,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'To-Do-App';
  faCoffee = faCoffee;

  taskObj :Task = new Task()
  taskList : ITask[] =[];

masterservice= inject (MasterService);
// constructor(private master:MasterService ){}  same as above

ngOnInit(): void {
  this.loadAllTask();
}
loadAllTask(){
  this.masterservice.getAllTaskList().subscribe((res:ApiResponceModel)=>{
    this.taskList = res.data;
  })
}
addTask(){
  this.masterservice.addNewTask(this.taskObj).subscribe((res:ApiResponceModel)=>{
  if(res.result){
    // alert('Task created succesfully');
    this.loadAllTask();
    this.taskObj=new Task();
  }
  },error=>{
    alert('API call error')
  })
}
update(){
  this.masterservice.updateTask(this.taskObj).subscribe((res:ApiResponceModel)=>{
    if(res.result){
      alert('Task created succesfully');
      this.loadAllTask();
      this.taskObj=new Task();
    }
    },error=>{
      alert('API call error')
    })
}
onDelete(id:number){
  const isConfirme = confirm ("Are You Sure You Want To Delete");
  if(isConfirme){
  this.masterservice.deleteTask(id).subscribe((res:ApiResponceModel)=>{
    if(res.result){
      this.loadAllTask();
      // alert('task deleted');
    }
    },error=>{
      alert('API call error')
    })
}
}
edit(item:Task)
{
this.taskObj=item
}
}
