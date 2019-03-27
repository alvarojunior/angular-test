import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { User } from '../../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  dataSource = new MatTableDataSource<User>(this.users);
  displayedColumns = ['select', 'name', 'age', 'actions'];
  selection = new SelectionModel<User>(true, []);

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe((users) => {
        this.users = users;
        this.dataSource.data = this.users;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  delete(user: User): void {
    this.userService.deleteUser(user).subscribe(() => {
      this.users = this.users.filter(h => h !== user);
      this.dataSource.data = this.users;
      this.toastr.success('User removed!', 'Success');
    }, () => {
      this.toastr.success('Error While Trying to Delete User', 'Error');
    });
  }

  deleteAllSelected(): void {
    this.selection.selected.forEach(u => this.delete(u));
    this.selection = new SelectionModel<User>(true, []);
  }

  hasSelected(): boolean {
    return this.selection.selected.length > 0;
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAll(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  totalSelected(): number {
    return this.selection.selected.length;
  }

  downloadAllSelected(): void {
    this.downloadFile(this.selection.selected);
  }

  downloadFile(json: any): void {
    try {
      const data = JSON.stringify(json);
      const blob = new Blob([data], { type: 'application/json' });
      const filename = 'users.json';
      saveAs(blob, filename);
    } catch (e) {
      console.error(e);
      this.toastr.success('Error While Trying to Download Users', 'Error');
    }
  }

}
