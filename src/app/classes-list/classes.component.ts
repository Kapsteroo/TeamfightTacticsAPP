import { Component, OnInit } from '@angular/core';
import { Class } from '../models/class';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  classes: Class[];

  constructor(private classService: ClassService) {}

  ngOnInit(): void {
    this.classService.getClasses().subscribe((classes) => {
      this.classes = classes;
    });
  }
}
