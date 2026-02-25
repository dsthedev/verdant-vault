import { Router, Route, Set, PrivateSet } from '@cedarjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth.js'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <PrivateSet wrap={DefaultLayout} unauthenticated="login" roles={['guest']}>
        <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
          <Route path="/users/new" page={UserNewUserPage} name="newUser" />
          <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
          <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
          <Route path="/users" page={UserUsersPage} name="users" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Locations" titleTo="locations" buttonLabel="New Location" buttonTo="newLocation">
          <Route path="/locations/new" page={LocationNewLocationPage} name="newLocation" />
          <Route path="/locations/{id}/edit" page={LocationEditLocationPage} name="editLocation" />
          <Route path="/locations/{id}" page={LocationLocationPage} name="location" />
          <Route path="/locations" page={LocationLocationsPage} name="locations" />
        </Set>

        <Route path="/dashboard" page={DashboardPage} name="dashboard" />
      </PrivateSet>

      <Set wrap={DefaultLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />

        <Route path="/" page={HomePage} name="home" />
      </Set>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
