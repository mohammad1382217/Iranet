import React from "react";
import {
  selectIsMenuOpen,
  useSelector,
  appSlice,
  useDispatch,
} from "../../lib/redux";

const Button = React.lazy(() => import("@material-tailwind/react/components/Button/index"));
const Menu = React.lazy(() => import("@material-tailwind/react/components/Menu/index"));
const MenuHandler = React.lazy(() => import("@material-tailwind/react/components/Menu/MenuHandler"));
const Avatar = React.lazy(() => import("@material-tailwind/react/components/Avatar/index"));

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  titleProfile,
  avatarSrc,
  itemMenuList
}) => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector(selectIsMenuOpen);

  return (
    <div className="z-50">
      <Menu
        open={isMenuOpen}
        handler={() => dispatch(appSlice.actions.setIsMenuOpen())}
        placement="bottom-end"
      >
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center justify-center rounded-full py-0.5 pr-1 pl-0.5 "
          >
            <div className="flex items-center justify-center">
              <div className="ml-3 pr-4 sm-max:!ml-1 md-max:ml-2 md-max:hidden">
                {titleProfile}
              </div>
              <Avatar
                className="!w-10 !h-10 m-1"
                src={avatarSrc}
                alt="avatar"
              />
            </div>
          </Button>
        </MenuHandler>
        {itemMenuList}

      </Menu>
    </div>
  );
};

export default ProfileMenu;

// Types
interface ProfileMenuProps {
  titleProfile: React.ReactNode;
  avatarSrc: string;
  itemMenuList:React.ReactNode;
}
