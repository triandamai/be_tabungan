import { reactive } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { getCurrentUser } from "../services/FirebaseServices";
import apiServices from "../services/Services";

interface ITabungan {
  _id?: string;
  __v?: any;
  sender: string;
  nominal: string;
  accepted: string;
  description: string;
  tabungantype: "spending" | "deposit" | "";
  receipt: string;
  receiptname: string;
  updated: Number;
  created: Number;
}
interface ITabunganState {
  isLoading: boolean;
  tabungans: Array<ITabungan>;
  formtabungan: IFormTabungan;
  amountDeposit: Number;
}
interface IFormTabungan {
  nominal: string;
  description: string;
  receipt: any;
  receiptname: string;
  filename: string;
  tabungantype: string;
}
interface IProcessTabungan {
  isLoading: boolean;
  isResultDialog: boolean;
  dialogType: "success" | "failed" | "loading";
}
const ProcessTabunganState = reactive<IProcessTabungan>({
  isLoading: false,
  isResultDialog: false,
  dialogType: "loading",
});
const TabunganState = reactive<ITabunganState>({
  isLoading: false,
  tabungans: [],
  formtabungan: {
    nominal: "",
    description: "",
    receipt: "",
    receiptname: "",
    tabungantype: "",
    filename: "Pilih",
  },
  amountDeposit: 0,
});

function useTabungan() {
  /**
   * var
   */
  const router = useRouter();
  const route = useRoute();
  /**
   * action routing
   */
  function gotoHome() {
    router.push({ path: "/main/dashboard" });
  }
  /**
   * utility
   * dialog,move route etc
   */
  function showLoading() {
    ProcessTabunganState.isLoading = true;
    ProcessTabunganState.isResultDialog = false;
  }
  function hideLoading() {
    ProcessTabunganState.isLoading = false;
  }

  function showSuccess() {
    ProcessTabunganState.isLoading = false;
    ProcessTabunganState.isResultDialog = true;
    ProcessTabunganState.dialogType = "success";
  }
  function showFailed() {
    ProcessTabunganState.isLoading = false;
    ProcessTabunganState.isResultDialog = true;
    ProcessTabunganState.dialogType = "failed";
  }
  function dismiss() {
    ProcessTabunganState.isResultDialog = false;
  }
  function isDialogSuccess() {
    return ProcessTabunganState.dialogType == "success";
  }
  function isLoading() {
    return ProcessTabunganState.isLoading;
  }
  function isDialogResult() {
    return ProcessTabunganState.isResultDialog;
  }
  function resetForm() {
    TabunganState.formtabungan.description = "";
    TabunganState.formtabungan.filename = "";
    TabunganState.formtabungan.nominal = "";
    TabunganState.formtabungan.receiptname = "Pilih file";
    TabunganState.formtabungan.receipt = null;
  }
  /**
   * manipulate data
   * send data,retrieve data,accept data etc
   */
  async function getAllDeposit() {
    const { success, data } = await apiServices.get({ path: "/api/deposits" });

    if (success) {
      if (data) {
        TabunganState.tabungans = data.data;
      }
    }
  }
  async function getDepositById() {
    return new Promise(async (resolve) => {
      showLoading();
      const { success, data } = await apiServices.get({
        path: `/api/deposit/${route.params.id}`,
      });
      hideLoading();
      if (success) {
        if (data) {
          if (data.data.length > 0) {
            resolve(data.data);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  }
  async function getCountDeposit() {
    const { success, data } = await apiServices.get({
      path: "/api/deposit/count",
    });
    if (success) if (data) TabunganState.amountDeposit = data?.data[0].total;
  }
  async function sendDeposit() {
    if (
      !TabunganState.formtabungan.nominal &&
      !TabunganState.formtabungan.description &&
      !TabunganState.formtabungan.receipt
    )
      return;
    showLoading();
    const fromData = new FormData();
    const user: any = await getCurrentUser();

    fromData.append("sender", user.uid);
    fromData.append("nominal", TabunganState.formtabungan.nominal);
    fromData.append("description", TabunganState.formtabungan.description);
    fromData.append("receipt", TabunganState.formtabungan.receipt);
    fromData.append("tabungantype", "deposit");
    hideLoading();

    const { success, data } = await apiServices.post({
      path: "/api/deposit/add",
      body: fromData,
      type: "form-data",
    });

    if (success) {
      showSuccess();
      resetForm();
    } else {
      ProcessTabunganState.dialogType = "failed";
      showFailed();
    }
  }
  async function acceptDeposit(uid: any, id: any) {
    showLoading();
    const { success, data } = await apiServices.post({
      path: "/api/deposit/accept",
      body: JSON.stringify({ id: id, uid: uid }),
      type: "json",
    });
    hideLoading();
    if (success) {
      showSuccess();
    } else {
      showFailed();
    }
  }
  function sendSpending() {}
  function acceptSpending() {}

  function onImagePicked(e: any) {
    TabunganState.formtabungan.receipt = e.target.files[0];
    TabunganState.formtabungan.filename = e.target.files[0].name;
  }

  return {
    getAllDeposit,
    sendDeposit,
    acceptDeposit,
    sendSpending,
    acceptSpending,
    getCountDeposit,
    onImagePicked,
    showFailed,
    showSuccess,
    showLoading,
    dismiss,
    isDialogSuccess,
    isLoading,
    isDialogResult,
    gotoHome,
    getDepositById,
    TabunganState,
    ProcessTabunganState,
  };
}

export { useTabungan, ITabungan };
