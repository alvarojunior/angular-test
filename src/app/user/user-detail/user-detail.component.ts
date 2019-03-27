import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { User } from '../../model/user.model';
import { UserService } from '..//user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }

  cancel(isChanged): void {
    const msg = 'Are you sure you want to discard the changes?';
    if (!isChanged) {
      this.goBack();
      return;
    }

    if (confirm(msg)) {
      this.goBack();
    }
  }

  save(): void {
    this.userService.updateUser(this.user)
      .subscribe(() => {
        this.toastr.success('User updated!', 'Success');
        this.goBack();
      }, () => {
        this.toastr.error('Error in update user', 'Error');
        this.goBack();
      });
  }

}
