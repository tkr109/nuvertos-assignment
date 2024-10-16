import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompoundService } from 'src/app/services/compound.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-compound-details',
  templateUrl: './compound-details.component.html',
  styleUrls: ['./compound-details.component.css']
})
export class CompoundDetailsComponent implements OnInit {
  public compound: any = null;
  public showModal: boolean = false;
  public updatedCompound: any = {};

  constructor(
    public authService: AuthService,  
    private compoundService: CompoundService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCompoundDetails(+id);
    }
  }

  
  loadCompoundDetails(id: number) {
    this.compoundService.getCompoundById(id).subscribe((data: any) => {
      this.compound = data;
      this.updatedCompound = { ...data };  
    });
  }

  
  openUpdateModal() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });  
    } else {
      this.showModal = true;
    }
  }

  // Close the modal
  closeModal() {
    this.showModal = false;
  }

  // Update compound
  updateCompound() {
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) {
      this.compoundService.updateCompound(+id, this.updatedCompound).subscribe(
        (response) => {
          this.closeModal();  
          this.loadCompoundDetails(+id);  
          alert('Compound updated successfully!');
        },
        (error) => {
          console.error('Error updating compound:', error);
          alert('Failed to update compound.');
        }
      );
    }
  }
  

  
  deleteCompound() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } }); 
    } else {
      if (confirm('Are you sure you want to delete this compound?')) {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.compoundService.deleteCompound(+id).subscribe(() => {
            this.router.navigate(['/']);
          });
        }
      }
    }
  }
}
