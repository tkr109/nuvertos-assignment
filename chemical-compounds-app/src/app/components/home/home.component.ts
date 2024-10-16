import { Component, OnInit } from '@angular/core';
import { CompoundService } from 'src/app/services/compound.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  compounds: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private compoundService: CompoundService, private router: Router) {}

  ngOnInit(): void {
    this.loadCompounds();
  }

  loadCompounds() {
    this.compoundService.getCompounds().subscribe((data: any) => {
      this.compounds = data;
    }, error => {
      console.error('Error loading compounds:', error);
    });
  }

  onCardClick(compoundId: number) {

    this.router.navigate([`/compound/${compoundId}`]);
  }
}
