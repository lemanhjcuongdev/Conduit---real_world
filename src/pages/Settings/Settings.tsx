import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { updateCurrentUserAPI } from "../../api/user";
import Input from "../../components/Input/Input";
import TextArea from "../../components/Input/TextArea";
import useAuthContext from "../../hooks/useAuthContext";
import { logoutAction, updateUserAction } from "../../store/actions";
import IUserProps from "../Login/type";

function SettingsPage() {
  const { state, dispatch } = useAuthContext();
  const { isAuthenticated, user } = state;

  const [imgURL, setImgURL] = useState(user?.image || "");
  const [name, setName] = useState(user?.username || "");
  const [bio, setBio] = useState<string | null | undefined>(user?.bio || "");
  const [email, setEmail] = useState(user?.email || "");
  const [newPassword, setNewPassword] = useState("");

  //redirect to some route
  const redirect = useNavigate();

  const handleUpdateUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const UpdatingUser = {
      user: {
        email: email,
        password: newPassword,
        username: name.trim(),
        bio: bio?.trim(),
        image: imgURL.trim(),
      },
    };
    updateCurrentUserAPI(UpdatingUser).then((data) => {
      localStorage.setItem("user_data", JSON.stringify(data.user));
      dispatch(updateUserAction(data.user));
      redirect(`/${data.user.username}`);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user_data");
    dispatch(logoutAction());
  };

  return (
    <div className="settings-page">
      {!isAuthenticated && <Navigate to="/" />}
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <Input
                    value={imgURL}
                    className="form-control"
                    placeholder="URL of profile picture"
                    setValue={setImgURL}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    setValue={setName}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <TextArea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    value={bio ? bio : ""}
                    setValue={setBio}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    setValue={setNewPassword}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  onClick={handleUpdateUser}
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
