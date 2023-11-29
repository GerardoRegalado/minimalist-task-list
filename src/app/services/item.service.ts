import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  public id!: number;
  public itemSub: TaskModel[] = [];
  private sub = new Subject<TaskModel[]>();
  public item$ = this.sub.asObservable();
  private subFilter = new Subject<string>();
  public codeFilter$ = this.subFilter.asObservable();

  constructor() { }

  private generateID() {
    return '_' + Math.random().toString(36).substring(2,9)
  }

  public add(newItem: TaskModel){
    this.get();
    newItem.id = this.generateID()
    this.itemSub.push(newItem)
    this.sub.next(this.itemSub)
    localStorage.setItem("item", JSON.stringify(this.itemSub))
  }

  public get() {
    let listItems = JSON.parse(localStorage.getItem("item") as string)
    if (listItems == null) {
      this.itemSub = [];
      this.sub.next([])
    } else {
      this.itemSub = listItems
      this.sub.next(listItems)
    }
  }

  public filter(code: string){
    this.subFilter.next(code);
  }

  public changeState(id: string, state: boolean){
    let itemsResult = this.itemSub.map( item => {
      if (item.id === id) item.state = state;
      return item
    });
    this.sub.next(itemsResult)
    localStorage.setItem("item", JSON.stringify(itemsResult));
    this.itemSub = itemsResult
  }

  public delete(itemId: string) {
    let itemResult = this.itemSub.filter(items => items.id != itemId)
    this.sub.next(itemResult)
    localStorage.setItem("item", JSON.stringify(itemResult));
    this.itemSub = itemResult
  }
}
