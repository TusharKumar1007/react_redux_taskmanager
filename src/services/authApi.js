export const loginUser = async ({ email, password }) => {
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error((await res.json().message) || "Invalid credientials");
  }

  const { user } = await res.json();

  return { user };
};

export const registerNewUser = async ({ userName, email, password }) => {
  const res = await fetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, email, password }),
  });

  const data = await res.json();
  console.log(data);
  

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data.user;
};

export const getCurrentUserApi = async () => {
  const res = await fetch("/whoami", {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");

  const { userName, tasks } = await res.json();

  return { userName, tasks };
};

export const LogOutApi = async () => {
  const res = await fetch("/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data.message;
};

export const deleteAccount = async () => {
  const res = await fetch("/account/delete", {
    method: "delete",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }
  return data.message;
};
