import { getBankList } from "./utils";

const bankList = await getBankList();
const filteredBanks = bankList.data.filter((item) => {
  return !item.is_mobilemoney;
});
let bankOptions = {};
filteredBanks.forEach((item) => {
  bankOptions[item.name] = item;
});
console.log(bankOptions);
export default bankOptions;
export const formFields = [
  {
    type: "select",
    title: "Choose Bank",
    id: "bank-name",
    name: "chapa_bank",
    options: Object.keys(bankOptions),
  },
  {
    type: "text",
    title: "Full Bank Account Name",
    id: "bank-full-name",
    name: "bank_account_name",
    placeholder: "Abebe Bikila Tariku",
  },
  {
    type: "text",
    title: "Bank Account Number",
    id: "bank-account-number",
    name: "bank_account_number",
  },
  {
    type: "decimal",
    step: "0.01",
    title: "Withdraw Amount (ETB)",
    id: "withdraw-amount",
    name: "amount",
  },
];
