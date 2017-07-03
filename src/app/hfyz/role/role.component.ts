import {Component, OnInit,Injector,Renderer,ElementRef,ViewChild,ChangeDetectorRef,ApplicationRef,NgZone} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {TreeNode} from "primeng/components/common/api";
import {RoleService} from "./role.service";
import {LayoutComponent} from "../layout/layout.component";
import {RegularService} from "../common/shared/regular.service";
import {DataGridModule,SelectItem,ListboxModule} from 'primeng/primeng';
import {AuthService} from './../security/auth.service'
@Component({
  selector: 'role',
  templateUrl: 'role.component.html',
  styleUrls: ['../layout/layout.component.css']
})

export class RoleComponent implements OnInit {
 
  roleList: any;
  type: number;
  //layoutComponent
  displayDialog:boolean = false
  displayAssign:boolean = false
  formTitle:string
  role: any;
  isAdd: boolean;
  selectedPermission
  menuList:TreeNode[];
  orgList:SelectItem[];
  currentUserId:number
  currentRoleArray=[]
  currentRoleString:string
  constructor(private _renderer:Renderer
    , private _router: Router
    , private _activatedRoute: ActivatedRoute
    , private _toastr: ToastsManager
    , private _roleService: RoleService
    , private _inj:Injector
    , private _regularService:RegularService
    , private _authService:AuthService
  ) {
      
      this.currentRoleArray = this._authService.getCurrentUser('roleId').split(';')
      this.currentRoleString = this._authService.getCurrentUser('roleId')
      this.currentUserId = this._authService.getCurrentUser('id')
      //this.layoutComponent = this._inj.get(LayoutComponent);
      this.role={id: ''};
      this.initData();
      console.log('!!!!')
  }

  ngOnInit() {
    console.log('!!!!')
  }


  initData(){
    this._roleService.list(this.currentUserId).subscribe(
      res=>{
        this.roleList=res.roleList;
      }
    );
  }
  onEdit(role) {
    this.displayDialog=true
    this.isAdd=false
    this.formTitle="编辑角色——"+role.name
    this.preEdit(role.id)
  }
  preEdit(id) {
    this._roleService.edit(id,this.currentRoleString).subscribe(
      res => {
        if (res.result == 'success') {
          this.role = res.role
          this.orgList =  res.orgList
        } else {
          this._toastr.error('获取数据失败');
        }
      }
    );

  }
  onCreate() {
    this._roleService.orgListForSelect(this.currentRoleString).subscribe(
      res=>{
        this.orgList=res.orgList
        this.formTitle="新增角色"
        this.isAdd=true
        this.displayDialog=true
        this.role={id: '',operator:this.currentUserId};
      })
  }
 save(){
   if (this.validate()) {
      this._roleService.save(this.role).subscribe(
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
      this._roleService.update(this.role.id, this.role).subscribe(
        res => {
          this._toastr.success('修改成功');
          this.initData()
        }
      );
      this.displayDialog=false
    }

 }
  onDelete(role) {
     if (confirm('确认移除角色——'+role.name+'？')) {
      this._roleService.delete(role.id).subscribe(
        res => {
          this.initData()
          this._toastr.info(`成功移除角色——`+role.name);
        }
      );
    }
  }
  onAssign(role){
    this._roleService.getPermission(this.currentRoleString).subscribe(
        res => {
          this.menuList= res.menuList
          this.role=role
          this.displayAssign=true
          this.selectedPermission = []
        }
      );
  }
  showCreateDialog(){}
  savePermission(){
      if(this.selectedPermission.length==[]){
        this._toastr.error('请为角色分配权限！');
      }else{
        this.displayAssign=false
        let permissions=[]
        for(let i=0;i<this.selectedPermission.length;i++){
          permissions.push(this.selectedPermission[i].data)
        }
        this._roleService.savePermission(this.role.id,permissions).subscribe(
          res => {
            this.initData()
            this._toastr.info(`权限分配成功！`);
          }
        );
      }
      
  }  
 
  validate() {
    if (this._regularService.isBlank(this.role.name)) {
      this._toastr.error('名称不能为空');
      return false;
    }

    if (this._regularService.isBlank(this.role.authority)) {
      this._toastr.error('编码不能为空');
      return false;
    }

    return true;
  }
  
}
