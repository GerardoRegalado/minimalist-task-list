import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskModel } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [CommonModule, ReactiveFormsModule]
})
export class FooterComponent{
  public items: TaskModel[] = [];
  public txtInput: FormControl;

  constructor(private itemservice: ItemService)
  {
    this.txtInput = new FormControl('',
        [Validators.minLength(5),
        Validators.maxLength(35)])
  }


  public save() {
    let newItem = {
      name: this.txtInput.value,
      state: false
    }

    if (this.txtInput.invalid || this.txtInput.value === "") return
    this.itemservice.add(newItem)
    this.txtInput.reset();
  }
}
