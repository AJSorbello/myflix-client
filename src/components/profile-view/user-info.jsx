import React from "react";

function UserInfo({ fullname, email, username, birthday }) {
  const birthDate = new Date(birthday);
  const utcBirthDate = new Date(
    birthDate.getTime() + birthDate.getTimezoneOffset() * 60000
  );
  const month = utcBirthDate.toLocaleString("default", { month: "long" });
  const day = utcBirthDate.getDate();
  const year = utcBirthDate.getFullYear();

  return (
    <>
      <h4>User Info</h4>
      <h2>Full Name: {fullname}</h2>
      <p>User Name: {username}</p>
      <p>E-mail: {email}</p>
      <p>Birthday: {`${month} ${day}, ${year}`}</p>
    </>
  );
}

export default UserInfo;
