import toast from "react-hot-toast";

export const notifySuccess = (msg: string) => {
  toast.success(msg, {
    style: {
      background: "#111827",
      color: "#fff",
      border: "1px solid #22c55e",
    },
    iconTheme: {
      primary: "#22c55e",
      secondary: "#111827",
    },
  });
};

export const notifyError = (msg: string) => {
  toast.error(msg, {
    style: {
      background: "#111827",
      color: "#fff",
      border: "1px solid #ef4444",
    },
  });
};

export const notifyLoading = (msg: string) => {
  return toast.loading(msg, {
    style: {
      background: "#111827",
      color: "#fff",
    },
  });
};
