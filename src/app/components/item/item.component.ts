import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { TaskModel } from '../../models/task.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-item',
  standalone: true,
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  imports: [ReactiveFormsModule]
})
export class ItemComponent implements OnInit{

  @Input() item: any;
  @Input() index!: number;
  public chkItem!: FormControl

  constructor( private itemService: ItemService){}

  ngOnInit(): void {
    this.chkItem = new FormControl(this.item.state);
    this.chkItem.valueChanges.subscribe(chkState => {
      this.changeState(chkState)
    })
  }

  public deleteItem (itemId: string) {
    this.itemService.delete(itemId)
  }

  public changeState(chkState: boolean) {
      this.itemService.changeState(this.item.id, chkState)

  }
}
