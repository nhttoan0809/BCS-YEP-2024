import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "./Layout";
import { addData, updateData } from "../db/actions";
import { getLocalName, setLocalName } from "../storage-actions";
import Loading from "./Loading";

const sleep = async () => new Promise((resolve) => setTimeout(resolve, 1000));

export default function FormPage() {
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState(() => getLocalName());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

  return (
    <Layout>
      <div className="w-5/6 absolute top-[230px] md:top-[250px] lg:top-[300px] bottom-0 left-1/2 pt-10 translate-x-[-50%] flex flex-col text-white pacifico-regular tracking-[2px]">
        {submittedName && (
          <i className="mb-5">
            Bạn đã đăng ký thành công dưới tên&nbsp;
            <span className="text-yellow-400 text-xl">{submittedName}</span> !!!
          </i>
        )}
        <label htmlFor="name" className="block mb-2 text-sm font-medium mb-2">
          Tên
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border rounded w-full py-1 px-3 text-black leading-loose focus:outline-none focus:shadow-outline mb-4 max-w-[470px]"
          placeholder="Vui lòng nhập tên của bạn..."
          value={name}
          onChange={(e) => {
            e.persist();
            setError("");
            setName(e.target.value);
          }}
        />
        {isLoading && <Loading />}
        {error && <span className="mb-4 text-orange-400">{error}</span>}
        {!submittedName && (
          <button
            className={`bg-[#FFC107] ${
              isLoading ? "bg-[#ccc]" : ""
            } hover:bg-[#FFA500] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2`}
            style={{ width: "fit-content" }}
            onClick={async () => {
              if (!name) return;
              setIsLoading(true);
              const result = await addData(name);
              const isDuplicatedName = result?.isDuplicatedName;
              await sleep();
              if (isDuplicatedName) {
                setError(
                  `Đã có người đăng ký dưới tên '${name}'. Vui lòng sử dụng tên khác.`
                );
              } else {
                setLocalName(name);
                setSubmittedName(name);
              }
              setIsLoading(false);
            }}
            disabled={isLoading}
          >
            Ghi danh
          </button>
        )}

        {submittedName && (
          <div className="mt-2">
            <button
              className={`bg-[#FFC107] ${
                isLoading ? "bg-[#ccc]" : ""
              } hover:bg-[#FFA500] text-black font-bold py-2 px-4 rounded`}
              style={{ width: "fit-content" }}
              onClick={async () => {
                if (name === submittedName) return;
                setIsLoading(true);
                const result = await updateData(submittedName, name);
                const isDuplicatedName = result?.isDuplicatedName;
                await sleep();
                if (isDuplicatedName) {
                  setError(
                    `Đã có người đăng ký dưới tên '${name}'. Vui lòng sử dụng tên khác.`
                  );
                } else {
                  setLocalName(name);
                  setSubmittedName(name);
                }
                setIsLoading(false);
              }}
              disabled={isLoading}
            >
              Cập nhật
            </button>
            <button
              className={`bg-[#FFC107] ${
                isLoading ? "bg-[#ccc]" : ""
              } hover:bg-[#FFA500] text-black font-bold py-2 px-4 rounded ml-4`}
              style={{ width: "fit-content" }}
              onClick={async () => {
                history.push("/");
              }}
              disabled={isLoading}
            >
              Xem phần quà
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
