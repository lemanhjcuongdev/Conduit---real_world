import routerConfig from "../config/router.config";

//pages
import HomePage from "../pages/Home/Home";
import LoginPage from "../pages/Login/Login";
import RegisterPage from "../pages/Register/Register.";
import SettingsPage from "../pages/Settings/Settings";
import EditorPage from "../pages/Editor/EditorPage";
import ProfilePage from "../pages/Profile/Profile";

const publicRoutes = [
  {
    path: routerConfig.home,
    component: HomePage,
  },
  {
    path: routerConfig.login,
    component: LoginPage,
  },
  {
    path: routerConfig.register,
    component: RegisterPage,
  },
  {
    path: routerConfig.settings,
    component: SettingsPage,
  },
  {
    path: routerConfig.editor,
    component: EditorPage,
  },
  {
    path: routerConfig.profile,
    component: ProfilePage,
  },
];

export { publicRoutes };
