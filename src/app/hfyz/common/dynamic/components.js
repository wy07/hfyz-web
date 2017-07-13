"use strict";
var organization_component_1 = require("./../../basic/organization/organization.component");
var system_code_component_1 = require("./../../basic/systemCode/system-code.component");
var menu_component_1 = require("./../../basic/menu/menu.component");
var role_component_1 = require("./../../basic/role/role.component");
var user_component_1 = require("./../../basic/user/user.component");
var log_manage_component_1 = require("./../../log-manage/log-manage.component");
var home_component_1 = require("./../../home/home.component");
var info_publish_component_1 = require("../../info-manage/info-publish/info-publish.component");
var info_check_component_1 = require("../../info-manage/info-check/info-check.component");
var info_list_component_1 = require("../../info-manage/info-list/info-list.component");
var real_time_map_component_1 = require("../../map/realTimeMap/real-time-map.component");
var history_map_component_1 = require("../../map/historyMap/history-map.component");
var null_map_component_1 = require("../../map/nullMap/null-map.component");
var change_pwd_component_1 = require("../../basic/user/changePwd/change-pwd.component");
exports.components = {
    role: role_component_1.RoleComponent,
    user: user_component_1.UserComponent,
    menu: menu_component_1.MenuComponent,
    systemcode: system_code_component_1.SystemCodeComponent,
    unit: system_code_component_1.SystemCodeComponent,
    home: home_component_1.HomeComponent,
    organization: organization_component_1.OrganizationComponent,
    infoPublish: info_publish_component_1.InfoPublishComponent,
    infoCheck: info_check_component_1.InfoCheckComponent,
    infoList: info_list_component_1.InfoListComponent,
    realTimeMap: real_time_map_component_1.RealTimeMapComponent,
    historyMap: history_map_component_1.HistoryMapComponent,
    nullMap: null_map_component_1.NullMapComponent,
    operationLog: log_manage_component_1.LogManageComponent,
    changepwd: change_pwd_component_1.ChangePwdComponent
};
