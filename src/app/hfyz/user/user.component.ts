import {Component, OnInit,Injector,Renderer,ElementRef,ViewChild} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {TreeNode} from "primeng/components/common/api";
import {UserService} from "./user.service";
import { Observable } from 'rxjs/Observable';
import {MultiSelectModule,SelectItem} from 'primeng/primeng';
//import {LayoutComponent} from "../layout/layout.component";
import {RegularService} from "../common/shared/regular.service";
import {RoleService} from "../role/role.service"
import {ListboxModule} from 'primeng/primeng';
import {AuthService} from './../security/auth.service'
@Component({
  selector: 'user',
  templateUrl: 'user.component.html',
  styleUrls: ['../layout/layout.component.css']
})

export class UserComponent implements OnInit {

  userList:any[];
  type: number;
  layoutComponent
  displayDialog:boolean = false
  formTitle:string
  user: any;
  isAdd: boolean;
  roleList:SelectItem[];
  orgList:SelectItem[];
  currentUserId:number
  currentRoleArray=[]
  currentRoleString:string
	constructor(private _renderer:Renderer
    , private _router: Router
    , private _activatedRoute: ActivatedRoute
    , private _toastr: ToastsManager
    , private _userService: UserService
    , private _inj:Injector
    , private _regularService:RegularService
    , private _roleService:RoleService
    , private _authService:AuthService) {
      //this.layoutComponent = this.inj.get(LayoutComponent);
      this.currentUserId = this._authService.getCurrentUser('id')
      this.currentRoleArray = this._authService.getCurrentUser('roleId').split(';')
      console.log(this.currentRoleArray)
      this.currentRoleString = this._authService.getCurrentUser('roleId')
      this.user={id: '',operator:this.currentUserId};
      this.initData();
      //this.username=this.inj.get('username');
  }

  ngOnInit() {
    
  }
 
  
  initData(){
    this._userService.list(this.currentUserId).subscribe(
      res=>{
        this.userList=res.userList;
      }
    );
  }
  onEdit(user) {
    this._userService.edit(user.id).subscribe(
      res => {
        if (res.result == 'success') {
          this.user = res.user;
          this.roleList = res.roleList
          console.log(this.user.roles)
          this.displayDialog=true
          this.isAdd=false
          this.formTitle="编辑用户——"+user.name
        } else {
          this._toastr.error('获取数据失败');
        }
      }
    );
  }
  onCreate() {
    this.user.roles=null
    this._roleService.listForSelect(this.currentRoleString,this.currentUserId).subscribe(
      res=>{
        this.roleList=res.roleList;
        this.orgList=res.orgList
        this.formTitle="新增用户"
        this.isAdd=true
        this.displayDialog=true
        this.user={id: '',operator:this.currentUserId};
      }
    );
  }
 save(){
   if (this.validate()) {
      this._userService.save(this.user).subscribe(
        res => {
          this._toastr.success('保存成功');
          this.initData()
        }
      );
      this.displayDialog=false
      
    }
 }
 update(){
   if (this.validate()) {
      this._userService.update(this.user.id, this.user).subscribe(
        res => {
          this._toastr.success('修改成功');
          this.initData()
        }
      );
      this.displayDialog=false
    }

 }
  onDelete(user) {
     if (confirm('确认移除用户——'+user.name+'？')) {
      this._userService.delete(user.id).subscribe(
        res => {
          this.initData()
          this._toastr.info(`成功移除用户——`+user.name);
        }
      );
    }
  }
  validate() {
    let result=true
    if (this._regularService.isBlank(this.user.name)) {
      this._toastr.error('名称不能为空');
      result = false;
    }

    if (this._regularService.isBlank(this.user.password)) {
      this._toastr.error('密码不能为空');
      result =  false;
    }
    if (this._regularService.isBlank(this.user.roles)) {
      this._toastr.error('角色不能为空');
      result =  false;
    }
    if (this._regularService.isBlank(this.user.username)) {
      this._toastr.error(' 账号不能为空');
      result =  false;
    }

    return result;
  }
  
}
