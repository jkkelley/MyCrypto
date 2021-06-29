import React from "react";
import { useDispatch } from "react-redux";


function LogOutButton(props) {
  const dispatch = useDispatch();
  const handleLogoutClick = (event) => {
    // dispatch({ type: "CLEAR_PROFILE_INFO" });
    // dispatch({ type: "LOGOUT" });
    dispatch({ type: "CLEAR_PROFILE_INFO", type: "LOGOUT" });
    // history.push("/")
  };
  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={(event) => handleLogoutClick(event)}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
