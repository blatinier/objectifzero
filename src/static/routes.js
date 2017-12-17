import React from 'react';
import { Route, Switch } from 'react-router';
import { HomeView, LoginView, RegisterView, DashboardView, AdminUserView, AdminCardView, AdminCardAddView, NotFoundView } from './containers';
import requireAuthentication from './utils/requireAuthentication';
import requireStaff from './utils/requireStaff';

export default(
    <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/login" component={LoginView} />
        <Route path="/register" component={RegisterView} />
        <Route path="/dashboard" component={requireAuthentication(DashboardView)} />
        <Route path="/zw-admin/user" component={requireStaff(AdminUserView)} />
        <Route path="/zw-admin/card" component={requireStaff(AdminCardView)} />
        <Route path="/zw-admin/card/add" component={requireStaff(AdminCardAddView)} />
        <Route path="*" component={NotFoundView} />
    </Switch>

);
