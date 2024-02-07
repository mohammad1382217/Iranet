import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { appSlice, selectOpenRight, useDispatch, useSelector } from "../../lib/redux";

export const LiDashboard: React.FC<LiDashboardProps> = ({item}) => {
  const dispatch = useDispatch();
  const closeDrawerRight = () => dispatch(appSlice.actions.setOpenRight(false));
  const openRight = useSelector(selectOpenRight);
  return (
    <NavLink
      onClick={openRight ? closeDrawerRight : undefined}
      className="flex flex-row gap-2.5 h-10 transition ease-in-out delay-100 duration-100 items-center justify-start px-4 py-2 rounded-lg text-sm"
      key={item.id}
      to={item.redirect}
      style={({ isActive }) =>
        isActive
          ? {
              color: `${item.color}`,
              background: `${item.backgroundColor}`,
              transitionDuration: "0.2s",
            }
          : { color: "#263238" }
      }
    >
        {item.icon}
        {item.title}
    </NavLink>
  );
};

// Types
interface LiDashboardProps {
  item: item;
}

interface item {
  id: number;
  title: ReactNode;
  icon: ReactNode;
  redirect: string;
  color: string;
  backgroundColor: string;
}