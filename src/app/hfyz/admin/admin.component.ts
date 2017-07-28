// import { Component, OnInit } from '@angular/core';
// import { TabViewModule, PanelModule, TreeModule, TreeNode, MenuModule, MenuItem, DialogModule,
//          CheckboxModule, PickListModule, InputTextareaModule, GrowlModule, Message, SelectItem, ButtonModule } from 'primeng/primeng';
// import { AdminService } from './admin.service';
// @Component({
// 	selector: 'admin',
// 	templateUrl: 'admin.component.html',
// 	styleUrls: ['../../app.component.css']
// })

// export class AdminComponent implements OnInit {
// 	title = "系统管理";
// 	newitems: MenuItem[];
// 	roles: TreeNode[];
// 	selectedTree: TreeNode;
// 	constructor(private _adminService: AdminService) {
// 		//let menu=this.elRef.nativeElement.parentElement.querySelector('#home')

// 	}
// 	ngOnInit() {
// 		this.newitems = [
// 			{ label: '角色', icon: 'fa-users' },
// 			{ label: '用户', icon: 'fa-user' }
// 		];
// 		this.loadRoles();
// 	}
// 	loadRoles() {
// 		this._adminService.getRoles().then(roles => {
// 			this.roles = roles;
// 			this.selectedTree = roles[0];
// 			//this.changeSourceRight(this.selectedTree.data.type
// 			//	,this.selectedTree.data.id)

// 			//this.userForm.patchValue({role: roles[0].data.id})
// 		})
// 	}
// 	onNew(event) {

// 	}
// 	onEdit() {

// 	}
// 	onDelete() {

// 	}
// 	onSaveRights() {

// 	}
// 	nodeSelect(event) {

// 	}
// 	nodeExpand(event) {

// 	}
// }
