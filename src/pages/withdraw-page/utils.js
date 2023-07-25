import { CORE_BACKEND_URL } from "../../helpers/url_helper";
import toastr from "toastr";
export async function getBankList() {
  const rq_url = `${CORE_BACKEND_URL}/suqlink/bank-list/`;
  const authData = JSON.parse(localStorage.getItem("authUser"));
  if (!authData) {
    return {};
  }
  const banks = await fetch(rq_url, {
    method: "GET",
    headers: {
      Authorization: `Token ${authData.token}`,
    },
  })
    .then((rsp) => {
      if (rsp.status < 300) {
        return rsp.json();
      } else if (rsp.status < 500) {
        rsp.json().then((data) => {
          const errMsg = [];
          Object.keys(data).forEach((k) => errMsg.push(`${k}:\n${data[k]}`));
          errMsg.forEach((errTxt) => {
            toastr.error(errTxt, "Error");
          });
        });
      } else {
        toastr.error("An error has occured. Please try again.", "Error");
      }
    })
    .then((data) => data)
    .catch((err) => {
      toastr.error(err, "Error");
      console.error(err);
    });
  return banks;
}

export function getAuthData() {
  const authData = JSON.parse(localStorage.getItem("authUser"));
  return authData;
}
