import { reactive } from "@vue/reactivity";
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
  formtabungan: ITabungan;
  amountDeposit: Number;
}

const TabunganState = reactive<ITabunganState>({
  isLoading: false,
  tabungans: [],
  formtabungan: {
    sender: "",
    nominal: "",
    accepted: "",
    tabungantype: "",
    description: "",
    receipt: "",
    receiptname: "",
    updated: 0,
    created: 0,
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
    const { success, data } = await apiServices.post({
      path: "/api/deposit/add",
      body: {},
      type: "form-data",
    });
    if (success) {
      TabunganState.tabungans.push(data?.data[0]);
    }
  }
  function acceptDeposit() {}
  function sendSpending() {}
  function acceptSpending() {}

  return {
    getAllDeposit,
    sendDeposit,
    acceptDeposit,
    sendSpending,
    acceptSpending,
    getCountDeposit,
    TabunganState,
  };
}

export { useTabungan };
