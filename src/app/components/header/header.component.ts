import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private  itemService :ItemService) {}

  public filter (code: string) {
    this.itemService.filter(code)
  }
}
