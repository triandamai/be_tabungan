import { reactive } from "@vue/reactivity";
import { auth, getCurrentUser } from "../services/FirebaseServices";
import firebase from "firebase/app";
import apiServices from "../services/Services";

import { useRouter } from "vue-router";

interface IUserState {
  email: string;
  password: string;
  authSuccess: boolean;
  isProgressing: boolean;
  profil: IUser;
}
interface IUser {
  _id?: string;
  __v?: any;
  uid: string;
  name: string;
  email: string;
  password: string;
  created: Number;
  updated: Number;
}
const UserState = reactive<IUserState>({
  email: "",
  password: "",
  authSuccess: false,
  isProgressing: false,
  profil: {
    uid: "",
    name: "",
    email: "",
    password: "",
    created: 0,
    updated: 0,
  },
});

function useUser() {
  function startAuthGoogle() {
    UserState.isProgressing = true;
    const provider = new firebase.auth.GoogleAuthProvider().addScope(
      "https://www.googleapis.com/auth/user.gender.read"
    );
    auth.signInWithRedirect(provider);
  }
  async function startLoginBasic() {
    UserState.isProgressing = true;
    const router = useRouter();
    const { success, data } = await apiServices.login(
      JSON.stringify({ email: UserState.email, password: UserState.password })
    );
    UserState.isProgressing = false;
    UserState.authSuccess = success;
    if (success) {
      router.push({ path: "/main/dashboard" });
    } else {
    }
  }
  async function getResultFromRedirect() {
    UserState.isProgressing = true;
    const router = useRouter();
    const { user, additionalUserInfo } = await auth.getRedirectResult();

    UserState.isProgressing = false;
    if (user)
      if (additionalUserInfo?.isNewUser) {
        const { success, data } = await apiServices.register(
          JSON.stringify({
            email: user.email,
            name: user.displayName,
            gender: "laki-laki",
            uid: user.uid,
            password: user.uid,
          })
        );
        UserState.authSuccess = success;
        if (success) router.push({ path: "/main/dashboard" });
      } else {
        const { success, data } = await apiServices.login(
          JSON.stringify({ email: user.email, password: user.uid })
        );
        UserState.authSuccess = success;
        if (success) router.push({ path: "/main/dashboard" });
      }
    else UserState.authSuccess = false;
  }

  function getProfil() {
    getCurrentUser().then(async (user: any) => {
      const { success, data } = await apiServices.get({
        path: "/api/user/order/" + user.uid,
      });
      //   console.log(data);
      if (success) if (data) UserState.profil = data.data[0];
    });
  }

  return {
    UserState,
    startAuthGoogle,
    startLoginBasic,
    getResultFromRedirect,
    getProfil,
  };
}
export { useUser };
