import React from 'react';
import { Route, Switch } from 'react-router';
import {
    Home, Login, Register, Dashboard,
    AdminUser, AdminUserAdd,
    AdminCard, AdminCardAdd,
    NotFound
} from './containers';
import requireAuthentication from './utils/requireAuthentication';
import requireStaff from './utils/requireStaff';

export default(
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={requireAuthentication(Dashboard)} />
        <Route path="/zw-admin/user-add" component={requireStaff(AdminUserAdd)} />
        <Route path="/zw-admin/user-edit/:username" component={requireStaff(AdminUserAdd)} />
        <Route path="/zw-admin/user" component={requireStaff(AdminUser)} />
        <Route path="/zw-admin/card-add" component={requireStaff(AdminCardAdd)} />
        <Route path="/zw-admin/card-edit/:slug" component={requireStaff(AdminCardAdd)} />
        <Route path="/zw-admin/card" component={requireStaff(AdminCard)} />
        <Route path="*" component={NotFound} />
    </Switch>

);
