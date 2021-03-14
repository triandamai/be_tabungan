import { reactive } from "@vue/reactivity";
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
  async function getAllDeposit() {
    const { success, data } = await apiServices.get({ path: "/api/deposits" });

    if (success) {
      if (data) {
        console.log(data);
        TabunganState.tabungans = data.data;
      }
    }
  }
  async function getCountDeposit() {
    const { success, data } = await apiServices.get({
      path: "/api/deposit/count",
    });
    if (success) if (data) TabunganState.amountDeposit = data?.data[0].total;
  }
  async function sendDeposit() {
    console.log("send");
    if (
      !TabunganState.formtabungan.nominal &&
      !TabunganState.formtabungan.description &&
      !TabunganState.formtabungan.receipt
    )
      return;

    console.log("kosogn");
    const fromData = new FormData();
    const user: any = await getCurrentUser();
    console.log(TabunganState.formtabungan.receipt);
    fromData.append("sender", user.uid);
    fromData.append("nominal", TabunganState.formtabungan.nominal);
    fromData.append("description", TabunganState.formtabungan.description);
    fromData.append("receipt", TabunganState.formtabungan.receipt);
    fromData.append("tabungantype", "deposit");

    const { success, data } = await apiServices.post({
      path: "/api/deposit/add",
      body: fromData,
      type: "form-data",
    });
    if (success) {
      TabunganState.tabungans.push(data?.data[0]);
    }
  }
  function acceptDeposit() {}
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
    TabunganState,
  };
}

export { useTabungan };
