import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from "../item/item.component";
import { TaskModel } from '../../models/task.model';
import { ItemService } from '../../services/item.service';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    imports: [CommonModule, ItemComponent, FilterPipe]
})
export class MainComponent implements OnInit{
  public listItems!: TaskModel[];
  public codeFilter!: string;
  public title!: string;

  constructor(private itemService: ItemService){}
  ngOnInit(): void {
    this.itemService.codeFilter$.subscribe(code => {

      this.codeFilter = code;
      this.changeTitle(code);
    })
    this.itemService.filter('A')

    this,this.itemService.item$.subscribe(data => this.listItems = data)
    this.itemService.get()
  }

  public changeTitle(code: string) {
    const All = "A", completed = "C", Pendings = "P"
    if (code === All) this.title = "All";
    else if (code === completed) this.title = "Completed";
    else this.title = "Pendings"
  }

}
